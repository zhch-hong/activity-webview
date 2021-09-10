<template>
  <div class="task-panel">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_2.png" alt="关闭" />
    </a>

    <!-- 规则说明 -->
    <img class="ques" src="../image/com_btn_rule2.png" alt="规则说明" @click="ruleHandler" />

    <main class="main">
      <p class="cutdown">剩余时间：{{ overTime }}</p>
      <TaskRow
        :inherit-task="taskTop"
        :refresh-price="showRefreshSub"
        @award-done="fetchTaskTop"
        @refresh-data="fetchChangwanka"
      />
      <TaskRow
        :inherit-task="taskMid"
        :refresh-price="showRefreshSub"
        @award-done="fetchTaskMid"
        @refresh="refreshHandler(1)"
        @refresh-data="fetchChangwanka"
      />
      <TaskRow
        :inherit-task="taskBot"
        :refresh-price="showRefreshSub"
        @award-done="fetchTaskBot"
        @refresh="refreshHandler(2)"
        @refresh-data="fetchChangwanka"
      />
    </main>
  </div>
</template>
<script>
import _ from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

import TaskRow from './TaskRow.vue';

import RulePanel from '~/components_call/rule-panel';
import { CHANGWANKATASK } from '~/vendors/shopping';
import {
  API_REFRESH_CHANG_WAN_KA_TASK,
  API_QUERY_ONE_TASK_DATA,
  API_QUERY_CHANG_WAN_KA_BASE_INFO,
} from '~/vendors/api';
import { SKT_TASK_CHANGE_MSG } from '~/vendors/api-socket';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const tempTask = {
  taskid: 0,
  text: '',
  total: 0,
  award: 0,
  type: '',
  status: 0,
  remainNum: 0,
  progress: 0,
  awardIcon: '',
  awardText: '',
};

