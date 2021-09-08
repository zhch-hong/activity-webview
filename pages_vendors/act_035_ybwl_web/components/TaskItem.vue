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
        <span v-if="pay" class="rate">{{ tranNumber(consumed) }}/{{ tranNumber(total) }}</span>
        <span v-else class="rate">待激活</span>
      </div>
    </div>
    <!-- 领取状态 -->
    <div :class="['submit', 'award_' + status]" @click="submitHandler"></div>
  </div>
</template>
<script>
import tranNumber from '~/utils/transform-unit';
export default {
  props: {
    /** 奖励的数量，达到需要消耗的数量时领取 */
    award: {
      type: Number,
      required: true,
    },

    /** 需要消耗的数量 */
    total: {
      type: Number,
      required: true,
    },

    /** 当前阶段奖励是否领取 */
    inheritStatus: {
      type: Number,
      default: 0,
    },

    /** 当前已消耗的数量 */
    inheritConsumed: {
      type: Number,
      default: 0,
    },
    /** 是否已购买档次 */
    pay: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      barWidth: '',
      consumed: 0,
      status: 0,
    };
  },

  watch: {
    inheritConsumed: {
      immediate: true,
      handler(value) {
        this.consumed = value;
        this.watchCallback();
      },
    },

    inheritStatus: {
      immediate: true,
      handler(value) {
        this.status = value;
      },
    },

    total: {
      immediate: true,
      handler() {
        this.watchCallback();
      },
    },

    pay: {
      immediate: true,
      async handler(value) {
        await this.$nextTick();
        if (!value) {
          this.barWidth = 0;
          this.status = 0;
        }
      },
    },
  },

  beforeMount() {
    this.watchCallback();
  },

  methods: {
    tranNumber,

    submitHandler() {
      if (this.status === 2) return;

      if (this.status === 1) {
        this.$emit('fetch-award');
        return;
      }

      if (this.status === 0) {
        this.$emit('go-task');
      }
    },

    watchCallback() {
      const c = this.consumed;
      const t = this.total;

      if (c >= t) {
        this.barWidth = '100%';
        this.consumed = this.total;
        // 如果当前按钮是0[没有达到消耗额度]，则置为1[可以领取]
        if (this.status === 0) this.status = 1;
      } else {
        this.barWidth = ((c / t) * 100 + '%').toString();
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
