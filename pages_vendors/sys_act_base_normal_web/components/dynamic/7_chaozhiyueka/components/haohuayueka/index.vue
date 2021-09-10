<template>
  <div class="haohua">
    <img class="ques" src="~/assets/image/qs.png" alt="奖励领取" @click="showTips" />

    <!-- 剩余天数 -->
    <span class="count">{{ count }}</span>

    <!-- 已购买的遮罩 -->
    <div v-if="!enable" class="jinbi-overlay">
      <img class="yilingqu" src="../../image/yk_icon_ylq.png" alt="已领取" />
    </div>

    <!-- 点击问号显示/隐藏救济金说明 -->
    <img v-if="quesShow" class="jiujijin" src="../../image/yk_bg_2.png" alt="救济金" />

    <!-- 立即领取 -->
    <div v-if="enable" class="buy" @click="submit"></div>

    <!-- 已购买 -->
    <div v-if="!enable" class="yigoumai"></div>
  </div>
</template>
<script>
import _ from 'lodash';
import PayPanel from '~/components_call/pay_panel';
import { HHYUEKA } from '~/vendors/shopping';

export default {
  props: {
    baseData: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      count: 30,
      enable: true,
      quesShow: false,
    };
  },

  watch: {
    baseData: {
      deep: true,
      immediate: true,
      handler(object) {
        if (!_.isEmpty(object) && process.client) {
          if (object.total_remain_num_1 === 0) {
            this.count = 30;
            this.enable = true;
          } else {
            this.count = object.total_remain_num_1;
            this.enable = false;
          }
        }
      },
    },
  },

  methods: {
    submit() {
      PayPanel(HHYUEKA.id, HHYUEKA.price);
    },

    showTips() {
      this.quesShow = true;

      setTimeout(() => {
        document.addEventListener(
          'click',
          () => {
            this.quesShow = false;
          },
          { once: true }
        );
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
