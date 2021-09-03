<template>
  <van-overlay :show="true" :duration="0" :custom-style="{ width: '200vw', left: '-50vw' }">
    <!-- 太阳光旋转动画背景 -->
    <div class="animate"></div>
    <!-- 主体内容 -->
    <div class="main">
      <!-- 恭喜获得 -->
      <div class="title"></div>
      <!-- 资产 -->
      <div class="asset">
        <AssetItem v-for="(notify, index) of notifyList" :key="index" :name="notify.name">
          <span>{{ tranNumber(notify.count) }}</span>
        </AssetItem>
      </div>
      <!-- 确定 -->
      <div class="confirm" @click="$emit('confirm')"></div>
    </div>
  </van-overlay>
</template>
<script>
import tranNumber from '~/utils/transform-unit';

export default {
  props: ['notifyList'],

  methods: {
    tranNumber,
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
