<template>
  <Nuxt />
</template>
<script>
import _ from 'lodash';
import { API_LOOP_FETCH, API_APP_SCALE } from '~/vendors/api';
import parseHref from '~/vendors/parse-href';
import { isWebview } from '~/vendors/runtime-env';

export default {
  mounted() {
    API_LOOP_FETCH();

    const appElement = document.querySelector('#__nuxt');
    const { scale } = parseHref();
    if (_.isEmpty(scale)) {
      setTimeout(() => {
        let s = window.innerHeight / parseFloat(getComputedStyle(appElement).getPropertyValue('height'));

        if (s > 1) s = 1;
        const v = `scale(${s})`;
        appElement.style.transform = v;

        if (isWebview) {
          API_APP_SCALE(v);
        } else {
          localStorage.setItem('#__nuxt_scale', v);
        }
      }, 200);
    } else {
      appElement.style.transform = scale;
    }
  },
};
</script>
