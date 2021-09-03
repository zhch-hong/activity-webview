<template>
  <div class="index">
    <button @click="alertHandler">Alert</button>
    <van-divider></van-divider>
    <button @click="payHandler">Pay</button>
    <van-divider></van-divider>
    <AssetItem name="jing_bi">3000</AssetItem>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/act_035_ybwl_web', query: { token } }">一本万利</nuxt-link>
  </div>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import PayPanel from '~/components_call/pay_panel';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';
import parseHref from '~/vendors/parse-href';

export default {
  data() {
    return {
      token: '',
      stopMessage: null,
    };
  },

  mounted() {
    const { token } = parseHref();
    this.token = token;
    this.stopMessage = SKT_NOTIFY_ASSET_CHANGE_MSG();
  },

  beforeDestroy() {
    this.stopMessage();
  },

  methods: {
    alertHandler() {
      AlertPanel('验证码无效');
    },

    payHandler() {
      PayPanel(10091, 6);
    },
  },
};
</script>
<style lang="scss" scoped>
.index {
  width: 1920px;
  height: 1080px;
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