export default {
  components: {
    TaskRow,
  },

  data() {
    return {
      taskTop: _.cloneDeep(tempTask),
      taskMid: _.cloneDeep(tempTask),
      taskBot: _.cloneDeep(tempTask),
      overTime: null,
      timer: null,
      showRefreshSub: false,
    };
  },

  beforeMount() {
    this.fetchChangwanka();
    this.fetchTaskTop();
    this.fetchTaskMid();
    this.fetchTaskBot();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_TASK_CHANGE_MSG = SKT_TASK_CHANGE_MSG(({ task_item }) => {
        if (task_item) {
          const { id } = task_item;

          if (id === this.taskMid.taskid) {
            const { award_status, now_total_process } = task_item;
            this.taskMid.progress = _.toNumber(now_total_process);
            this.taskMid.status = award_status;
          }

          if (id === this.taskBot.taskid) {
            const { award_status, now_total_process } = task_item;
            this.taskBot.progress = _.toNumber(now_total_process);
            this.taskBot.status = award_status;
          }
        }
      });
    },

    uninstallSocket() {
      this.STOP_TASK_CHANGE_MSG();
    },

    /**
     * 请求畅玩卡数据
     */
    fetchChangwanka() {
      API_QUERY_CHANG_WAN_KA_BASE_INFO().then(
        ({ result, remain_num_1, remain_num_2, remain_num_3, over_time, refresh_task_num }) => {
          if (result === 0) {
            this.taskTop.remainNum = remain_num_1;
            this.taskMid.remainNum = remain_num_2;
            this.taskBot.remainNum = remain_num_3;

            this.startLoopTime(over_time);

            this.showRefreshSub = refresh_task_num !== 0;
          }
        }
      );
    },

    fetchTaskTop() {
      API_QUERY_ONE_TASK_DATA(21319).then(({ task_data }) => {
        if (task_data) {
          this.taskTop.taskid = 21319;
          this.taskTop.text = '登录时可领取';
          this.taskTop.total = 1;
          this.taskTop.award = 1;
          this.taskTop.status = task_data.award_status;
          this.taskTop.progress = 1;
          this.taskTop.awardIcon = 'ty_icon_jb_30y';
          this.taskTop.awardText = '40万金币';
        }
      });
    },

    fetchTaskMid() {
      API_QUERY_ONE_TASK_DATA(21320).then(({ task_data }) => {
        if (task_data) {
          const { other_data_str } = task_data;
          if (other_data_str) {
            const t = CHANGWANKATASK.find((c) => c.taskid === _.toNumber(other_data_str));
            if (t) Object.assign(this.taskMid, t);
            this.taskMid.awardIcon = 'ty_icon_jb_15y';
            this.taskMid.awardText = '10万金币';

            API_QUERY_ONE_TASK_DATA(_.toNumber(other_data_str)).then(({ task_data }) => {
              if (task_data) {
                this.taskMid.progress = _.toNumber(task_data.now_total_process);
                this.taskMid.status = task_data.award_status;
              }
            });
          }
        }
      });
    },

    fetchTaskBot() {
      API_QUERY_ONE_TASK_DATA(21321).then(({ task_data }) => {
        if (task_data) {
          const { other_data_str } = task_data;
          if (other_data_str) {
            const t = CHANGWANKATASK.find((c) => c.taskid === _.toNumber(other_data_str));
            if (t) Object.assign(this.taskBot, t);
            this.taskBot.awardIcon = 'ty_icon_flq';
            this.taskBot.awardText = '400福利券';

            API_QUERY_ONE_TASK_DATA(_.toNumber(other_data_str)).then(({ task_data }) => {
              if (task_data) {
                this.taskBot.progress = _.toNumber(task_data.now_total_process);
                this.taskBot.status = task_data.award_status;
              }
            });
          }
        }
      });
    },

    /**
     * 刷新任务
     * @param {Number} index
     */
    refreshHandler(index) {
      API_REFRESH_CHANG_WAN_KA_TASK(index).then(({ result }) => {
        if (result === 0) {
          if (index === 1) this.fetchTaskMid();
          if (index === 2) this.fetchTaskBot();

          this.fetchChangwanka();
        }
      });
    },

    /**
     * 开启倒计时
     * @param {Number} timeStamp
     */
    startLoopTime(timeStamp) {
      if (this.timer) clearInterval(this.timer);

      const tim = dayjs.unix(timeStamp);

      this.timer = setInterval(() => {
        const diff = tim.diff(dayjs());

        if (diff <= 0) {
          // 到期时清除定时器，重新请求状态数据
          if (this.timer) {
            clearInterval(this.timer);
          }

          _.delay(() => {
            this.$emit('time-over');
          }, 2000);
        } else if (diff < 24 * 60 * 60 * 1000) {
          this.overTime = dayjs.duration(diff, 'ms').format('H:mm:ss');
        } else {
          this.overTime = dayjs.duration(diff, 'ms').format('D天H:mm:ss');
        }
      }, 1000);
    },

    ruleHandler() {
      const ruleList = [
        '畅享卡购买后立得500万金币，剩余20天每日登录可领40万金币',
        '每日完成后2个任务共领400福利券，每个任务每日限领一次，共领20次',
        '任务刷新首次免费，之后每次需30000金币，次数不限',
        '当日未完成的任务次日清零，刷新重置',
        '任务需在购买30日内完成，时间截止后任务失效',
      ];

      RulePanel(ruleList);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-panel {
  position: relative;
  width: 1920px;
  height: 1080px;
  background: url('../image/back2.png') center/contain no-repeat;
}
a.close {
  position: absolute;
  right: 160px;
  top: 60px;

  img {
    width: 96px;
    height: 100px;
  }
}

img.ques {
  position: absolute;
  width: 58px;
  height: 58px;
  top: 200px;
  right: 320px;
}

.main {
  position: relative;
  top: 260px;
  width: 1287px;
  margin: 0 auto;

  .cutdown {
    text-align: center;
    color: #4d4eb0;
  }
}
</style>
