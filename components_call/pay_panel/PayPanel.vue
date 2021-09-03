<template>
  <BaseOverlay @close="$emit('close')">
    <template #title>
      <span>支付方式</span>
    </template>
    <div class="select">
      <div class="price">￥{{ price }}</div>
      <div class="types">
        <div v-if="wxpay" class="pay wx" @click="createOrder('weixin')"></div>
        <div v-if="alipay" class="pay zfb" @click="createOrder('alipay')"></div>
        <div v-if="unionpay" class="pay ysf" @click="createOrder('UnionPay')"></div>
      </div>
    </div>
  </BaseOverlay>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import { API_CREATE_PAY_ORDER, API_OPEN_BROWSER } from '~/vendors/api';
import { isWebview } from '~/vendors/runtime-env';

export default {
  props: ['id', 'price', 'wxpay', 'alipay', 'unionpay'],

  methods: {
    createOrder(value) {
      // eslint-disable-next-line camelcase
      API_CREATE_PAY_ORDER(this.id, value).then(({ order_id, result, url }) => {
        if (result !== 0) {
          AlertPanel(`创建订单失败[${result}]`);
          return;
        }

        url = url.replace('@order_id@', order_id).replace('@child_channel@', 'Native');
        if (isWebview && process.env.NODE_ENV === 'production') {
          API_OPEN_BROWSER(url);
        }

        this.$emit('close');
      });
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
