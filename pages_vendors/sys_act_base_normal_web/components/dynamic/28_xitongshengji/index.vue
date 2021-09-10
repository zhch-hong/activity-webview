<template>
  <div class="xtsj" @click="submit"></div>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import { SYSTEM_UPGRADE } from '~/vendors/shopping';
import { API_GET_TASK_AWARD } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

export default {
  setup() {
    SKT_NOTIFY_ASSET_CHANGE_MSG();
  },

  methods: {
    submit() {
      API_GET_TASK_AWARD(SYSTEM_UPGRADE).then(({ result }) => {
        if (result !== 0) {
          AlertPanel(`[${result}]领取失败`);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.xtsj {
  height: 100%;
  background: url('./image/system_upgrade.png') center/cover no-repeat;
}
</style>
