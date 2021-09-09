<template>
  <div class="two-award">
    <div class="award item-1">
      <AwardTwoRight :icon="awards[0].icon" :text="awards[0].text" />
    </div>
    <img class="add" src="../image/qflb_icon_jia.png" alt="加" />
    <div class="award item-2">
      <AwardTwoRight :icon="awards[1].icon" :text="awards[1].text" />
    </div>
  </div>
</template>
<script lang="ts">
import AwardTwoRight from './AwardTwoRight.vue';

export default {
  components: {
    AwardTwoRight,
  },

  props: {
    awards: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.two-award {
  height: 100%;

  .award,
  .add {
    display: inline-block;
  }

  .add {
    width: 138px;
    height: 136px;
    transform: translateY(-45px);
  }
}
</style>
