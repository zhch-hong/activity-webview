<template>
  <div class="pay-panel">
    <main class="main">
      <div class="immediately">
        <div class="title" :style="{ 'margin-bottom': levelOptions.id === weeksID ? '2.6vw' : '2.6vw' }">购买立得</div>
        <!-- 10084，周返 -->
        <AwardTwoLeft
          v-if="levelOptions.id === weeksID"
          :icon="levelOptions.immediately.icon"
          :text="levelOptions.immediately.text"
        />
        <AwardThreeLeft v-else :icon="levelOptions.immediately.icon" :text="levelOptions.immediately.text" />
      </div>
      <img class="divider" src="../image/qflb_fgdk_fgx.png" alt="分割线" />
      <div class="award">
        <div class="title">连续{{ dayCount }}天每日领：</div>
        <div class="task-award">
          <TwoAward v-if="levelOptions.id === weeksID" :awards="levelOptions.taskAwards" />
          <ThreeAward v-else :awards="levelOptions.taskAwards" />
        </div>
      </div>
    </main>
    <footer class="footer">
      <button class="pay-btn" @click="submit">
        <img class="tag" src="../image/tag.png" alt="超值" />
        <span class="price">{{ price }}元购买</span>
      </button>
      <!-- 10084，周返 -->
      <p v-if="levelOptions.id === weeksID" class="text1">限购一次</p>
      <p class="text2">温馨提示：本礼包不参与渠道活动</p>
    </footer>
  </div>
</template>
<script>
import ThreeAward from './ThreeAward.vue';
import TwoAward from './TwoAward.vue';
import AwardTwoLeft from './AwardTwoLeft.vue';
import AwardThreeLeft from './AwardThreeLeft.vue';

import PayPanel from '~/components_call/pay_panel';

export default {
  components: {
    ThreeAward,
    TwoAward,
    AwardTwoLeft,
    AwardThreeLeft,
  },

  props: {
    levelOptions: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      weeksID: 10084,
      dayCount: 0,
      price: 0,
    };
  },

  watch: {
    levelOptions: {
      immediate: true,
      handler(object) {
        const { id, price } = object;
        if (id === 10084) this.dayCount = 7;
        if (id === 10085) this.dayCount = 30;
        if (id === 10086) this.dayCount = 90;
        this.price = price;
      },
    },
  },

  methods: {
    submit() {
      PayPanel(this.levelOptions.id, this.price);
    },
  },
};
</script>
<style lang="scss" scoped>
.pay-panel {
  position: absolute;
  top: 350px;
  left: 400px;
  width: 1100px;
  height: 640px;

  .main {
    height: 370px;
    display: flex;

    .immediately {
      text-align: center;

      .title {
        display: inline-block;
        width: 240px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        background: linear-gradient(to right, rgba(59, 241, 239, 0), #3bf1ef, rgba(59, 241, 239, 0));
        color: #fff;
        text-shadow: 0 1px #1d71cf, 1px 0 #1d71cf, -1px 0 #1d71cf, 0 -1px #1d71cf;
        -webkit-text-stroke: 0.3px #1d71cf;
      }
    }

    .divider {
      margin: 0 20px;
      width: 4px;
      height: 128px;
      transform: scaleY(2);
      transform-origin: bottom center;
      align-self: flex-end;
    }

    .award {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      text-align: center;

      .title {
        align-self: center;
        display: inline-block;
        width: 450px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        margin-bottom: 20px;
        background: linear-gradient(to right, rgba(59, 241, 239, 0), #3bf1ef, rgba(59, 241, 239, 0));
        color: #fff;
        text-shadow: 0 1px #1d71cf, 1px 0 #1d71cf, -1px 0 #1d71cf, 0 -1px #1d71cf;
        -webkit-text-stroke: 0.3px #1d71cf;
      }

      .task-award {
        flex-grow: 1;
      }
    }
  }

  .footer {
    margin-top: 20px;
    text-align: center;

    .pay-btn {
      position: relative;
      border: none;
      width: 342px;
      height: 132px;
      font-size: 56px;
      color: #fff;
      background: url('../image/ty_btn_huang1.png') center/contain no-repeat;

      .tag {
        position: absolute;
        width: 144px;
        height: 114px;
        top: -12px;
        left: -10px;
      }

      .price {
        white-space: nowrap;
      }
    }

    .text1,
    .text2 {
      margin: 6px 0;
      color: #fff;
    }
  }
}
</style>
