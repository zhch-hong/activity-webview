<template>
  <van-overlay :show="visible" :custom-style="customStyle" :duration="0">
    <div class="wrapper">
      <img v-if="showClose" class="close" src="~/assets/image/close_1.png" alt="关闭" @click.stop="$emit('close')" />
      <div class="header">
        <div class="title">
          <slot name="title" />
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      customStyle: {
        width: '200vw',
        left: '-50vw',
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  background-image: url('~/assets/image/bg_1.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 942px;
  height: 590px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}

.close {
  position: absolute;
  width: 104px;
  height: 104px;
  top: -10px;
  right: -10px;
}

.header {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  height: 105px;
  width: auto;
  min-width: 554px;
  background-image: url('~/assets/image/title_back.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 54px;
    letter-spacing: 6px;
    background: linear-gradient(to bottom, #f1c241, #d98c1b);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}

.content {
  background-color: #fff5cf;
  height: 424px;
  margin-top: 120px;
  margin: 120px 40px 0 40px;
  border-radius: 16px;
}
</style>
