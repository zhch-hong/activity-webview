<template>
  <div class="pay-item" :style="{ 'background-image': backImage }">
    <!-- 0元礼包 -->
    <span class="title">{{ gift.price }}元礼包</span>

    <div class="top">
      <img :src="require('~/assets/image/' + gift.desc[0]['icon'] + '.png')" :alt="gift.desc[0]['text']" />
      <span class="text">{{ gift.desc[0]['text'] }}</span>
    </div>
    <div class="left">
      <img :src="require('~/assets/image/' + gift.desc[1]['icon'] + '.png')" :alt="gift.desc[1]['text']" />
      <span class="text">{{ gift.desc[1]['text'] }}</span>
    </div>
    <div class="right">
      <img :src="require('~/assets/image/' + gift.desc[2]['icon'] + '.png')" :alt="gift.desc[2]['text']" />
      <span class="text">{{ gift.desc[2]['text'] }}</span>
    </div>

    <!-- 购买按钮 -->
    <div class="pay-button" :style="{ 'background-image': buttonBack }" @click="submit">
      <span>{{ gift.price }}元领取</span>
    </div>
  </div>
</template>
<script>
import ItemLeft from '../image/item_1.png';
import ItemCenter from '../image/item_2.png';
import ItemRight from '../image/item_3.png';

import { API_QUERY_GIFT_BAG_STATUS } from '~/vendors/api';

import PayPanel from '~/components_call/pay_panel';

import disable from '~/assets/image/btn_back_disable.png';
import enable from '~/assets/image/btn_back_enable.png';

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },

    updateStatus: {
      type: Boolean,
      required: true,
    },

    gift: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      backImage: '',
      buttonBack: '',
      giftStatus: false,
    };
  },

  watch: {
    index: {
      immediate: true,
      handler(value) {
        this.getBackImage(value);
      },
    },
    updateStatus: {
      immediate: true,
      handler(value) {
        if (value && process.client) this.fetchStatus();
      },
    },
  },

  methods: {
    /**
     * 背景图
     * @param {Number} index
     * @returns {String}
     */
    getBackImage(index) {
      if (index === 0) this.backImage = `url(${ItemLeft})`;
      if (index === 1) this.backImage = `url(${ItemCenter})`;
      if (index === 2) this.backImage = `url(${ItemRight})`;
    },

    fetchStatus() {
      API_QUERY_GIFT_BAG_STATUS(this.gift.id).then(({ status }) => {
        this.buttonBack = status === 1 ? `url(${enable})` : `url(${disable})`;
        this.giftStatus = status === 1;

        // 状态更新完成后通知父级
        this.$emit('update-status');
      });
    },

    submit() {
      if (!this.giftStatus) return;

      PayPanel(this.gift.id, this.gift.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.pay-item {
  position: relative;
  width: 414px;
  height: 530px;
  margin: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

span.title {
  position: absolute;
  left: 50%;
  transform: translateX(-80px);
  color: #fff;
  font-size: 50px;
  top: 16px;
  white-space: nowrap;
  text-shadow: 0 1px #c44c4b, 1px 0 #c44c4b, -1px 0 #c44c4b, 0 -1px #c44c4b;
  -webkit-text-stroke: 0.3px #c44c4b;
}

div.pay-button {
  position: absolute;
  bottom: -100px;
  width: 333px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 40px;
  color: white;
  cursor: pointer;
}

div.top,
div.left,
div.right {
  position: absolute;
}
div.left,
div.right {
  width: 146px;
  height: 146px;
  bottom: 41px;
  text-align: center;
  img {
    max-width: 80%;
    max-height: 90px;
    margin-top: 8px;
  }
  span.text {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #f5dccc;
  }
}
div.left {
  left: 38px;
}
div.right {
  right: 38px;
}
div.top {
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  width: 215px;
  height: 215px;
  text-align: center;
  img {
    max-height: 100%;
    max-width: 100%;
  }
  span {
    position: relative;
    bottom: 50px;
    color: #cb5e12;
    font-size: 50px;
    font-weight: bold;
    text-shadow: 0 1px #fff, 1px 0 #fff, -1px 0 #fff, 0 -1px #fff;
    -webkit-text-stroke: 0.3px #fff;
  }
}
</style>
