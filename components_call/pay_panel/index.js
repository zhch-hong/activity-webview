import Vue from 'vue';
import PayPanel from './PayPanel.vue';

const data = Vue.observable({
  id: null,
  price: null,
  show: false,
});

const app = new Vue({
  render(h) {
    return h(PayPanel, {
      props: {
        id: data.id,
        price: data.price,
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

export default (id, price) => {
  data.id = id;
  data.price = price;
  data.show = true;

  if (typeof app.$el === 'undefined') {
    const div = document.createElement('div');
    document.querySelector('#__nuxt').append(div);
    app.$mount(div);
  } else {
    document.querySelector('#__nuxt').append(app.$el);
  }
};
