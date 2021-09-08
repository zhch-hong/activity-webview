<template>
  <div ref="ScrollTaskArea" class="task-area">
    <div>
      <TaskItem
        v-for="(total, index) of totalList"
        :key="index + '_' + total"
        :total="total"
        :award="awardList[index]"
        :pay="pay"
        :inherit-consumed="consumed"
        :inherit-status="statusList[index]"
        @fetch-award="fetchAward(++index)"
        @go-task="goTask"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import BScroll from '@better-scroll/core';
import TaskItem from './TaskItem.vue';
import { API_TASK_AWARD_STATUS, API_GET_TASK_AWARD_NEW, API_QUERY_ONE_TASK_DATA } from '~/vendors/api';

import AlertPanel from '~/components_call/alert-panel';

export default {
  components: {
    TaskItem,
  },

  props: {
    levelOptions: {
      type: Object,
      required: true,
    },
    pay: {
      type: Boolean,
      required: true,
    },
    inheritConsumed: {
      type: [Number, String],
      default: 0,
    },
  },

  data() {
    return {
      consumed: 0,
      totalList: [],
      awardList: [],
      statusList: [],
    };
  },

  watch: {
    levelOptions: {
      immediate: true,
      handler(options) {
        this.totalList = _.cloneDeep(options.neednum);
        this.awardList = _.cloneDeep(options.awards);
        if (this.pay) {
          this.fetchAwardStatusList();
          this.fetchTaskStatus();
        } else {
          this.statusList = [];
        }
      },
    },

    inheritConsumed: {
      immediate: true,
      handler(value) {
        this.consumed = _.toNumber(value);
      },
    },

    // 当礼包由未购买变为已购买时，请求一次任务数据
    pay(value) {
      if (!value) {
        this.fetchTaskStatus();
      }
    },
  },

  mounted() {
    this.initBScroll();
  },

  methods: {
    initBScroll() {
      setTimeout(() => {
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.ScrollTaskArea, { click: true });
      }, 500);
    },

    /**
     * 领取奖励
     * @param {Number} level
     */
    fetchAward(level) {
      API_GET_TASK_AWARD_NEW(this.levelOptions.taskid, level).then(({ result }) => {
        if (result === 0) {
          _.delay(this.fetchAwardStatusList, 500);
        }
      });
    },

    /**
     * 请求任务各阶段奖励领取状态
     */
    fetchAwardStatusList() {
      API_TASK_AWARD_STATUS(this.levelOptions.taskid, this.awardList.length).then((value) => {
        if (typeof value !== 'undefined') {
          this.statusList = value.result;
        }
      });
    },

    /**
     * 请求任务数据
     */
    async fetchTaskStatus() {
      const { task_data } = await API_QUERY_ONE_TASK_DATA(this.levelOptions.taskid);
      const { now_total_process } = task_data;
      this.consumed = _.toNumber(now_total_process);
    },

    goTask() {
      if (this.pay) {
        AlertPanel('请前往捕鱼场完成任务');
      } else {
        AlertPanel('购买礼包后任务解锁');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task-area {
  margin-top: 141px;
  height: 386px;
  text-align: center;
  overflow: hidden;
}
</style>
