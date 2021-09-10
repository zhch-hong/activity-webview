import _ from 'lodash';
import Vue from 'vue';
import axios from 'axios';
import { v4 } from 'uuid';

import user from '~/vendors/user';
import emitter from '~/vendors/emitter';
import parseHref from '~/vendors/parse-href';
import { isWebview } from '~/vendors/runtime-env';

import AlertPanel from '~/components_call/alert-panel';

const app = new Vue({
  data() {
    return {
      count: 0,
      messageStack: [],
    };
  },
});

/**
 * 发送消息不需要返回
 * @param params
 * @returns
 */
/* function fetchSend(params: unknown) {
  axios({
    baseURL: store.state.baseURL,
    url: `msg_send`,
    method: 'POST',
    withCredentials: false,
    data: params,
    headers: {
      token: store.state.token,
      userid: store.state.user.user_id,
    },
  });
} */

/**
 * 通过服务器向客户端发送消息
 * @param params
 * @returns
 */
/* function fetchNative(params: Record<string, string | Record<string, unknown>>) {
  const data = _.cloneDeep(params);
  data['user_id'] = store.state.user.user_id as string;
  return axios({
    baseURL: store.state.baseURL,
    url: `msg_webview_notify`,
    method: 'GET',
    withCredentials: false,
    params: data,
    headers: {
      token: store.state.token,
      userid: store.state.user.user_id,
    },
  });
} */

/**
 * 从webview发送消息到客户端
 * @returns
 */
const fetchMessage = (function webview2client() {
  /**
   * 标识当前是否正处于通讯状态
   * 即从webview发送消息到客户端，客户端还有没有消息回执（告诉webview客户端已经收到消息了）
   */
  let messageRun = false;

  /**
   * 每当客户端告诉webview当前发送的消息已经收到了，就判断消息队列是否还有消息
   * 如果消息队列为空了，就将count置为0
   * 否则count+1，触发监听，取消息队列第一条消息进行发送
   * 以此循环
   */
  app.$watch('count', (v) => {
    if (v === 0) return;

    const url = app.messageStack.shift();
    if (url) {
      messageRun = true;

      const rIndex = url.indexOf('readuuid');
      const uIndex = url.indexOf('&uuid');
      if (uIndex !== -1) {
        console.log(`发送消息【${url.slice(uIndex + 7, uIndex + 43)}】`, url);
      } else if (rIndex !== -1) {
        console.log(`发送消息【${url.slice(rIndex + 10, rIndex + 46)}】`, url);
      } else {
        console.error(`发送消息未添加uuid或readuuid【${url}】`);
      }

      location.href = url;
    }
  });

  /**
   * 消息队列
   */
  app.$watch(
    'messageStack',
    (cur, pre) => {
      // cur.length > pre.length
      // 说明是有消息被添加到消息队列，如果当前没有消息正处于通讯状态，则触发消息发送机制
      // 如果当前正有消息处于通讯状态，则消息触发交由 emitter.on(readuuid) 回调函数处理
      if (pre) {
        if (cur.length > pre.length) {
          if (!messageRun) {
            app.count++;
          }
        }
      } else if (cur.length > 0 && !messageRun) {
        app.count++;
      }
    },
    { deep: true }
  );

  return function (url, response) {
    const uuid = v4();
    const readuuid = v4();

    if (url.includes('?')) url += `&readuuid='${readuuid}'`;
    else url += `?readuuid='${readuuid}'`;

    // 只有需要返回数据的消息，才用uuid
    if (response) {
      url += `&uuid='${uuid}'`;
    }

    // console.log('添加前', app.messageStack);
    const array = _.cloneDeep(app.messageStack);
    array.push(url);
    app.messageStack = array;
    // app.messageStack.push(url);
    // console.log('添加后', app.messageStack);

    emitter.on(readuuid, () => {
      emitter.off(readuuid);

      messageRun = false;

      if (app.messageStack.length === 0) {
        app.count = 0;
      } else {
        app.count++;
      }
    });

    if (response) {
      return new Promise((resolve, reject) => {
        emitter.on(uuid, (data) => {
          console.log(`消息响应【${uuid}】`, data);

          emitter.off(uuid);

          if (data) resolve(data);
          // eslint-disable-next-line prefer-promise-reject-errors
          else reject();
        });
      });
    }
  };
})();

