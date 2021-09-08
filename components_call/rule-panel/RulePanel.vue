<template>
  <BaseOverlay @close="$emit('close')">
    <template #title>
      <span>规则</span>
    </template>
    <ul class="rule-panel">
      <li v-for="(text, index) of list" :key="index">{{ ++index }}.{{ text }}</li>
    </ul>
  </BaseOverlay>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
