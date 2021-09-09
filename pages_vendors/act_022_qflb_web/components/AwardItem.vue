<template>
  <div class="award-item">
    <div class="icon-box">
      <img class="icon" :src="require('../image/' + icon + '.png')" :alt="text" />
    </div>
    <div class="text-box">
      <span class="text">{{ text }}</span>
    </div>
    <img class="tag" src="../image/qflb_imgf_jlsm.png" alt="奖励" />
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.award-item {
  position: relative;
  box-sizing: border-box;
  padding-top: 18px;
  width: 245px;
  height: 229px;
  display: inline-block;
  background: url('../image/qflb_tbdk_lan.png') center/contain no-repeat;

  .icon-box {
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 70%;
      max-height: 70%;
    }
  }

  .text-box {
    height: 66px;
    line-height: 66px;
    text-align: center;
    color: #fff;
    font-size: 28px;
  }

  .tag {
    position: absolute;
    width: 110px;
    height: 66px;
    top: -30px;
    left: -40px;
  }
}
</style>
