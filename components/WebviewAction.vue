<template>
  <div class="webview-action">
    <a href="uniwebviewfun://CleanCache">清除缓存</a>
    <a href="uniwebviewfun://Reload">刷新页面</a>
    <a href="uniwebviewfun://Hide">关闭页面</a>
    <a href="unityfun://destroy">销毁实例</a>
  </div>
</template>

<style lang="scss" scoped>
.webview-action {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 34px;

  a {
    display: block;
    background-color: rgba(0, 153, 255, 0.4);
    padding: 15px 30px;
    border-radius: 10px;
    color: #fff;
    margin: 40px 0;
  }

  a:active {
    background-color: rgba(0, 153, 255, 0.8);
  }
}
</style>
