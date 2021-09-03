<template>
  <van-overlay :show="show" :duration="0" @click="$emit('close')">
    <div class="alert-panel">{{ text }}</div>
  </van-overlay>
</template>
<script>
export default {
  props: ['text', 'show'],
};
</script>
<style lang="scss" scoped src="./style.scss" />
