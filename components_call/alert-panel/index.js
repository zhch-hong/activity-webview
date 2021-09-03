import Vue from 'vue';
import AlertPanel from './AlertPanel.vue';

const data = Vue.observable({
  text: null,
});

const app = new Vue({
  render(h) {
    return h(AlertPanel, {
      props: {
        text: data.text,
      },
      on: {
        close: () => {
          app.$el.remove();
        },
      },
    });
  },
});

/**
 * alert
 * @param {String} text
 */
function alertPanel(text) {
  data.text = text;

  if (typeof app.$el === 'undefined') {
    const div = document.createElement('div');
    document.querySelector('#__nuxt').append(div);
    app.$mount(div);
  } else {
    document.querySelector('#__nuxt').append(app.$el);
  }
}

export default alertPanel;
