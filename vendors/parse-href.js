import _ from 'lodash';
import { isBrowser } from '~/vendors/runtime-env';

export default _.once(function () {
  let scale, token;

  if (isBrowser) {
    scale = localStorage.getItem('#__nuxt_scale');
  }

  const array = unescape(location.href).split('?')[1].split('&');
  array.forEach((s) => {
    const k = s.split('=')[0];
    const v = s.split('=')[1];

    if (k === 'scale') scale = v;
    if (k === 'token') token = v;
  });

  return {
    scale,
    token,
  };
});
