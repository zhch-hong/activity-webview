<template>
  <div style="height: 100%">
    <div v-if="isBuyed" class="redirect">
      <div class="button" @click="$emit('select-menu', 7)"></div>
    </div>
    <div v-else class="container" @click="submit"></div>
  </div>
</template>
<script>
import PayPanel from '~/components_call/pay_panel';

import { SANYUANLIBAO } from '~/vendors/shopping';
import { API_QUERY_GIFT_BAG_STATUS } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

export default {
  data() {
    return {
      isBuyed: false,
    };
  },

  beforeMount() {
    this.fetchStatus();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    fetchStatus() {
      API_QUERY_GIFT_BAG_STATUS(SANYUANLIBAO.id).then(({ status }) => {
        this.isBuyed = status === 0;
      });
    },

    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },
    submit() {
      PayPanel(SANYUANLIBAO.id, SANYUANLIBAO.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: url('./image/back.png') center/cover no-repeat;
}

.redirect {
  height: 100%;
  background: url('./image/3yfllb_bg_1.png') center/cover no-repeat;

  div.button {
    position: absolute;
    width: 266px;
    height: 100px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: url('~/assets/image/jk_btn_ljlq3.png') center/cover no-repeat;
  }
}
</style>
