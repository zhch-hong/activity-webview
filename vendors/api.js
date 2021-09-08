import _ from 'lodash';
import axios from 'axios';
import user from './user';
import { isWebview } from './runtime-env';
import emitter from '~/vendors/emitter';
import { fetchCall, fetchMessage } from '~/vendors/network';
import parseHref from '~/vendors/parse-href';

/**
 * 登录
 * @param {String} token
 * @returns
 */
export async function API_USER_LOGIN(token) {
  token = token || parseHref().token;

  const { data } = await axios({
    baseURL: process.env.HTTP_HOST,
    url: 'get_user_by_token',
    method: 'GET',
    params: { token },
  });
  data.diff = Math.floor((new Date().valueOf() - data.ts * 1000) / 1000);
  Object.assign(user, data);
  return Promise.resolve();
}

/**
 * 循环请求主动推送的消息，只在浏览器环境中使用
 * @returns
 */
export function API_LOOP_FETCH() {
  const loop = { value: true };
  const fetch = () => {
    if (parseHref().token && !_.isEmpty(user)) {
      axios({
        baseURL: process.env.HTTP_HOST,
        url: `pull_msg?user_id=${user.user_id}`,
        method: 'GET',
        headers: {
          token: parseHref().token,
          userid: user.user_id,
        },
      }).then((response) => {
        const data = response.data;

        data.forEach((msg) => {
          const name = msg.name;
          const param = msg.data;
          emitter.emit(name, param);
        });

        if (loop.value) {
          setTimeout(() => {
            fetch();
          }, 1000);
        }
      });
    } else if (loop.value) {
      setTimeout(() => {
        fetch();
      }, 1000);
    }
  };

  fetch();

  return loop;
}

// ========================================= 页面缩放
/**
 * 页面大小适配缩放值
 * @param scale
 */
export function API_APP_SCALE(scale) {
  fetchMessage(`unityfun://storage?1_string=scale&2_string=${scale}`, false);
}

// ========================================= 浏览器
/**
 * 打开系统浏览器
 * @param url
 */
export function API_OPEN_BROWSER(url) {
  fetchMessage(`unityfun://openurl?1_url=${encodeURIComponent(url)}`, false);
}

// ========================================= 支付方式

/**
 * 单个支付数据类型
 * @typedef {Object} T_PAY_TYPE
 * @property {String} channel
 * @property {String} child_channel
 */

/**
 * 请求支付方式返回数据结构
 * @typedef {Object} RES_GET_PAY_TYPES
 * @property {Number} result
 * @property {T_PAY_TYPE[]} [types]
 */

/**
 * 请求支付方式
 * @param {number} giftID - 商品ID
 * @returns {Promise<RES_GET_PAY_TYPES>}
 */
export function API_GET_PAY_TYPES(giftID) {
  return fetchCall('get_pay_types', { goods_id: giftID });
}

// ========================================= 创建订单
/* export type RES_CREATE_PAY_ORDER = {
  order_id: string;
  result: number;
  url: string;
}; */
/**
 * 创建订单
 * @param id 商品ID
 * @param channel 支付渠道[微信，支付宝，云闪付，...]
 * @param geturl
 * @param convert
 * @returns
 */
export function API_CREATE_PAY_ORDER(id, channel, geturl = 'y', convert = undefined) {
  return fetchCall('create_pay_order', {
    goods_id: id,
    channel_type: channel,
    geturl,
    convert,
  });
}

// ========================================= 权限查询
/**
 * 权限查询
 * @param name
 * @returns
 */
export function API_CHECK_PERMISS(name) {
  if (isWebview) {
    return fetchMessage(`unityfun://checkpermiss?1_string=${name}`, true);
  }

  return new Promise((resolve) => {
    axios({
      baseURL: process.env.HTTP_HOST,
      url: `msg_call`,
      method: 'POST',
      data: {
        name: 'judge_permission',
        user_id: user.user_id,
        data: { permission: name },
      },
      headers: {
        token: parseHref().token,
        userid: user.user_id,
      },
    }).then(({ data }) => {
      resolve({ result: data.effect });
    });
  });
}

// ========================================= 礼包状态

