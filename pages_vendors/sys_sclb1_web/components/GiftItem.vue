<template>
  <div class="gift-item" :style="{ 'background-image': `url('${require('../image/' + background)}')` }">
    <!-- 标题 -->
    <span class="title">{{ price }}元首充</span>
    <!-- 金币图片 -->
    <div class="award-icon">
      <img :src="require(`~/assets/image/${icon}.png`)" alt="金币" />
    </div>
    <!-- xx万金币 -->
    <span class="count">{{ tranNumber(count) }}金币</span>
    <!-- 附加奖励 -->
    <div class="attach-award">
      <div v-for="(item, index) of attach" :key="index" class="award">
        <img :src="require('~/assets/image/' + item.icon + '.png')" />
        <span>{{ item.text }}</span>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class="submit" @click="submit">
      <span>立即购买</span>
    </div>
  </div>
</template>
<script>
import tranNumber from '~/utils/transform-unit';
import PayPanel from '~/components_call/pay_panel';

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    attach: {
      type: Array,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      backMap: {
        0: 'min.png',
        1: 'mid.png',
        2: 'max.png',
      },
      background: '',
    };
  },

  watch: {
    index: {
      immediate: true,
      handler(value) {
        this.background = this.backMap[value];
      },
    },
  },

  methods: {
    tranNumber,
    submit() {
      PayPanel(this.id, this.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-item {
  position: relative;
  width: 452px;
  height: 635px;
  background-position: right top;
  background-size: cover;
  background-repeat: no-repeat;

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    font-size: 60px;
    white-space: nowrap;
    color: #fffae1;
  }

  .award-icon {
    position: absolute;
    width: 180px;
    height: 180px;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);

    img {
      position: absolute;
      max-width: 100%;
      max-height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .count {
    position: absolute;
    top: 280px;
    left: 50%;
    transform: translateX(-50%);
    color: #fffcf0;
    text-shadow: 0 1px #fec169, 1px 0 #fec169, -1px 0 #fec169, 0 -1px #fec169;
    -webkit-text-stroke: 0.3px #fec169;
    font-size: 42px;
  }

  .attach-award {
    position: absolute;
    width: 343px;
    height: 155px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 132px;
    display: flex;
    justify-content: space-between;

    .award {
      position: relative;
      width: 155px;

      img,
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      img {
        max-width: 80%;
        top: 5px;
      }

      span {
        bottom: 7px;
        white-space: nowrap;
        font-size: 22px;
        color: #fff;
      }
    }
  }

  .submit {
    cursor: pointer;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 333px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46px;
    background: url('../../../assets/image/btn_back_enable.png') center/cover no-repeat;
    color: #fffcf0;
    text-shadow: 0 1px #fec169, 1px 0 #fec169, -1px 0 #fec169, 0 -1px #fec169;
    -webkit-text-stroke: 0.3px #fec169;
  }
}
</style>
