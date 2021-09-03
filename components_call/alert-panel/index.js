import Vue from 'vue';
import AlertPanel from './AlertPanel.vue';

const data = Vue.observable({
  text: null,
  show: false,
});

const app = new Vue({
  render(h) {
    return h(AlertPanel, {
      props: {
        text: data.text,
        show: data.show,
      },
      on: {
        close: () => {
          data.show = false;
          app.$el.remove();
        },
      },
    });
  },
});

export default (text) => {
  data.text = text;
  data.show = true;

  if (typeof app.$el === 'undefined') {
    const div = document.createElement('div');
    document.querySelector('#__nuxt').append(div);
    app.$mount(div);
  } else {
    document.querySelector('#__nuxt').append(app.$el);
  }
};
