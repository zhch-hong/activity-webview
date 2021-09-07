import Vue from 'vue';
import PayPanel from './PayPanel.vue';
import { API_GET_PAY_TYPES } from '~/vendors/api';
import AlertPanel from '~/components_call/alert-panel';

const data = Vue.observable({
  id: null,
  price: null,
  wxpay: false,
  alipay: false,
  unionpay: false,
});

const app = new Vue({
  render(h) {
    return h(PayPanel, {
      props: {
        id: data.id,
        price: data.price,
        wxpay: data.wxpay,
        alipay: data.alipay,
        unionpay: data.unionpay,
      },
      on: {
        close: () => {
          app.$el.remove();
        },
      },
    });
  },
});

/**
 * 获取支付方式
 * @param {Number} id
 * @returns {Boolean}
 */
async function getPayType(id) {
  const { result, types } = await API_GET_PAY_TYPES(id);

  if (result !== 0) {
    AlertPanel(`获取支付方式失败[${result}]`);
    data.wxpay = false;
    data.alipay = false;
    data.unionpay = false;
    return false;
  }

  // eslint-disable-next-line no-unneeded-ternary
  data.wxpay = types.findIndex((t) => t.channel === 'weixin') === -1 ? false : true;
  // eslint-disable-next-line no-unneeded-ternary
  data.alipay = types.findIndex((t) => t.channel === 'alipay') === -1 ? false : true;
  // eslint-disable-next-line no-unneeded-ternary
  data.unionpay = types.findIndex((t) => t.channel === 'UnionPay') === -1 ? false : true;
  return true;
}

/**
 * 支付
 * @param {Number} id 礼包id
 * @param {Number} price 礼包价格
 */
async function payPanel(id, price) {
  data.id = id;
  data.price = price;

  const result = await getPayType(id);
  if (result) {
    if (typeof app.$el === 'undefined') {
      const div = document.createElement('div');
      document.querySelector('#__nuxt').append(div);
      app.$mount(div);
    } else {
      document.querySelector('#__nuxt').append(app.$el);
    }
  }
}

export default payPanel;
