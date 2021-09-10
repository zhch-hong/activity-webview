<template>
  <div class="not-bought">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_2.png" alt="关闭" />
    </a>

    <img class="ques" src="../image/com_btn_rule2.png" alt="问号" @click="ruleHandler" />

    <div class="submit" @click="submit"><span>99元领取</span></div>
  </div>
</template>
<script>
import RulePanel from '~/components_call/rule-panel';
import PayPanel from '~/components_call/pay_panel';
import { CHANGWANKA } from '~/vendors/shopping';

export default {
  methods: {
    ruleHandler() {
      const ruleList = [
        '购买后立得500万金币，并激活任务',
        '任务有效期内，每天登录可直接领取40万金币',
        '每天完成任务可领10万金币和400福利券，超时未完成，视为放弃',
      ];

      RulePanel(ruleList);
    },

    submit() {
      PayPanel(CHANGWANKA.id, CHANGWANKA.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.not-bought {
  position: relative;
  width: 1920px;
  height: 1080px;
  background: url('../image/back1.png') center/contain no-repeat;

  a.close {
    position: absolute;
    right: 160px;
    top: 60px;

    img {
      width: 96px;
      height: 100px;
    }
  }

  img.ques {
    position: absolute;
    width: 58px;
    height: 58px;
    bottom: 302px;
    right: 590px;
  }

  .submit {
    position: absolute;
    bottom: 58px;
    left: 800px;
    width: 316px;
    height: 122px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 60px;
    white-space: nowrap;
    background: url('../image/submit.png') center/contain no-repeat transparent;
    text-shadow: 0 1px #369731, 1px 0 #369731, -1px 0 #369731, 0 -1px #369731;
    -webkit-text-stroke: 0.3px #369731;
  }
}
</style>
