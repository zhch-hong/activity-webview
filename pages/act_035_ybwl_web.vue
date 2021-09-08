<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_3.png" alt="关闭" />
    </a>

    <main class="main">
      <!-- 导航菜单 -->
      <nav>
        <div class="back-color"></div>
        <div ref="BetterScroll" class="scroll">
          <ul>
            <li
              v-for="item of YIBENWANLI"
              :key="item['id']"
              :class="activeID === item['id'] ? 'active' : 'inactive'"
              @click="activeID = item['id']"
            >
              <span class="name">{{ item['name'] }}</span>
              <img
                v-if="bought.includes(item['id'])"
                class="bought"
                src="../pages_vendors/act_035_ybwl_web/image/yigou_tag.png"
                alt="已购买"
              />
              <span v-if="noreceive.includes(item['taskid'])" class="red-point"></span>
            </li>
          </ul>
        </div>
      </nav>

      <!-- 礼包主体 -->
      <section>
        <div class="content">
          <!-- 时间区域 -->
          <header>
            <img class="tip" src="~/assets/image/tip.png" alt="说明" @click="ruleHandler" />
            <div
              v-if="
                bought.includes(selectedLevel['id']) && selectedLevel['id'] !== 10390 && selectedLevel['id'] !== 10391
              "
              class="time"
            >
              <span>本期剩余时间：{{ cutdown }}</span>
            </div>
          </header>
          <!-- 礼包状态 -->
          <div class="pay-row">
            <span class="text">购买礼包立送</span>
            <img class="icon" src="~/assets/image/jingbi.png" alt="金币" />
            <div class="count">
              {{ selectedLevel['handsel'] }}
            </div>
            <div :class="['button', bought.includes(selectedLevel['id']) ? 'disable' : 'enable']" @click="payHandler">
              <span>
                {{ bought.includes(selectedLevel['id']) ? '已领取' : '领取' }}
              </span>
            </div>
          </div>
          <!-- 任务区域 -->
          <TaskArea :level-options="selectedLevel" :pay="selectedIsPay" :inherit-consumed="consumed"></TaskArea>
        </div>

        <!-- 价格 -->
        <div class="price" @click="payHandler">
          <span>
            {{ bought.includes(selectedLevel['id']) ? '本期已购' : selectedLevel['price'] + '元' }}
          </span>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import _ from 'lodash';
import BScroll from '@better-scroll/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

import { YIBENWANLI } from '~/vendors/shopping';
import { API_QUERY_ONE_TASK_DATA } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG, SKT_TASK_CHANGE_MSG, SKT_NOTIFY_PAY_ORDER_MSG } from '~/vendors/api-socket';

import PayPanel from '~/components_call/pay_panel';
import RulePanel from '~/components_call/rule-panel';
import AlertPanel from '~/components_call/alert-panel';

import TaskArea from '~/pages_vendors/act_035_ybwl_web/components/TaskArea.vue';

dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * 解析字符串lua代码
 * @param {String} code - 代码字符串
 * @return 已购买的礼包id数组、有效时长
 */
function parseStringCode(code) {
  code = code
    .replace(/\t\n/g, '')
    .replace(/\t/g, '')
    .replace(/\n/g, '')
    .replace(/=/g, ':')
    .replace(/]/g, '')
    .replace(/\[/g, '')
    .slice(1)
    .slice(0, -1)
    .replace(/valid_time/, '&valid_time')
    .replace(/bought_gift_bag_ids/, '&bought_gift_bag_ids')
    .replace(/gift_bag_sp_ids/, '&gift_bag_sp_ids')
    .replace(/children_task_ids/, '&children_task_ids')
    .slice(1);

  const codeArray = code.split('&');
  const timeStr = codeArray.find((s) => s.startsWith('valid_time'));
  const taskStr = codeArray.find((s) => s.startsWith('children_task_ids'));

  /**
   * @type {Number[]}
   */
  let boughtList = [];
  let validTime = '';

  if (timeStr) {
    const t = timeStr.split(':')[1];
    if (t.endsWith(',')) validTime = t.slice(0, t.length - 1);
    else validTime = t;
  }
  if (taskStr) {
    boughtList = YIBENWANLI.filter((item) => taskStr.includes(item.taskid.toString())).map((item) => item.id);
  }

  return {
    boughtList,
    validTime,
  };
}

