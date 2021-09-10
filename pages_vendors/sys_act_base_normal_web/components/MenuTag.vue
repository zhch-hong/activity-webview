<template>
  <img class="tag" :src="imgSrc" :alt="tag" />
</template>
<script>
import hot from '../image/icon_1.png';
import limit from '../image/icon_2.png';
import news from '../image/icon_3.png';

export default {
  props: {
    tag: { type: String, required: true },
  },

  data() {
    return {
      imgSrc: '',
    };
  },

  watch: {
    tag: {
      immediate: true,
      handler(value) {
        if (value === 'hot') this.imgSrc = hot;
        if (value === 'limit') this.imgSrc = limit;
        if (value === 'new') this.imgSrc = news;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
img.tag {
  position: absolute;
  z-index: 1;
  top: -12px;
  left: -14px;
  width: 144px;
  height: 121px;
}
</style>
