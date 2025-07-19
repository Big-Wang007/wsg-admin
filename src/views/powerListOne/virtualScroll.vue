<template>
  <div class="virtual-scroll">
    <div>
      <h3>虚拟滚动分页（100条/每页）加载1w条数据</h3>
      <RecycleScroller
        ref="scrollContainer"
        class="scroller"
        :items="paginationList"
        :item-size="48"
        key-field="key"
        :update-interval="0"
        @scroll-end="handleScrollEnd"
      >
        <template v-slot:default="{ item }">
          <div class="user">
            {{ item.value }}
            <a-button>编辑</a-button>
            <a-image :src="Avatar" :width="48" />
          </div>
        </template>
        <template v-slot:after
          ><div style="text-align: center; padding: 12px 0"><a-spin />loading...</div>
        </template>
      </RecycleScroller>
    </div>
    <div>
      <h3>虚拟滚动全量加载1w条数据</h3>
      <RecycleScroller
        ref="scrollContainer"
        class="scroller"
        :items="fullList"
        :item-size="48"
        key-field="key"
        :update-interval="0"
      >
        <template v-slot:default="{ item }">
          <div class="user">
            {{ item.value }}
            <a-button>编辑</a-button>
            <a-image :src="Avatar" :width="48" />
          </div>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import Avatar from "../.././assets/images/avatar.png";
import { list } from "@/api/mock/list.js";
import axios from "axios";

const scrollContainer = ref(null);
const paginationList = ref([]);
const fullList = ref([...list]);
const current = ref(1);
const pageSize = ref(100);
const loading = ref(false);

function init() {
  const params = {
    current: current.value,
    pageSize: pageSize.value,
  };
  loading.value = true;
  axios
    .get("/admin/v1/get-virtual-scroll-data", { params: params })
    .then(res => {
      console.log(res);
      const { code, data } = res.data;
      if (code === 200) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          paginationList.value = [...paginationList.value, ...data];
        }, 1000);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
init();

function handleScrollEnd() {
  console.log("已滚动到底部.");
  current.value = current.value + 1;
  init();
}
</script>
<style lang="less" scoped>
.virtual-scroll {
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
.scroller {
  width: 500px;
  height: 800px;
}
.no-virtual-scroll {
  width: 500px;
  height: 800px;
  overflow-y: scroll;
  li {
    list-style: none;
    height: 48px;
    line-height: 48px;
  }
}
h3 {
  margin-bottom: 24px;
}
</style>
