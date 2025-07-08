<template>
  <section class="layout">
    <aside class="layout-sider"><LayoutSider /></aside>
    <header class="layout-header"><LayoutHeader /></header>
    <main class="layout-content">
      <div class="layout-content-wrapper">
        <router-view />
      </div>
    </main>
  </section>
</template>

<script setup>
import LayoutSider from "./sider.vue";
import LayoutHeader from "./header.vue";

import { registerQiankunApps } from "../qiankun";
import { onMounted } from "vue";

onMounted(() => {
  registerQiankunApps();
});
</script>

<style lang="less" scoped>
.layout {
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-rows: 72px 1fr 1fr;
  grid-template-columns: 240px 1fr 1fr;
  grid-template-areas:
    "sider header header"
    "sider content content"
    "sider content content";
  background-color: #f9f9f9;
  &-sider {
    grid-area: sider;
  }
  &-header {
    grid-area: header;
    background-color: #fff;
  }
  &-content {
    grid-area: content;
    &-wrapper {
      height: calc(100% - 64px);
      margin: 32px;
      border-radius: 8px;
    }
  }
}
</style>
