<template>
  <div class="notify">
    <p class="title">重要公告</p>
    <p>重要公告：</p>
    <p>
      本平台倡导绿色休闲游戏，游戏中的金币为道具，不具有任何的实际货币价值，只限于玩家在游戏中使用。同时，本平台对玩家的金币不提供任何形式的官方回购、直接或间接兑换现金、兑换实物、相互转赠、转让等服务。
    </p>
    <p>
      在此，本平台明令禁止玩家之间任何形式的金币交易，金币转让等行为，坚决抵制低俗、不健康或涉及赌博等违法行为，以及其他违背游戏公平的作弊行为，一经核实，将被处以禁止登录游戏、删除游戏数据等处罚。
    </p>
  </div>
</template>
<script>
export default {
  name: 'Notify',
};
</script>
<style lang="scss" scoped>
.notify {
  color: #b59134;
  background-color: #a2d6e9;
  min-height: 100%;
  box-sizing: border-box;
  padding: 20px;

  .title {
    margin: 0;
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
    background: linear-gradient(to right, #c34012, #e2791c);
    letter-spacing: 2px;
    border-radius: 10px;
  }
}
</style>