/**
 * 请求客户端配置
 * @param url
 * @returns
 */
function fetchClientConfig(url) {
  return new Promise((resolve) => {
    axios({
      baseURL: process.env.ASSET_URL,
      url,
      method: 'GET',
    })
      .then((response) => {
        const data = response.data;
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        AlertPanel(`获取配置文件失败[${url}]`);
      });
  });
}

/**
 * 请求服务器数据
 * @param message 消息名称
 * @param data
 * @returns
 */
function fetchCall(message, data = {}) {
  if (isWebview) {
    return fetchMessage(`webmessage://request?name=${message}&params=${JSON.stringify(data)}`, true);
  }

  return new Promise((resolve) => {
    axios({
      baseURL: process.env.HTTP_HOST,
      url: `msg_call`,
      method: 'POST',
      data: {
        name: message,
        user_id: user.user_id,
        data,
      },
      headers: {
        token: parseHref().token,
        userid: user.user_id,
      },
    }).then(({ data }) => {
      resolve(data);
    });
  });
}

/**
 * 需要注册的服务端主动推送的消息列表
 */
const SERVE_MESSAGE_LIST = [];
/**
 * 注册消息延时发送定时器
 */
let messageTimer = null;
/**
 * 注册服务端消息
 * @param message 服务端推送的消息名称
 * @param callback 处理数据的回调函数
 */
function registerServeMsg(message, callback) {
  SERVE_MESSAGE_LIST.push(message);

  emitter.on(message, (event) => {
    if (typeof event !== 'undefined' && callback) callback(event);
  });

  if (messageTimer) {
    clearTimeout(messageTimer);
  }

  messageTimer = _.delay(() => {
    if (isWebview) {
      let params = '';
      SERVE_MESSAGE_LIST.forEach((m, i) => {
        params += `${++i}=${m}&`;
      });
      params = params.slice(0, -1);

      fetchMessage(`webmessage://addlisten?${params}`, false);
    } else {
      const data = {
        user_id: user.user_id,
        msg_names: SERVE_MESSAGE_LIST,
      };

      axios({
        baseURL: process.env.HTTP_HOST,
        url: `register_msg`,
        method: 'POST',
        data,
        headers: {
          token: parseHref().token,
          userid: data.user_id,
        },
      });
    }

    SERVE_MESSAGE_LIST.splice(0);
    messageTimer = null;
  }, 600);
}

/**
 * 需要取消注册的服务端主动推送的消息列表
 */
const UNSERVE_MESSAGE_LIST = [];
/**
 * 取消注册消息延时发送定时器
 */
let unmessageTimer = null;
/**
 * 注销服务端消息
 * @param message
 */
function unregisterServeMsg(message) {
  UNSERVE_MESSAGE_LIST.push(message);
  emitter.off(message);

  if (unmessageTimer) clearTimeout(unmessageTimer);

  unmessageTimer = _.delay(() => {
    if (isWebview) {
      let params = '';
      UNSERVE_MESSAGE_LIST.forEach((m, i) => {
        params += `${++i}=${m}&`;
      });
      params = params.slice(0, -1);

      fetchMessage(`webmessage://removelisten?${params}`, false);
    } else {
      const data = {
        user_id: user.user_id,
        msg_names: [],
      };

      axios({
        baseURL: process.env.HTTP_HOST,
        url: `register_msg`,
        method: 'POST',
        data,
        headers: {
          token: parseHref().token,
          userid: data.user_id,
        },
      });
    }

    UNSERVE_MESSAGE_LIST.splice(0);
    unmessageTimer = null;
  }, 300);
}

export { fetchMessage, fetchClientConfig, fetchCall, registerServeMsg, unregisterServeMsg };
