<template>
  <div class="zunxiang">
    <!-- 剩余天数 -->
    <span class="count">{{ count }}</span>

    <!-- 已购买的遮罩 -->
    <div v-if="!enable" class="jinbi-overlay">
      <img class="yilingquicon" src="../../image/yk_icon_ylq.png" alt="已领取" />
    </div>

    <!-- 购买 -->
    <div v-if="enable" class="buy" @click="submit"></div>

    <!-- 立即领取 -->
    <div v-if="!enable && !lingqu" class="lijilingqu" @click="onclickLingqu"></div>
    <!-- 已领取 -->
    <div v-if="!enable && lingqu" class="yilingqu"></div>
  </div>
</template>
<script>
import _ from 'lodash';
import PayPanel from '~/components_call/pay_panel';
import { ZXYUEKA } from '~/vendors/shopping';
import { API_NEW_YUEKA_RECEIVE_AWARD } from '~/vendors/api';

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
      lingqu: false,
    };
  },

  watch: {
    baseData: {
      deep: true,
      immediate: true,
      handler(object) {
        if (!_.isEmpty(object) && process.client) {
          if (object.total_remain_num_2 === 0) {
            this.count = 30;
            this.enable = true;
          } else {
            this.count = object.total_remain_num_2;
            this.enable = false;

            if (object.is_receive_2 === 0) this.lingqu = false;
            else this.lingqu = true;
          }
        }
      },
    },
  },

  methods: {
    submit() {
      PayPanel(ZXYUEKA.id, ZXYUEKA.price);
    },

    onclickLingqu() {
      API_NEW_YUEKA_RECEIVE_AWARD();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
