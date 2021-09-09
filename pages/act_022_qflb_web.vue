<template>
  <div class="act_022_qflb_web">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_2.png" alt="关闭" />
    </a>

    <!-- 说明 -->
    <img
      class="rule-panel"
      src="../pages_vendors/act_022_qflb_web/image/qflb_btn_wh.png"
      alt="说明"
      @click="ruleHandler"
    />

    <!-- 100%全返 -->
    <img class="tip" src="../pages_vendors/act_022_qflb_web/image/qflb_icon_sm.png" alt="100%全返" />

    <!-- 所得资产 -->
    <div class="all-award" v-html="selectedLevel.content"></div>

    <!-- 导航菜单 -->
    <ul class="menu-ul">
      <li
        v-for="item of QUANFANLIBAO"
        :key="item.id"
        :class="[selectedLevel.id === item.id ? 'active' : 'inactive']"
        @click="selectedLevel = item"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>

    <template v-if="activePanel === 'pay'">
      <PayPanel :level-options="selectedLevel" />
    </template>
    <template v-if="activePanel === 'task'">
      <TaskPanel
        :inherit-progress="progress"
        :inherit-cutdown="cutdown"
        :inherit-status="status"
        :level-options="selectedLevel"
        @fetch-award-done="fetchRootStatus"
      />
    </template>
  </div>
</template>
<script>
import _ from 'lodash';
import { QUANFANLIBAO } from '~/vendors/shopping';
import { API_QUERY_ONE_TASK_DATA, API_QUERY_ALL_RETURN_LB_INFO } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG, SKT_NOTIFY_PAY_ORDER_MSG, SKT_TASK_CHANGE_MSG } from '~/vendors/api-socket';
import RulePanel from '~/components_call/rule-panel';

import PayPanel from '~/pages_vendors/act_022_qflb_web/components/PayPanel.vue';
import TaskPanel from '~/pages_vendors/act_022_qflb_web/components/TaskPanel.vue';

export default {
  name: 'QUANFANLIBAO',

  components: {
    PayPanel,
    TaskPanel,
  },

  data() {
    return {
      QUANFANLIBAO,
      activePanel: '', // 礼包面板或任务面板
      selectedLevel: QUANFANLIBAO[0], // 选择的级别配置
      progress: 0, // 任务进度
      bought: [], // 已购买的礼包id
      cutdown: 0, // 礼包剩余天数
      cutdownMap: {
        10084: 0,
        10085: 0,
        10086: 0,
      }, // 每个礼包剩余天数
      status: 0, // 奖励领取状态
    };
  },

  watch: {
    selectedLevel() {
      this.selectedPayChange();
    },
    bought: {
      deep: true,
      handler() {
        this.selectedPayChange();
      },
    },
  },

  async beforeMount() {
    await this.fetchRootStatus();

    if (this.bought.includes(this.selectedLevel.id)) {
      this.fetchTask();
    }

    this.selectedPayChange();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();

      this.STOP_NOTIFY_PAY_ORDER_MSG = SKT_NOTIFY_PAY_ORDER_MSG(({ goods_id }) => {
        if (QUANFANLIBAO.find((item) => item.id === goods_id)) {
          this.fetchRootStatus();
        }
      });

      this.STOP_TASK_CHANGE_MSG = SKT_TASK_CHANGE_MSG(({ task_item }) => {
        const { id } = task_item;
        const result = QUANFANLIBAO.find((item) => item.taskid === id);
        if (typeof result !== 'undefined') {
          if (this.selectedLevel.id === result.id) {
            this.fetchTask();
          }
        }
      });
    },
    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
      this.STOP_NOTIFY_PAY_ORDER_MSG();
      this.STOP_TASK_CHANGE_MSG();
    },
    /**
     * 已购买列表或选择档次发生变化
     */
    selectedPayChange() {
      if (process.client) {
        const { id } = this.selectedLevel;
        if (this.bought.includes(id)) {
          this.cutdown = this.cutdownMap[id];
          this.$nextTick(this.fetchTask);
          this.activePanel = 'task';
        } else {
          this.activePanel = 'pay';
        }
      }
    },
    /**
     * 请求全返礼包所有数据
     */
    fetchRootStatus() {
      API_QUERY_ALL_RETURN_LB_INFO().then((response) => {
        const { result, all_return_lb_1, all_return_lb_2, all_return_lb_3 } = response;
        if (result === 0) {
          if (all_return_lb_1.remain_num > 0) {
            if (!this.bought.includes(10084)) this.bought.push(10084);
          }
          if (all_return_lb_2.remain_num > 0) {
            if (!this.bought.includes(10085)) this.bought.push(10085);
          }
          if (all_return_lb_3.remain_num > 0) {
            if (!this.bought.includes(10086)) this.bought.push(10086);
          }
          this.cutdownMap['10084'] = all_return_lb_1.remain_num;
          this.cutdownMap['10085'] = all_return_lb_2.remain_num;
          this.cutdownMap['10086'] = all_return_lb_3.remain_num;
        }
      });
    },
    /**
     * 请求任务数据
     */
    fetchTask() {
      API_QUERY_ONE_TASK_DATA(this.selectedLevel.taskid).then((response) => {
        const { task_data } = response;
        if (typeof task_data !== 'undefined') {
          const { now_total_process, award_status } = task_data;
          this.progress = _.toNumber(now_total_process);
          this.status = award_status;

          // 2-奖励已领取，请求数据刷新剩余天数
          if (award_status === 2) {
            this.fetchRootStatus();
            setTimeout(() => {
              this.cutdown = this.cutdownMap[this.selectedLevel.id];
            }, 2000);
          }
        }
      });
    },
    ruleHandler() {
      const array = [
        '购买后立得指定金币数，并激活奖金任务',
        '任务有效期内，每天完成任务可领取1次奖励，超时未完成，视为放弃',
        '不同种类的礼包可叠加购买领奖',
      ];
      RulePanel(array);
    },
  },
};
</script>
<style lang="scss" scoped src="~/pages_vendors/act_022_qflb_web/style.scss" />
