<template>
  <div class="three-left">
    <div class="icon-box">
      <img :src="require('../image/' + icon + '.png')" alt="" />
    </div>
    <div class="text-box">
      <span>{{ text }}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.three-left {
  display: inline-block;
  width: 208px;
  height: 194px;
  box-sizing: border-box;
  padding-top: 16px;
  background: url('../image/qflb_tbdk_lan.png') center/contain no-repeat;

  .icon-box {
    height: 123px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 70%;
      max-height: 70%;
    }
  }

  .text-box {
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: #fff;
    font-size: 26px;
  }
}
</style>
