import _ from 'lodash';
import Vue from 'vue';
import AssetNotify from './AssetNotify.vue';
import emitter from '~/vendors/emitter';

/**
 * @typedef {Object} ASSET_ITEM
 * @property {String} name
 * @property {Number} count
 */

const app = new Vue({
  data() {
    return {
      notifyStack: [],
      currentStack: [],
    };
  },

  render(h) {
    return h(AssetNotify, {
      props: {
        notifyList: this.currentStack,
      },
      on: {
        confirm: () => {
          if (this.notifyStack.length === 0) {
            app.$el.remove();
          } else {
            this.currentStack = _.cloneDeep(this.notifyStack);
            this.notifyStack.splice(0, this.notifyStack.length);
          }
        },
      },
    });
  },
});

// 资产通知消息会发送到每一个webview，所以当webview显示时需要清除通知，以免在A活动中的资产通知，出现在了B活动中
emitter.on('webviewWillAppear', () => {
  app.notifyStack.splice(0, app.notifyStack.length);

  if (!_.isEmpty(app.$el)) {
    app.$el.remove();
  }
});

let timeout = null;

/**
 * 资产通知
 * @param {ASSET_ITEM[]} assets
 */
function assetNotify(assets) {
  app.notifyStack.push(...assets);

  if (timeout !== null) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    timeout = null;
    app.currentStack = _.cloneDeep(app.notifyStack);
    app.notifyStack.splice(0, app.notifyStack.length);
    if (_.isEmpty(app.$el)) {
      const div = document.createElement('div');
      document.querySelector('#__nuxt').append(div);
      app.$mount(div);
    } else {
      document.querySelector('#__nuxt').append(app.$el);
    }
  }, 1000);
}

export { default as notifyValidate } from '~/vendors/asset-notify-validate';
export default assetNotify;
