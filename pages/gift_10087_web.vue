<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_2.png" alt="关闭" />
    </a>

    <p class="tip">每日特惠礼包每天只能购买一次</p>

    <div class="pay-list">
      <PayItem
        v-for="(item, i) of list"
        :ref="'PayItem_' + i"
        :key="item.id"
        :index="i"
        :gift="item"
        :update-status="updateStatus"
        @update-status="updateStatus = false"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { MEIRITEHUI } from '~/vendors/shopping';
import { API_CHECK_PERMISS } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

import PayItem from '~/pages_vendors/gift_10087_web/components/PayItem.vue';

export default {
  name: 'gift_10087_web', // 每日特惠

  components: {
    PayItem,
  },

  data() {
    return {
      list: [],
      updateStatus: true,
    };
  },

  beforeMount() {
    this.getLevelList();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG(() => {
        this.updateStatus = true;
      });
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },

    getLevelList() {
      const clone = _.cloneDeep(MEIRITEHUI);
      const promiseList = [];

      MEIRITEHUI.forEach((item) => promiseList.push(API_CHECK_PERMISS(`actp_buy_gift_bag_${item[0].id}`)));
      Promise.all(promiseList).then((value) => {
        const index = value.reverse().findIndex((item) => item.result);
        if (index !== -1) {
          const element = clone.reverse()[index];
          this.list = element;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped src="~/pages_vendors/gift_10087_web/style.scss" />
