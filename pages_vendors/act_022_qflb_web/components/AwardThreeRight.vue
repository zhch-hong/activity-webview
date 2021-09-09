<template>
  <div class="three-right">
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
}
</script>

<style lang="scss" scoped>
.three-right {
  width: 246px;
  height: 230px;
  box-sizing: border-box;
  padding-top: 20px;
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
    height: 62px;
    line-height: 62px;
    text-align: center;
    color: #fff;
  }
}
</style>
