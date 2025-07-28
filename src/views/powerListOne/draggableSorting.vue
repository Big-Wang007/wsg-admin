<template>
  <div class="draggable-sort">
    <h3 class="title">拖拽排序</h3>
    <div class="list">
      <p>列表排序</p>
      <div class="list-drag-sorting" style="width: 480px">
        <div class="item" v-for="(item, index) of sortList" :key="index">{{ item.index + "-" + item.label }}</div>
      </div>
      <a-button @click="handle">save</a-button>
      <p>排序完成，可提交到接口</p>
      <div>
        <div class="item" v-for="(item, index) of newSortList" :key="index">
          {{ item.index + "-" + item.label }}
        </div>
      </div>
    </div>
    <div class="grid-list">
      <p>grid布局排序</p>
      <div class="grid-drag-sorting" style="width: 480px">
        <div class="grid-item" v-for="item of 12">{{ "item" + item }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sortable, { type SortableEvent } from "sortablejs";
import { ref, onMounted } from "vue";

interface SortItem {
  index: number;
  label: string;
}

const listSortable = ref<Sortable>();
const sortList = ref([
  { index: 0, label: "顾客自提30个冰淇淋被阴阳？蜜雪回应" },
  { index: 1, label: "北京化工大学录取通知书能切西瓜" },
  { index: 2, label: "封关后到海南不需额外办理证件" },
  { index: 3, label: "张艺洋成娱乐圈首位被枪毙的艺人" },
  { index: 4, label: "海南全岛封关意味着什么" },
  { index: 5, label: "三菱汽车彻底退出中国" },
]);
const newSortList = ref<SortItem[]>([]);
const sortSequence = ref([0, 1, 2, 3, 4, 5]);

const gridListSortable = ref<Sortable>();

onMounted(() => {
  listSortable.value = new Sortable(document.querySelector(".list-drag-sorting")!, {
    animation: 150,
    ghostClass: "blue-background-class",
    draggable: ".item", // 允许拖拽的项目类名
    chosenClass: "sortable-chosen", // 被选中项的css 类名
    dragClass: "sortable-drag", // 正在被拖拽中的css类名
    onChoose(evt: SortableEvent) {
      console.log(evt);
    },
    onStart(evt: SortableEvent) {
      console.log(evt);
    },
    onEnd(evt: SortableEvent) {
      console.log(evt);
      // 注意：这里使用数组的splice方法重新排列元素顺序
      const movedItem = sortSequence.value.splice(evt.oldIndex as number, 1)[0];
      sortSequence.value.splice(evt.newIndex as number, 0, movedItem);
    },
  });

  gridListSortable.value = new Sortable(document.querySelector(".grid-drag-sorting")!, {
    animation: 150,
    ghostClass: "blue-background-class",
    draggable: ".grid-item", // 允许拖拽的项目类名
    chosenClass: "sortable-chosen", // 被选中项的css 类名
    dragClass: "sortable-drag", // 正在被拖拽中的css类名
  });
});

function handle() {
  newSortList.value.length = 0;
  sortSequence.value.forEach(val => {
    sortList.value.forEach(item => {
      if (val === item.index) {
        newSortList.value.push(item);
      }
    });
  });
}
</script>
<style lang="less" scoped>
.item {
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: pointer;
}

.grid-item {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: #fff;
  border: solid 1px rgb(0, 0, 0, 0.2);
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}

.draggable-sort {
  display: grid;
  grid-template-areas:
    "title title"
    "list grid-list";
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  .title {
    grid-area: title;
    width: 100%;
    text-align: left;
    margin-bottom: 12px;
  }
  .list {
    grid-area: list;
  }
  .grid-list {
    grid-area: grid-list;
  }
}
.blue-background-class {
  background-color: #c8ebfb;
}
</style>
