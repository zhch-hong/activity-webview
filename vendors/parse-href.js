import _ from 'lodash';
import { isBrowser } from '~/vendors/runtime-env';
import { API_USER_LOGIN } from '~/vendors/api';

export default _.once(function () {
  let scale, token;

  if (isBrowser) {
    scale = localStorage.getItem('#__nuxt_scale');
  }

  const query = location.href.split('?')[1];
  if (!_.isEmpty(query)) {
    const map = query.split('&');
    map.forEach((s) => {
      const k = s.split('=')[0];
      const v = s.split('=')[1];

      if (k === 'scale') scale = v;
      if (k === 'token') token = v;
    });
  }

  if (isBrowser && !_.isEmpty(token)) {
    API_USER_LOGIN(token);
  }

  return {
    scale,
    token,
  };
});
