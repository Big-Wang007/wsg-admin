<template>
  <div class="sider-content">
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      style="width: 100%; height: 100%"
      mode="inline"
      :open-keys="state.openKeys"
      theme="dark"
      :items="items"
      @select="handleClick"
    ></a-menu>
  </div>
</template>

<script setup>
import { h, reactive, watch } from "vue";
import { HomeOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = reactive([
  getItem("首页", "home", () => h(HomeOutlined)),
  getItem("功能列表1", "power-list-one", () => h(MailOutlined), [
    getItem("虚拟滚动", "virtual-scroll"),
    getItem("图片压缩和裁剪", "compression-and-clip"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem(t("menu.vueMircoApp"), "vue-app", () => h(AppstoreOutlined), [
    getItem(t("menu.list"), "list"),
    getItem(t("menu.dashboard"), "dashboard"),
    getItem(t("menu.details"), "details"),
  ]),
  getItem("react微应用", "react-app", () => h(SettingOutlined), [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
]);
const state = reactive({
  openKeys: ["power-list-one", "vue-app", "react-app"],
  selectedKeys: [],
});

const router = useRouter();
const handleClick = ({ keyPath }) => {
  if (keyPath.length > 1) {
    const [subRoutePath, route] = keyPath;
    router.push(`/${subRoutePath}/${route}`);
  } else {
    const [route] = keyPath;
    router.push(`/${route}`);
  }
};

const route = useRoute();
watch(
  () => route.path,
  val => {
    const list = val.split("/");
    state.selectedKeys.push(list[2]);
  },
  { immediate: true },
);
</script>

<style lang="less" scoped>
.sider-content {
  position: fixed;
  width: 240px;
  height: 100%;
}
</style>
