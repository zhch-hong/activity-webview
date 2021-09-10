<template>
  <div class="sclb">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_3.png" alt="关闭" />
    </a>

    <img class="tip" src="../pages_vendors/sys_sclb1_web/image/tip.png" alt="最高100%返利，购买直升VIP1" />

    <div class="content">
      <GiftItem v-for="(p, i) of payList" :key="p.id" :index="i" v-bind="p" />
    </div>
  </div>
</template>
<script>
import { API_CHECK_PERMISS } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';
import { isWebview } from '~/vendors/runtime-env';
import { SHOUCHONGLIBAO } from '~/vendors/shopping';

import GiftItem from '~/pages_vendors/sys_sclb1_web/components/GiftItem.vue';

export default {
  name: 'sys_sclb1_web',

  components: { GiftItem },

  data() {
    return {
      payList: [],
    };
  },

  beforeMount() {
    this.fetchPermissions();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    fetchPermissions() {
      API_CHECK_PERMISS('actp_buy_gift_bag_class_first_deposit_gift').then(({ result }) => {
        const key = result.toString();
        const data = SHOUCHONGLIBAO[key];

        this.payList = data;
      });
    },

    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG(() => {
        if (isWebview) {
          location.href = 'uniwebviewfun://Hide';
        }
      });
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },
  },
};
</script>
<style lang="scss" scoped>
.sclb {
  position: relative;
  width: 1920px;
  height: 1080px;
  background: url('~/pages_vendors/sys_sclb1_web/image/back.png') center/cover no-repeat;
}

.close {
  position: absolute;
  right: 180px;
  top: 40px;

  img {
    width: 63px;
    height: 68px;
  }
}

.tip {
  position: absolute;
  width: 541px;
  height: 77px;
  top: 250px;
  left: 50%;
  z-index: 1;
}

.content {
  position: absolute;
  display: flex;
  top: 300px;
  left: 280px;
}
</style>
