<template>
  <div class="index">
    <button @click="alertHandler">Alert</button>
    <van-divider></van-divider>
    <button @click="payHandler">Pay</button>
  </div>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import PayPanel from '~/components_call/pay_panel';

export default {
  methods: {
    alertHandler() {
      AlertPanel('验证码无效');
    },

    payHandler() {
      PayPanel(10243, 99);
    },
  },
};
</script>
<style lang="scss" scoped>
.index {
  width: 1920px;
  height: 1080px;
  background-color: aquamarine;
}
</style>
