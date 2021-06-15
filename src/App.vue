<template>
  <div id="app">
    <ConfigProvider :locale="zhCN">
      <router-view></router-view>
    </ConfigProvider>
  </div>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ConfigProvider } from "ant-design-vue";
</script>

<style lang="scss">
</style>
