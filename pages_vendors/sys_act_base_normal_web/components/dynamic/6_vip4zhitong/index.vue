<template>
  <div class="vip">
    <img class="pay" src="./image/buy.png" alt="10元领取" @click="submit" />
  </div>
</template>
<script>
import PayPanel from '~/components_call/pay_panel';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

export default {
  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG((params) => {
        const type = params.type;
        if (type.startsWith('buy_gift_bag')) {
          this.$emit('pay-fulfilled');
        }
      });
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },

    submit() {
      PayPanel(10256, 780);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
