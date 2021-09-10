<template>
  <div class="task-row">
    <van-row style="height: 100%">
      <van-col span="16">
        <div class="progress">
          <p class="title">{{ inheritTask.text }}</p>
          <div class="bottom">
            <div class="scroll-warp">
              <div class="scroll-bar" :style="{ width: barWidth }"></div>
              <span class="count">{{ tranNumber(inheritTask.progress) }}/{{ tranNumber(inheritTask.total) }}</span>
            </div>
            <template v-if="inheritTask.taskid !== 21319 && statusRef === 0">
              <button class="refresh" @click="$emit('refresh')"></button>
              <span v-if="refreshPrice" class="tip">（3万金币）</span>
            </template>
          </div>
        </div>
      </van-col>
      <van-col span="3">
        <div class="award">
          <img v-if="awardIcon" class="icon" :src="require('../image/' + awardIcon + '.png')" alt="奖励icon" />
          <p class="text">{{ awardText }}</p>
        </div>
      </van-col>
      <van-col span="5">
        <div class="handler">
          <button class="submit" :style="{ 'background-image': submitImage }" @click="submit"></button>
          <p class="count">剩余{{ inheritTask.remainNum }}次</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts">
import tranNumber from '~/utils/transform-unit';
import AlertPanel from '~/components_call/alert-panel';
import { API_GET_TASK_AWARD } from '~/vendors/api';

export default {
  props: {
    inheritTask: {
      type: Object,
      required: true,
    },
    refreshPrice: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      barWidth: '',
      submitImage: '',
      awardIcon: '',
      awardText: '',
      statusRef: null,
    };
  },
  watch: {
    inheritTask: {
      deep: true,
      immediate: true,
      handler(object) {
        this.computedView(object);
      },
    },
  },

  methods: {
    tranNumber,

    computedView(object) {
      object = object || this.inheritTask;
      const { total: t, progress: _p, status: s, awardIcon, awardText } = object;
      let p = _p;
      this.awardIcon = awardIcon;
      this.awardText = awardText;

      // 进度条
      if (p > t) p = t;
      this.barWidth = (p / t) * 100 + '%';

      this.statusRef = s;

      // 按钮图
      if (s === 0) this.submitImage = `url(${require('../image/qianwang.png')})`;
      else if (s === 1) this.submitImage = `url(${require('../image/lingqu.png')})`;
      else if (s === 2) this.submitImage = `url(${require('../image/yilingqu.png')})`;
    },

    submit() {
      if (this.statusRef === 2) return;

      if (this.statusRef === 0) {
        AlertPanel('请前往游戏完成任务');
        return;
      }

      API_GET_TASK_AWARD(this.inheritTask.taskid).then(() => {
        this.$emit('award-done');
        this.$emit('refresh-data');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task-row {
  height: 164px;
  background: url('../image/task_row.png') center/contain no-repeat;
  margin-bottom: 40px;
}

.progress {
  padding-left: 30px;
  .title {
    margin: 30px 0 18px;
    color: #276199;
    font-size: 32px;
    white-space: nowrap;
  }

  .bottom {
    display: flex;
    align-items: center;

    .scroll-warp {
      position: relative;
      display: inline-block;
      width: 400px;
      height: 40px;
      overflow: hidden;
      border-radius: 20px;
      background-color: rgba($color: #4483a5, $alpha: 0.5);

      .scroll-bar {
        height: 100%;
        background-color: #f7c638;
        width: 30%;
      }

      .count {
        position: absolute;
        white-space: nowrap;
        color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .refresh {
      margin-left: 20px;
      border: unset;
      width: 132px;
      height: 55px;
      background: url('../image/refresh.png') center/contain no-repeat;
    }

    .tip {
      color: #39b4fd;
    }
  }
}

.award {
  width: 141px;
  height: 141px;
  margin: 10px auto 0 auto;
  background: url('../image/award.png') center/contain no-repeat;

  .icon {
    position: relative;
    top: 16px;
    max-width: 70%;
    max-height: 50%;
    display: block;
    margin: 0 auto;
  }

  .text {
    position: relative;
    top: 35px;
    color: #fff;
    font-size: 26px;
    text-align: center;
    margin: 0;
  }
}

.handler {
  text-align: center;
  margin-top: 30px;

  .submit {
    border: unset;
    width: 212px;
    height: 83px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
  }
  .count {
    margin: 0;
    color: #39b4fd;
  }
}
</style>