export default {
  components: {
    TaskArea,
  },

  data() {
    return {
      YIBENWANLI, // 菜单栏
      activeID: YIBENWANLI[0].id, // 选中档次ID
      selectedLevel: null, // 选中档次配置数据
      consumed: 0, // 选中档次已消耗多少金币
      noreceive: [], // 没有领取奖励的档次，显示左上角小红点
      bought: [], // 已购买的档次，数组元素为礼包id
      timer: null, // 礼包剩余有效时间定时器
      cutdown: '', // 礼包剩余有效时间倒计时显示
    };
  },

  computed: {
    selectedIsPay() {
      return this.bought.includes(this.activeID);
    },
  },

  watch: {
    activeID: {
      immediate: true,
      handler(value) {
        this.selectedLevel = YIBENWANLI.find((item) => item.id === value);
      },
    },
  },

  mounted() {
    this.installSocket();
    this.initBScroll();
    this.fetchRootStatus();
    this.fetchFullStatus();
  },

  beforeDestroy() {
    this.uninstallSocket();
    this.clearInterval();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();

      this.STOP_TASK_CHANGE_MSG = SKT_TASK_CHANGE_MSG(({ task_item }) => {
        const { id, award_status, now_total_process } = task_item;

        if (YIBENWANLI.findIndex((item) => item.taskid === id) !== -1) {
          // 1 领取
          if (award_status === 1) {
            const index = this.noreceive.findIndex((s) => s === id);
            if (index === -1) this.noreceive.push(id);
          }
          // 0 未完成 2 已领取
          if (award_status === 0 || award_status === 2) {
            const index = this.noreceive.findIndex((i) => i === id);
            if (index !== -1) this.noreceive.splice(index, 1);
          }

          if (id === this.selectedLevel.taskid) {
            this.consumed = _.toNumber(now_total_process);
          }
        }
      });

      this.STOP_NOTIFY_PAY_ORDER_MSG = SKT_NOTIFY_PAY_ORDER_MSG(({ goods_id }) => {
        if (YIBENWANLI.findIndex((item) => item.id === goods_id) !== -1) {
          _.delay(this.fetchRootStatus, 500);
        }
      });
    },

    initBScroll() {
      setTimeout(() => {
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.BetterScroll, { click: true });
      }, 300);
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
      this.STOP_TASK_CHANGE_MSG();
      this.STOP_NOTIFY_PAY_ORDER_MSG();
    },

    fetchRootStatus() {
      API_QUERY_ONE_TASK_DATA(1000099).then(({ task_data }) => {
        if (typeof task_data !== 'undefined') {
          const { boughtList, validTime } = parseStringCode(task_data.other_data_str || '');

          this.bought = boughtList;

          if (!_.isEmpty(validTime)) {
            this.timer = this.interval(_.toNumber(validTime));
          }
        }
      });
    },

    interval(timeStamp) {
      const tim = dayjs.unix(timeStamp);
      return setInterval(() => {
        const diff = tim.diff(dayjs());

        if (diff <= 0) {
          // 到期时清除定时器，重新请求状态数据

          if (this.timer) {
            clearInterval(this.timer);
          }

          _.delay(() => {
            this.fetchRootStatus();
            this.fetchFullStatus();
          }, 2000);
        } else if (diff < 24 * 60 * 60 * 1000) {
          this.cutdown = dayjs.duration(diff, 'ms').format('H:mm:ss');
        } else {
          this.cutdown = dayjs.duration(diff, 'ms').format('D天H:mm:ss');
        }
      }, 1000);
    },

    clearInterval() {
      clearInterval(this.timer);
    },

    /**
     * 请求没有领取奖励的档次，显示小红点
     */
    fetchFullStatus() {
      const list = [];
      YIBENWANLI.forEach((item) => list.push(API_QUERY_ONE_TASK_DATA(item.taskid)));
      Promise.all(list).then((resolve) => {
        resolve.forEach(({ task_data }) => {
          if (task_data) {
            const { award_status, id } = task_data;
            if (award_status === 1 && !this.noreceive.includes(id)) {
              this.noreceive.push(id);
            }
          }
        });
      });
    },

    ruleHandler() {
      const list = [
        '购买一本万利后，即激活礼包任务',
        '每期共有8个礼包可购买，其中王者与荣耀礼包可多次购买，其余礼包每个周期（十天）限购一次',
        '可同时购买激活所有礼包，获得最大收益',
        '每个礼包在购买激活后才会累计任务进度',
        '苹果大战不计入数据统计',
      ];
      RulePanel(list);
    },

    payHandler() {
      if (this.selectedIsPay) {
        AlertPanel('本期该礼包您已购买');
      } else {
        PayPanel(this.selectedLevel.id, this.selectedLevel.price);
      }
    },
  },
};
</script>
<style lang="scss" scoped src="~/pages_vendors/act_035_ybwl_web/style.scss" />
