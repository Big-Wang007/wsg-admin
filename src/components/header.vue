<template>
  <div class="header-content">
    <div class="header-content-left"></div>
    <div class="header-content-right">
      <div class="user">
        <a-dropdown placement="bottomLeft">
          <a-avatar size="large" :src="avatar">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">登出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <p class="email">wsguangya@163.com</p>
      <div class="language">
        <a-dropdown placement="bottomLeft">
          <div>
            <span @click.prevent>{{ locale === "zh" ? t("chinese") : t("english") }}</span>
            <GlobalOutlined />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="changeLang('zh')">{{ t("chinese") }}</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="changeLang('en')">{{ t("english") }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GlobalOutlined, UserOutlined } from "@ant-design/icons-vue";
import avatar from "../assets/images/avatar.png";
import qiankunActions from "@/utils/qiankunActions.js";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

function changeLang(lang) {
  locale.value = lang;
  qiankunActions.setGlobalState({ locale: lang });
}
</script>

<style lang="less" scoped>
.header-content {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding-inline: 50px;
  &-right {
    display: flex;
    align-items: center;
    .email {
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      margin-right: 12px;
    }
    .language {
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      &:hover {
        cursor: pointer;
      }
    }
    .user {
      margin-right: 12px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
