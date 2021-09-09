<template>
  <div class="three-award">
    <div class="award item-1">
      <AwardThreeRight :icon="awards[0].icon" :text="awards[0].text" />
    </div>
    <img class="add-1" src="../image/qflb_icon_jia.png" alt="加" />
    <div class="award item-2">
      <AwardThreeRight :icon="awards[1].icon" :text="awards[1].text" />
    </div>
    <img class="add-2" src="../image/qflb_icon_jia.png" alt="加" />
    <div class="award item-3">
      <AwardThreeRight :icon="awards[2].icon" :text="awards[2].text" />
    </div>
  </div>
</template>
<script lang="ts">
import AwardThreeRight from './AwardThreeRight.vue';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AwardThreeRight,
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
.three-award {
  position: relative;
  white-space: nowrap;
  height: 100%;

  .award,
  .add-1,
  .add-2 {
    display: inline-block;
    position: relative;
  }

  .add-1,
  .add-2 {
    width: 138px;
    height: 136px;
    bottom: 24px;
  }

  .add-1 {
    right: 38px;
  }
  .add-2 {
    right: 108px;
  }

  .item-1 {
  }

  .item-2 {
    right: 74px;
  }
  .item-3 {
    right: 144px;
  }
}
</style>
