<template>
  <div class="zhizunjika">
    <div class="yueka">
      <div class="overlay">
        <img class="yilingquicon" src="../../image/yk_icon_ylq.png" alt="已领取" />
      </div>
      <span class="count">{{ count }}</span>

      <!-- 已领取 -->
      <div v-if="isLingqu" class="yilingqu"></div>
      <!-- 领取 -->
      <div v-else class="lingqu" @click="submit"></div>
    </div>
    <div class="jika">
      <div class="lingqu" @click="breakActivity"></div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { API_BREAK_ACTIVITY, API_NEW_YUEKA_RECEIVE_AWARD } from '~/vendors/api';

export default {
  props: {
    baseData: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      isLingqu: false,
      count: 30,
    };
  },

  watch: {
    baseData: {
      deep: true,
      immediate: true,
      handler(object) {
        if (!_.isEmpty(object) && process.client) {
          this.isLingqu = object.is_receive_2 !== 0;
          this.count = object.total_remain_num_2;
        }
      },
    },
  },

  methods: {
    submit() {
      API_NEW_YUEKA_RECEIVE_AWARD();
    },

    breakActivity() {
      API_BREAK_ACTIVITY('act_004_jika', 'panel');
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss" />
