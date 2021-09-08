import Vue from 'vue';
import RulePanel from './RulePanel.vue';

const observable = Vue.observable({
  list: [],
});

const app = new Vue({
  render(h) {
    return h(RulePanel, {
      props: {
        list: observable.list,
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
 *
 * @param {String[]} list
 */
export default function (list) {
  observable.list = list;

  if (typeof app.$el === 'undefined') {
    const div = document.createElement('div');
    document.querySelector('#__nuxt').append(div);
    app.$mount(div);
  } else {
    document.querySelector('#__nuxt').append(app.$el);
  }
}
