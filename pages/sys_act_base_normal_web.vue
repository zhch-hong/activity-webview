<template>
  <div class="multi-nav">
    <!-- 关闭按钮 -->
    <a class="close" href="uniwebviewfun://Hide">
      <img src="~/assets/image/close_1.png" alt="关闭" />
    </a>

    <div class="container">
      <div ref="Menu" class="menu">
        <ul class="list">
          <li
            v-for="item of menuList"
            :key="item['ID']"
            :class="['item', menuId === item['ID'] ? 'active' : 'inactive']"
            @click="menuId = item['ID']"
          >
            <!-- 活动标签 -->
            <template v-if="item['tag'] && item['tag'] !== 'normal'">
              <MenuTag :tag="item['tag']" />
            </template>

            <div class="title">
              <span>{{ item['title'] }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="main">
        <client-only>
          <component
            :is="currentComponent"
            @select-menu="(id) => (menuId = id)"
            @pay-fulfilled="updateMenu"
          ></component>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import BScroll from '@better-scroll/core';

import { API_CHECK_PERMISS } from '~/vendors/api';
import { fetchClientConfig } from '~/vendors/network';

import MenuTag from '~/pages_vendors/sys_act_base_normal_web/components/MenuTag.vue';

export default {
  components: {
    MenuTag,
  },

  data() {
    return {
      menuId: null,
      currentComponent: null,
      beforePermissions: [],
      menuList: [],
    };
  },

  watch: {
    menuId: {
      immediate: true,
      handler(value) {
        if (process.client) {
          const act = this.menuList.find((m) => m.ID === value);
          const menuName = act ? act.vue_component || 'default-component' : 'default-component';
          this.currentComponent = () =>
            import(`~/pages_vendors/sys_act_base_normal_web/components/dynamic/${menuName}/index.vue`);
        }
      },
    },
  },

  async mounted() {
    await this.fetchMenu();
    this.menuId = this.menuList[0].ID;
    setTimeout(() => {
      // eslint-disable-next-line no-new
      new BScroll(this.$refs.Menu, { click: true });
    }, 300);
  },

  methods: {
    filtPermissions(list) {
      return new Promise((resolve) => {
        const permissionAct = [];
        const promiseList = [];

        list.forEach((item) => {
          if (!item.condi_key) {
            promiseList.push(Promise.resolve({ result: true }));
          } else {
            const promise = API_CHECK_PERMISS(item.condi_key);

            promiseList.push(promise);
          }
        });

        Promise.all(promiseList).then((value) => {
          value.forEach((item, index) => {
            if (item.result) {
              permissionAct.push(list[index]);
            }
          });

          resolve(permissionAct);
        });
      });
    },

    async fetchMenu() {
      const filtTime = (list) => {
        const current = dayjs();

        return list.filter((item) => {
          const begin = item.beginTime;
          const end = item.endTime;

          if (begin === -1) {
            if (end === -1) return true;

            if (dayjs.unix(end) > current) return true;

            return false;
          }

          if (dayjs.unix(begin) < current) {
            if (end === -1) return true;

            if (dayjs.unix(end) > current) return true;

            return false;
          }

          return false;
        });
      };

      let { config } = await fetchClientConfig('/game_activity/config/game_activity_config.json');
      config = config.filter((item) => item.is_on_off === 1);
      config = filtTime(config);

      this.beforePermissions.splice(0, 999, ...config);

      const array = await this.filtPermissions(config);
      this.menuList.splice(0, 999, ...array);
    },

    async updateMenu() {
      const array = await this.filtPermissions(this.beforePermissions);
      this.menuList.splice(0, 999, ...array);
    },
  },
};
</script>
<style lang="scss" scoped>
.multi-nav {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-image: url('~/pages_vendors/sys_act_base_normal_web/image/bg_1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  color: aquamarine;

  & > a.close {
    position: absolute;
    right: 140px;
    top: 50px;

    img {
      width: 104px;
      height: 104px;
    }
  }
}

.container {
  position: relative;
  box-sizing: border-box;
  margin: 186px 178px auto 178px;
  padding: 43px 35px 37px 35px;
  display: flex;
  justify-content: space-between;

  .menu {
    height: 780px;
    width: 360px;
    overflow: hidden;
    cursor: default;
    user-select: none;

    .list {
      list-style: none;
      margin: 0;
      padding: 20px 0;
      text-align: center;

      .item {
        position: relative;
        height: 113px;
        margin-top: 20px;
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;

        &:first-child {
          margin-top: 0;
        }

        .title {
          height: 100px;
          line-height: 100px;
          width: 280px;
          margin-top: 4px;
          font-size: 34px;
        }
      }

      .active {
        width: 339px;
        color: white;
        background-image: url('~/assets/image/btn_1.png');

        & > img.tag {
          left: -9px;
        }

        .title {
          margin-left: 5px;
        }
      }

      .inactive {
        width: 299px;
        margin-right: 30px;
        color: #3a6ca8;
        background-image: url('~/assets/image/btn_2.png');
      }
    }
  }

  .main {
    position: relative;
    height: 760px;
    width: 1113px;
    border: 10px solid white;
    border-radius: 24px;
    overflow: auto;
  }
}
</style>
