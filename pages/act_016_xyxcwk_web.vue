<template>
  <div>
    <TaskPanel v-if="boughtStatus === true" @time-over="fetchBoughtStatus" />
    <NotBought v-if="boughtStatus === false" />
  </div>
</template>
<script>
import { CHANGWANKA } from '~/vendors/shopping';
import { API_QUERY_GIFT_BAG_STATUS } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG, SKT_NOTIFY_PAY_ORDER_MSG } from '~/vendors/api-socket';
import NotBought from '~/pages_vendors/act_016_xyxcwk_web/components/NotBought.vue';
import TaskPanel from '~/pages_vendors/act_016_xyxcwk_web/components/TaskPanel.vue';
export default {
  name: 'act_016_xyxcwk_web',

  components: {
    NotBought,
    TaskPanel,
  },

  data() {
    return {
      boughtStatus: '',
    };
  },

  beforeMount() {
    this.fetchBoughtStatus();
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
        if (goods_id === CHANGWANKA.id) {
          this.fetchBoughtStatus();
        }
      });
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
      this.STOP_NOTIFY_PAY_ORDER_MSG();
    },

    fetchBoughtStatus() {
      API_QUERY_GIFT_BAG_STATUS(CHANGWANKA.id).then(({ status }) => {
        this.boughtStatus = status === 0;
      });
    },
  },
};
</script>
