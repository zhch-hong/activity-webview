<template>
  <div class="task-panel">
    <main class="main">
      <div class="award-list">
        <div v-for="(item, index) in levelOptions.taskAwards" :key="index" class="item-box">
          <AwardItem :icon="item.icon" :text="item.text" />
        </div>
      </div>
      <div class="progress">
        <div class="scroll-wrap">
          <div class="scroll-bar" :style="{ width }"></div>
          <span class="text">{{ tranNumber(progress) }}/{{ tranNumber(levelOptions.needProcess) }}</span>
        </div>
        <span class="tip">次日清零</span>
      </div>
    </main>
    <footer class="footer">
      <p class="cutdown">剩余领取天数：{{ inheritCutdown }}天</p>
      <button class="submit" :style="{ 'background-image': backImage }" @click="submit">{{ submitText }}</button>
    </footer>
  </div>
</template>
<script>
import AwardItem from './AwardItem.vue';

import tranNumber from '~/utils/transform-unit';
import AlertPanel from '~/components_call/alert-panel';
import { API_GET_TASK_AWARD } from '~/vendors/api';

export default {
  components: {
    AwardItem,
  },

  props: {
    inheritProgress: {
      type: Number,
      required: true,
    },
    inheritCutdown: {
      type: Number,
      required: true,
    },
    inheritStatus: {
      type: Number,
      required: true,
    },
    levelOptions: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      width: '0',
      submitText: '',
      backImage: '',
      progress: 0,
    };
  },

  watch: {
    levelOptions() {
      this.computedView();
    },
    inheritProgress() {
      this.computedView();
    },
    inheritStatus() {
      this.computedView();
    },
  },

  beforeMount() {
    this.computedView();
  },

  methods: {
    tranNumber,

    computedView() {
      const n = this.levelOptions.needProcess;
      const p = this.inheritProgress;
      const s = this.inheritStatus;

      if (n <= p) {
        this.width = '100%';
        this.progress = n;
      } else {
        this.width = (p / n) * 100 + '%';
        this.progress = p;
      }

      if (s === 0) {
        this.submitText = '去完成';
        this.backImage = `url(${require('../image/ty_btn_huang1.png')})`;
      } else if (s === 1) {
        this.submitText = '领取';
        this.backImage = `url(${require('../image/ty_btn_huang1.png')})`;
      } else if (s === 2) {
        this.submitText = '今日已完成';
        this.backImage = `url(${require('../image/ty_btn_huang2.png')})`;
      }
    },

    submit() {
      if (this.inheritStatus === 0) {
        AlertPanel('请前往游戏完成任务');
        return;
      }

      if (this.inheritStatus === 1) {
        API_GET_TASK_AWARD(this.levelOptions.taskid).then(() => {
          this.$emit('fetch-award-done');
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task-panel {
  position: absolute;
  top: 350px;
  left: 400px;
  width: 1100px;
  height: 640px;

  .main {
    display: flex;
    flex-direction: column;
    height: 370px;

    .award-list {
      display: flex;
      padding-top: 30px;
      justify-content: space-around;

      .item-box {
        display: inline-block;
      }
    }

    .progress {
      box-sizing: border-box;

      position: relative;
      flex-grow: 1;
      text-align: center;

      .scroll-wrap {
        position: relative;
        margin-top: 25px;
        display: inline-block;
        height: 61px;
        border-radius: 31px;
        width: 600px;
        background-color: rgba($color: #000000, $alpha: 0.3);
        overflow: hidden;

        .scroll-bar {
          height: 100%;
          background-color: #edc719;
        }

        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 40px;
          color: #fff;
        }
      }
      .tip {
        color: #fff;
        vertical-align: 18px;
        margin-left: 6px;
        font-size: 42px;
      }
    }
  }

  .footer {
    text-align: center;

    .cutdown {
      margin: 0;
      font-size: 50px;
      color: #fff;
      text-shadow: 0 1px #648aac, 1px 0 #648aac, -1px 0 #648aac, 0 -1px #648aac;
      -webkit-text-stroke: 0.3px #648aac;
    }

    .submit {
      margin-top: 30px;
      border: none;
      width: 342px;
      height: 132px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: unset;
      font-size: 56px;
      color: #fff;
    }
  }
}
</style>
