<template>
  <div class="container">
    <!-- 感叹号 -->
    <img class="img-1" src="~/assets/image/czzk_icon_ts.png" alt="显示说明" @click="handleTip" />

    <!-- 说明文本 -->
    <img v-if="visibleTip" class="img-2" src="./image/czzk_bg_2.png" alt="说明" />

    <!-- 已领取 -->
    <img v-if="isBuyed" class="img-3" src="./image/yk_icon_ylq.png" alt="已领取" />

    <img v-if="!isBuyed" class="img-4" src="./image/czzk_btn_ljlq.png" alt="立即购买" @click="handlePay" />

    <img v-if="isBuyed" class="img-5" src="~/assets/image/czzk_btn_ygm.png" alt="已购买" />
  </div>
</template>
<script>
import PayPanel from '~/components_call/pay_panel';
import { ZHOUKA } from '~/vendors/shopping';
import { API_QUERY_GIFT_BAG_STATUS } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '@/vendors/api-socket';

export default {
  data() {
    return {
      isBuyed: false,
      visibleTip: false,
    };
  },

  beforeMount() {
    this.fetchStatus();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },

    fetchStatus() {
      API_QUERY_GIFT_BAG_STATUS(ZHOUKA.id).then(({ result }) => {
        this.isBuyed = result === 0;
      });
    },

    handlePay() {
      PayPanel(ZHOUKA.id, ZHOUKA.price);
    },

    handleTip() {
      this.visibleTip = true;

      setTimeout(() => {
        document.addEventListener(
          'click',
          () => {
            this.visibleTip = false;
          },
          { once: true }
        );
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  position: relative;
  background: url('./image/czzk_bg_1.png') center/cover no-repeat;
}

.img-1,
.img-2,
.img-3,
.img-4,
.img-5 {
  position: absolute;
}

.img-4,
.img-5 {
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.img-1 {
  width: 66px;
  height: 62px;
  right: 116px;
  top: 222px;
}

.img-2 {
  width: 379px;
  height: 136px;
  right: 120px;
  top: 70px;
}

.img-3 {
  width: 146px;
  height: 146px;
  left: 250px;
  top: 290px;
}

.img-4,
.img-5 {
  width: 290px;
  height: 112px;
}
</style>
