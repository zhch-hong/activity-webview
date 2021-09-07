<template>
  <div class="task">
    <div class="left">
      <img class="icon" src="~/assets/image/ty_icon_jb_6y.png" alt="金币" />
      <span>{{ tranNumber(award) }}</span>
    </div>
    <div class="middle">
      <span>
        游戏中累计消耗金币<b>{{ tranNumber(total) }}</b>
      </span>
      <div class="progress">
        <div class="bar" :style="{ width: barWidth }"></div>
        <span v-if="currentIsPay" class="rate">{{ tranNumber(localConsumed) }}/{{ tranNumber(total) }}</span>
        <span v-else class="rate">待激活</span>
      </div>
    </div>
    <!-- 领取状态 -->
    <div :class="['submit', 'award_' + getAward]" @click="submitHandler"></div>
  </div>
</template>
<script>
import tranNumber from '~/utils/transform-unit';
export default {
  props: {
    /** 奖励的数量，达到需要消耗的数量时领取 */
    award: {
      type: [Number, String],
      default: 0,
    },

    /** 需要消耗的数量 */
    total: {
      type: [Number, String],
      default: 0,
    },

    /** 当前阶段奖励是否领取 */
    getAward: {
      type: [Number, String],
      default: 0,
    },

    /** 当前已消耗的数量 */
    consumed: {
      type: [Number, String],
      default: 0,
    },

    currentIsPay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      barWidth: '',
    };
  },

  computed: {
    localConsumed: {
      get() {
        return this.consumed;
      },
      set(value) {
        // value
      },
    },
  },

  watch: {
    consumed: {
      handler(value) {
        this.watchCallback(value);
      },
    },

    total: {
      handler(value) {
        this.watchCallback(undefined, value);
      },
    },
  },

  beforeMount() {
    this.watchCallback();
  },

  methods: {
    tranNumber,

    submitHandler() {
      if (this.getAward === 2) return;

      if (this.getAward === 1) {
        this.$emit('fetch-award');
        return;
      }

      if (this.getAward === 0) {
        this.$emit('go-task');
      }
    },

    watchCallback(c, t) {
      c = c || this.consumed;
      t = t || this.total;

      if (c >= t) {
        this.barWidth = '100%';
        this.localConsumed = this.total;
      } else {
        this.barWidth = ((c / t) * 100 + '%').toString();
        this.localConsumed = c;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
div.task {
  height: 137px;
  background: url('~/pages_vendors/act_035_ybwl_web/image/task.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
}

div.left {
  text-align: center;
  padding: 0 20px;

  img.icon {
    width: 108px;
    height: 80px;
    display: block;
  }

  span {
    color: #3689bd;
  }
}

div.middle {
  flex-grow: 1;

  span {
    color: #0a68a3;
    white-space: nowrap;

    b {
      color: #ffebe6;
      margin-left: 8px;
      display: inline-block;
      width: 110px;
      text-align: left;
      text-shadow: 0 1px #b76233, 1px 0 #b76233, -1px 0 #b76233, 0 -1px #b76233;
      -webkit-text-stroke: 0.3px #b76233;
    }
  }

  div.progress {
    position: relative;
    width: 80%;
    margin-left: 10%;
    height: 28px;
    border-radius: 14px;
    background-color: #5887a5;
    margin-top: 10px;
    overflow: hidden;

    div.bar {
      height: 28px;
      background-color: #ffc13b;
    }

    span.rate {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 24px;
    }
  }
}

.submit {
  width: 163px;
  height: 63px;
  margin: 0 20px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.award_0 {
  background: url('~/pages_vendors/act_035_ybwl_web/image/qwc.png') center/contain no-repeat;
}
.award_1 {
  background: url('~/assets/image/lq.png') center/contain no-repeat;
}
.award_2 {
  background: url('~/assets/image/ylq.png') center/contain no-repeat;
}
</style>
