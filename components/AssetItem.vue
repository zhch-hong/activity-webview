<template>
  <div class="asset-item">
    <div class="asset">
      <div class="icon">
        <van-image fit="contain" height="95%" :src="iconSrc"></van-image>
      </div>
      <div class="count">
        <slot></slot>
      </div>
    </div>
    <div v-if="subText" class="name">
      <span>{{ subText }}</span>
    </div>
  </div>
</template>
<script>
import getAsset from '~/vendors/get-asset';

export default {
  name: 'AssetItem',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      subText: '',
      iconSrc: '',
    };
  },

  watch: {
    name: {
      immediate: true,
      handler(value) {
        const { name, icon } = getAsset(value);
        this.subText = name;
        this.iconSrc = icon;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.asset-item {
  display: inline-block;
  width: 178px;
  color: #fff;
  white-space: nowrap;

  .asset {
    .icon {
      box-sizing: border-box;
      height: 128px;
      border-top: 5px solid #fff;
      border-right: 5px solid #fff;
      border-left: 5px solid #fff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: #a2d6e9;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .count {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #65b3e1;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  .name {
    display: flex;
    justify-content: center;
    margin: 30px 0 0 0;
  }
}
.asset-item + .asset-item {
  margin-left: 60px;
}
</style>
