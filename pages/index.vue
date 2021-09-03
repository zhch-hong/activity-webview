<template>
  <div class="index">
    <button @click="alertHandler">Alert</button>
    <van-divider></van-divider>
    <button @click="payHandler">Pay</button>
    <van-divider></van-divider>
    <AssetItem name="jing_bi">3000</AssetItem>
    <van-divider></van-divider>
    <nuxt-link to="/act_035_ybwl_web">一本万利</nuxt-link>
  </div>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import PayPanel from '~/components_call/pay_panel';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

export default {
  data() {
    return {
      stopMessage: null,
    };
  },
  mounted() {
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
      PayPanel(10087, 6);
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
