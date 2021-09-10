<template>
  <div>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/act_035_ybwl_web', query: { token } }">一本万利</nuxt-link>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/gift_10087_web', query: { token } }">每日特惠</nuxt-link>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/act_022_qflb_web', query: { token } }">全返礼包</nuxt-link>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/gift_10087_web', query: { token } }">每日特惠</nuxt-link>
    <van-divider></van-divider>
    <nuxt-link :to="{ path: '/act_016_xyxcwk_web', query: { token } }">小游戏畅玩卡</nuxt-link>
  </div>
</template>
<script>
import parseHref from '~/vendors/parse-href';

export default {
  data() {
    return {
      token: '',
    };
  },

  mounted() {
    const { token } = parseHref();
    this.token = token;
  },
};
</script>