/* export type RES_QUERY_GIFT_BAG_STATUS = {
  gift_bag_id: number;
  permit_start_time: number;
  permit_time: number;
  remain_time: number;
  result: number;
  status: 0 | 1;
  time: number;
}; */
/**
 * 查询礼包
 * @param id
 * @returns
 */
export function API_QUERY_GIFT_BAG_STATUS(id) {
  return fetchCall('query_gift_bag_status', { gift_bag_id: id });
}

// ========================================= 请求任务

/**
 * 查询任务
 * @param id 任务ID
 * @returns
 */
export function API_QUERY_ONE_TASK_DATA(id) {
  return fetchCall('query_one_task_data', { task_id: id });
}

// ========================================= 跳转到原生活动
/**
 * 跳转到原生活动
 * @param key 活动的模块key值
 * @param panel 活动的界面UI
 */
export function API_BREAK_ACTIVITY(key, panel) {
  if (isWebview) {
    fetchMessage(`unityfun://gotoui?1_string=${key}&2_string=${panel}`, false);
  } else {
    console.warn('跳转到原生活动，浏览器环境不支持', `unityfun://gotoui?1_string=${key}&2_string=${panel}`);
  }
}

// ========================================= 领取奖励

/**
 * 领取奖励
 * @param id 任务ID
 * @returns
 */
export function API_GET_TASK_AWARD(id) {
  return fetchCall('get_task_award', { id });
}

// ========================================= 领取奖励（多阶段任务）

/**
 * @typedef {Object} T_AWARD_DATAⅡ
 * @property {String} asset_type
 * @property {Number} asset_value
 * @property {String} award_name
 */

/**
 * @typedef {Object} RES_GET_TASK_AWARD_NEW
 * @property {Number} id
 * @property {Number} result
 * @property {T_AWARD_DATAⅡ[]} award_list
 */

/**
 * 领取奖励（多阶段任务）
 * @param {Number} taskid
 * @param {Number} level
 * @returns {Promise<RES_GET_TASK_AWARD_NEW>}
 */
export function API_GET_TASK_AWARD_NEW(taskid, level) {
  return fetchCall('get_task_award_new', { id: taskid, award_progress_lv: level });
}

// ========================================= 奖励领取状态（多阶段任务）

/**
 * 获取某个任务各阶段的奖励领取状态
 * @param id 任务ID
 * @param count 任务有共有几个阶段
 * @returns
 */
export function API_TASK_AWARD_STATUS(id, count) {
  if (isWebview) {
    return fetchMessage(`unityfun://decode_all_task_award_status?1_int=${id}&2_int=${count}`, true);
  } else {
    console.warn(
      '浏览器环境不支持获取某个任务各阶段的奖励领取状态',
      `unityfun://decode_all_task_award_status?1_int=${id}`
    );
    return Promise.resolve();
  }
}

// ========================================= 超值月卡

/**
 * 查询月卡信息
 * @returns
 */
export function API_QUERY_NEW_YUEKA_BASE_INFO() {
  return fetchCall('query_new_yueka_base_info');
}

/**
 * 购买尊享月卡后，领取每日奖励
 */
export function API_NEW_YUEKA_RECEIVE_AWARD() {
  return fetchCall('new_yueka_receive_award');
}

// ========================================= 至尊季卡

/**
 * 请求季卡信息
 * @returns
 */
export function API_QUERY_JIKA_BASE_INFO() {
  return fetchCall('query_jika_base_info');
}

/**
 * 每日抽奖
 * @returns
 */
export function API_JIKA_EVERYDAY_LOTTERY() {
  return fetchCall('jika_everyday_lottery');
}

// ========================================= 全返礼包

/**
 * 请求全返礼包数据
 * @returns
 */
export function API_QUERY_ALL_RETURN_LB_INFO() {
  return fetchCall('query_all_return_lb_info');
}

// ========================================= 畅玩卡

/**
 * 请求畅玩卡数据
 */
export function API_QUERY_CHANG_WAN_KA_BASE_INFO() {
  return fetchCall('query_chang_wan_ka_base_info');
}
/**
 * 刷新任务
 * @param index
 * @returns
 */
export function API_REFRESH_CHANG_WAN_KA_TASK(index) {
  return fetchCall('refresh_chang_wan_ka_task', { task_type: index });
}
