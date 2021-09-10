<template>
  <div class="czyk">
    <div class="item">
      <HaohuaYueka :base-data="baseData" />
    </div>
    <div class="item">
      <ZhizunJika v-if="showJika" :base-data="baseData" />
      <ZunxiangYueka v-else :base-data="baseData" />
    </div>
  </div>
</template>
<script>
import HaohuaYueka from './components/haohuayueka/index.vue';
import ZunxiangYueka from './components/zunxiangyueka/index.vue';
import ZhizunJika from './components/zhizunjika/index.vue';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';
import { API_QUERY_NEW_YUEKA_BASE_INFO, API_QUERY_JIKA_BASE_INFO } from '~/vendors/api';

export default {
  components: {
    HaohuaYueka,
    ZunxiangYueka,
    ZhizunJika,
  },

  data() {
    return {
      showJika: false,
      baseData: {},
    };
  },

  beforeMount() {
    this.fetchInfo();
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG(this.fetchInfo);
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },

    fetchInfo() {
      Promise.all([API_QUERY_NEW_YUEKA_BASE_INFO(), API_QUERY_JIKA_BASE_INFO()]).then(([YK, JK]) => {
        this.baseData = YK;

        if (YK.total_remain_num_2 > 0 && JK.total_remain_num === 0) this.showJika = true;
        else this.showJika = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
