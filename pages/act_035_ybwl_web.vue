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
              v-if="bought.includes(activeConfig['id']) && activeConfig['id'] !== 10390 && activeConfig['id'] !== 10391"
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
              {{ activeConfig['handsel'] }}
            </div>
            <div :class="['button', bought.includes(activeConfig['id']) ? 'disable' : 'enable']" @click="payHandler">
              <span>
                {{ bought.includes(activeConfig['id']) ? '已领取' : '领取' }}
              </span>
            </div>
          </div>
          <!-- 任务区域 -->
          <div ref="TaskScroll" class="task-scroll">
            <div>
              <TaskItem
                v-for="(item, index) of activeConfig.neednum"
                :key="index"
                :award="activeConfig.awards[index]"
                :total="activeConfig.neednum[index]"
                :get-award="activeAwards[index]"
                :consumed="consumed"
                :current-is-pay="currentIsPay"
                @fetch-award="fetchAward(++index)"
                @go-task="goTask"
              />
            </div>
          </div>
        </div>

        <!-- 价格 -->
        <div class="price" @click="payHandler">
          <span>
            {{ bought.includes(activeConfig['id']) ? '本期已购' : activeConfig['price'] + '元' }}
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
import { SKT_NOTIFY_ASSET_CHANGE_MSG, SKT_TASK_CHANGE_MSG, SKT_NOTIFY_PAY_ORDER_MSG } from '~/vendors/api-socket';
import { API_TASK_AWARD_STATUS, API_QUERY_ONE_TASK_DATA } from '~/vendors/api';
import AlertPanel from '~/components_call/alert-panel';
import PayPanel from '~/components_call/pay_panel';
import TaskItem from '~/pages_vendors/act_035_ybwl_web/components/TaskItem.vue';

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
  let validTime;

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
    TaskItem,
  },

  data() {
    return {
      YIBENWANLI, // 菜单栏
      activeID: YIBENWANLI[0].id, // 选中档次ID
      activeConfig: YIBENWANLI[0], // 选中档次配置数据
      activeStatus: null, // 选中档次状态数据
      consumed: null, // 选中档次已消耗多少金币
      noreceive: [], // 没有领取奖励的档次，显示左上角小红点
      bought: [], // 已购买的档次
      activeAwards: [], // 选中档次各个阶段的奖励领取状态
      timer: null, // 剩余时长，定时器
      cutdown: null, // 倒计时显示
    };
  },

  computed: {
    currentIsPay() {
      return this.bought.includes(this.activeID);
    },
  },

  watch: {
    activeID: {
      immediate: true,
      async handler(value) {
        if (process.server) return;

        const res = YIBENWANLI.find((row) => row.id === value);
        this.activeConfig = res;
        // 请求任务数据
        const { task_data } = await API_QUERY_ONE_TASK_DATA(res.taskid);
        this.fetchActiveAwards(res.taskid);
        this.activeStatus = task_data;
      },
    },
    activeStatus: {
      deep: true,
      immediate: true,
      handler(value) {
        if (process.server) return;

        this.consumed = _.isEmpty(value) ? 0 : value.now_total_process;
      },
    },
  },

  mounted() {
    this.installSocket();
    this.initBScroll();
    this.getFullStatus();
    this.getNoreceive();
  },

  beforeDestroy() {
    this.uninstallSocket();
    this.clearInterval();
  },

  methods: {
    initBScroll() {
      setTimeout(() => {
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.BetterScroll, { click: true });
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.TaskScroll, { click: true });
      }, 300);
    },

    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();

      this.STOP_TASK_CHANGE_MSG = SKT_TASK_CHANGE_MSG(({ task_item }) => {
        const { id, award_status } = task_item;
        if (YIBENWANLI.findIndex((item) => item.taskid === id) !== -1) {
          if (award_status === 1) {
            const index = this.noreceive.findIndex((s) => s === id);
            if (index === -1) this.noreceive.push(id);
          } else if (award_status === 0 || award_status === 2) {
            const index = this.noreceive.findIndex((s) => s === id);
            if (index !== -1) this.noreceive.splice(index, 1);
          }

          // 如果状态改变的任务和当前显示的任务为同一个，则请求该任务下各个阶段的奖励领取状态
          if (this.activeConfig.taskid === id) {
            this.fetchActiveAwards(id);
            this.consumed = task_item.now_total_process;
          }

          // 如果当前显示的礼包没有购买，则将进度置为0
          if (!this.bought.includes(this.activeID)) {
            this.activeAwards = [];
            this.consumed = 0;
          }
        }
      });

      this.STOP_NOTIFY_PAY_ORDER_MSG = SKT_NOTIFY_PAY_ORDER_MSG(({ goods_id }) => {
        if (YIBENWANLI.findIndex((item) => item.id === goods_id) !== -1) {
          _.delay(() => {
            this.getFullStatus();
            this.fetchActiveAwards(this.activeConfig.taskid);
          }, 500);
        }
      });
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
      this.STOP_TASK_CHANGE_MSG();
      this.STOP_NOTIFY_PAY_ORDER_MSG();
    },

    fetchActiveAwards(taskid) {
      const res = YIBENWANLI.find((row) => row.taskid === taskid);
      const promise = API_TASK_AWARD_STATUS(taskid, res.awards.length);
      if (_.isEmpty(promise)) {
        this.activeAwards = [];
      } else {
        promise.then(({ result }) => {
          this.activeAwards = result || [];
        });
      }
    },

    getFullStatus() {
      if (process.server) return;

      API_QUERY_ONE_TASK_DATA(1000099).then(({ task_data }) => {
        if (task_data) {
          const { boughtList, validTime } = parseStringCode(task_data.other_data_str || '');

          this.bought = boughtList;

          if (validTime) {
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
            this.getFullStatus();
            this.getNoreceive();
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

    getNoreceive() {
      if (process.server) return;

      const list = [];

      YIBENWANLI.forEach((object) => list.push(API_QUERY_ONE_TASK_DATA(object.taskid)));

      Promise.all(list).then((resolve) => {
        resolve.forEach(({ task_data }) => {
          if (task_data) {
            const { award_status, id } = task_data;
            if (award_status === 1) {
              this.noreceive.push(id);
            }
          }
        });
      });
    },

    goTask() {
      if (this.bought.includes(this.activeID)) {
        AlertPanel('请前往捕鱼场完成任务');
      } else {
        AlertPanel('购买礼包后任务解锁');
      }
    },

    ruleHandler() {
      // eslint-disable-next-line no-unused-vars
      const list = [
        '购买一本万利后，即激活礼包任务',
        '每期共有8个礼包可购买，其中王者与荣耀礼包可多次购买，其余礼包每个周期（十天）限购一次',
        '可同时购买激活所有礼包，获得最大收益',
        '每个礼包在购买激活后才会累计任务进度',
        '苹果大战不计入数据统计',
      ];
      // rulePanel(list);
    },

    payHandler() {
      if (this.bought.includes(this.activeConfig.id)) {
        AlertPanel('本期该礼包您已购买');
      } else {
        PayPanel(this.activeConfig.id, this.activeConfig.price);
      }
    },
  },
};
</script>
<style lang="scss" scoped src="~/pages_vendors/act_035_ybwl_web/style.scss" />
