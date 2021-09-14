<template>
  <div v-if="isWebview || rend">
    <Nuxt />
  </div>
</template>
<script>
import _ from 'lodash';
import Vue from 'vue';
import { API_USER_LOGIN, API_LOOP_FETCH, API_APP_SCALE } from '~/vendors/api';
import parseHref from '~/vendors/parse-href';
import { isBrowser, isWebview } from '~/vendors/runtime-env';

export default {
  data() {
    return {
      isWebview,
      // eslint-disable-next-line no-unneeded-ternary
      rend: false,
      computedScale: false,
    };
  },

  async created() {
    if (process.browser && isBrowser) {
      const { token } = parseHref();
      await API_USER_LOGIN(token);
      this.rend = true;
    }
  },

  beforeMount() {
    const { scale } = parseHref();
    if (!_.isEmpty(scale)) {
      this.computedScale = false;
      document.querySelector('#__nuxt').style.transform = scale;
      document.querySelector('#__nuxt').style.opacity = 1;
    } else {
      this.computedScale = true;
    }
  },

  mounted() {
    API_LOOP_FETCH();

    if (this.computedScale) {
      setTimeout(() => {
        const appElement = document.querySelector('#__nuxt');
        let s = window.innerHeight / parseFloat(getComputedStyle(appElement).getPropertyValue('height'));

        if (s > 1) s = 1;
        const v = `scale(${s})`;

        appElement.style.transform = v;
        appElement.style.opacity = 1;

        if (isWebview) {
          API_APP_SCALE(v);
        } else {
          localStorage.setItem('#__nuxt_scale', v);
        }
      }, 200);
    }

    if (isWebview) {
      this.appendWebviewAction();
    }
  },

  methods: {
    appendWebviewAction() {
      const vm = new Vue({
        render(h) {
          return h('WebviewAction');
        },
      });
      const mountElement = document.createElement('div');
      document.body.append(mountElement);
      vm.$mount(mountElement);
    },
  },
};
</script>
