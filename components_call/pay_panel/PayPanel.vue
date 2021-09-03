<template>
  <van-overlay :show="show" :duration="0" @click="$emit('close')">
    <div class="pay-panel">{{ id }}_{{ price }}</div>
    <button @click.stop="alertHandler">alert</button>
  </van-overlay>
</template>
<script>
import AlertPanel from '~/components_call/alert-panel';

export default {
  props: ['id', 'price', 'show'],

  methods: {
    alertHandler() {
      AlertPanel('xxxxx');
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss" />
