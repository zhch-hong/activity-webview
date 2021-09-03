<template>
  <BaseOverlay :show-close="false">
    <template #title>
      <span>提示</span>
    </template>
    <div class="main">
      <p class="message">{{ text }}</p>
      <button class="button" @click="$emit('close')"></button>
    </div>
  </BaseOverlay>
</template>
<script>
export default {
  props: ['text'],
};
</script>
<style lang="scss" scoped src="./style.scss" />
