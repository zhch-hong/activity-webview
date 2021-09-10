<template>
  <div>
    <img class="lbdy" src="./image/lbdh.png" alt="礼包兑换" @click="duihuan" />
    <OverlayDialog :visible="visible" @close="visible = false">
      <template #title>
        <span>礼包兑换</span>
      </template>
      <div class="main">
        <input
          ref="CodeInput"
          v-model.trim="giftCode"
          :disabled="disable"
          class="input"
          maxlength="10"
          type="text"
          placeholder="请输入礼包兑换码"
        />

        <span v-if="invalid" class="invalid">兑换码格式错误</span>
        <span v-if="disable" class="disable">
          连续输入错误次数已达上限，请稍后
          <b>({{ timedown }})</b>
        </span>

        <button class="button" @click="submit">兑&nbsp;&nbsp;换</button>
      </div>
    </OverlayDialog>
  </div>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';
import parseTimestamp from '~/utils/stamp2hms';
import { API_USE_REDEEM_CODE } from '~/vendors/api';
import { SKT_NOTIFY_ASSET_CHANGE_MSG } from '~/vendors/api-socket';

import OverlayDialog from '~/components/BaseOverlay.vue';

export default {
  components: {
    OverlayDialog,
  },

  data() {
    return {
      visible: false,
      timedown: '',
      timer: null,
      timestamp: 0,
      giftCode: '',
      invalid: false,
      disable: false,
    };
  },

  computed: {
    time() {
      return parseTimestamp(this.timestamp);
    },
  },

  watch: {
    time(value) {
      this.timedown = value;
      if (value === '') {
        this.disable = false;
      }
    },
  },

  mounted() {
    this.installSocket();
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.uninstallSocket();
  },

  methods: {
    installSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG = SKT_NOTIFY_ASSET_CHANGE_MSG();
    },

    uninstallSocket() {
      this.STOP_NOTIFY_ASSET_CHANGE_MSG();
    },

    duihuan() {
      this.visible = true;
    },

    validate() {
      if (this.giftCode.length < 6) return false;

      if (/\W|_/.test(this.giftCode)) return false;

      return true;
    },

    async submit() {
      if (this.validate()) {
        const { result, time } = await API_USE_REDEEM_CODE(this.giftCode);
        if (result === 0) {
          this.visible = false;
          this.giftCode = '';
        } else if (time !== 0) {
          AlertPanel('你操作错误过多，稍后再试');
          this.disable = true;

          clearInterval(this.timer);

          this.timestamp = time;
          this.timer = setInterval(() => {
            this.timestamp--;
          }, 1000);
        } else {
          AlertPanel('兑换码无效');
        }
      } else {
        this.invalid = true;

        this.$refs.CodeInput.addEventListener(
          'focus',
          () => {
            this.invalid = false;
          },
          { once: true }
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss" />
