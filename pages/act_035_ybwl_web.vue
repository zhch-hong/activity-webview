<template>
  <div>
    <h1>一本万利</h1>
    <nuxt-link :to="{ path: '/', query: { token } }">HOME</nuxt-link>
  </div>
</template>
<script>
import parseHref from '~/vendors/parse-href';

export default {
  data() {
    return {
      token: '',
    };
  },

  mounted() {
    const { token } = parseHref();
    this.token = token;
  },
};
</script>
