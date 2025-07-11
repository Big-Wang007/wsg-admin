<template>
  <div>
    <div class="header">
      <div class="sales-volume-wrapper">
        <div class="sales-volume">
          <div class="title">总销售额</div>
          <div class="content">
            <div class="title-tip">
              <div>
                <span>总销售额</span>
                <ExclamationCircleOutlined />
              </div>
              <a-statistic :value="123456" prefix="¥" :value-style="{ color: '#000000e0', fontSize: '30px' }">
              </a-statistic>
            </div>
            <div style="font-size: 14px; line-height: 22px">
              <span>周同比<span style="margin-left: 8px">12%</span></span>
              <span style="display: inline-flex; align-items: center">
                <svg-icon icon-class="up-red" style="color: #ff4c4c"></svg-icon>
              </span>
            </div>
            <div style="font-size: 14px; line-height: 22px">
              <span>日同比<span style="margin-left: 8px">11%</span></span>
              <span style="display: inline-flex; align-items: center">
                <svg-icon icon-class="down-green" style="color: #52c41a"></svg-icon>
              </span>
            </div>
            <div class="bottom">
              <span>日销售额</span>
              <a-statistic
                :value="123456"
                prefix="¥"
                :value-style="{ color: '#000000e0', fontSize: '14px', marginLeft: '8px' }"
              >
              </a-statistic>
            </div>
          </div>
        </div>
      </div>
      <div class="visit-volume-wrapper">
        <div class="visit-volume">
          <div class="title">访问量</div>
          <div class="content">
            <div class="title-tip">
              <div>
                <span>访问量</span>
                <ExclamationCircleOutlined />
              </div>
              <a-statistic :value="8848" :value-style="{ color: '#000000e0', fontSize: '30px' }"></a-statistic>
            </div>
            <div id="visit-main"></div>
            <div class="bottom">
              <span>日访问量</span>
              <a-statistic :value="1234" :value-style="{ color: '#000000e0', fontSize: '14px', marginLeft: '8px' }">
              </a-statistic>
            </div>
          </div>
        </div>
      </div>
      <div class="pay-volume-wrapper">
        <div class="pay-volume">
          <div class="title">支付笔数</div>
          <div class="content">
            <div class="title-tip">
              <div>
                <span>支付笔数</span>
                <ExclamationCircleOutlined />
              </div>
              <a-statistic :value="6543" :value-style="{ color: '#000000e0', fontSize: '30px' }"></a-statistic>
            </div>
            <div id="pay-main"></div>
            <div class="bottom">
              <span>转化率</span>
              <a-statistic
                :value="60"
                suffix="%"
                :value-style="{ color: '#000000e0', fontSize: '14px', marginLeft: '8px' }"
              >
              </a-statistic>
            </div>
          </div>
        </div>
      </div>
      <div class="operation-volume-wrapper">
        <div class="operation-volume">
          <div class="title">运营活动效果</div>
          <div class="content">
            <div class="title-tip">
              <div>
                <span>运营活动效果</span>
                <ExclamationCircleOutlined />
              </div>
              <a-statistic :value="78" suffix="%" :value-style="{ color: '#000000e0', fontSize: '30px' }"></a-statistic>
            </div>
            <div style="margin-top: 12px">
              <a-progress
                :percent="78"
                :stroke-color="{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }"
              />
            </div>
            <div class="bottom">
              <div style="font-size: 14px; line-height: 22px; margin-right: 12px">
                <span>周同比<span style="margin-left: 8px">12%</span></span>
                <span style="display: inline-flex; align-items: center">
                  <svg-icon icon-class="up-red" style="color: #ff4c4c"></svg-icon>
                </span>
              </div>
              <div style="font-size: 14px; line-height: 22px">
                <span>日同比<span style="margin-left: 8px">11%</span></span>
                <span style="display: inline-flex; align-items: center">
                  <svg-icon icon-class="down-green" style="color: #52c41a"></svg-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <a-tabs v-model:activeKey="activeKey" tabBarStyle="padding-left: 16px; height: 56px" @change="changeTab">
        <template #rightExtra>
          <div style="display: flex; padding-right: 16px">
            <div style="margin-right: 24px">
              <a-radio-group v-model:value="tabRadioDate" @change="changeDate">
                <a-radio-button type="text" value="day">今日</a-radio-button>
                <a-radio-button type="text" value="week">本周</a-radio-button>
                <a-radio-button type="text" value="month">本月</a-radio-button>
                <a-radio-button type="text" value="year">本年</a-radio-button>
              </a-radio-group>
            </div>
            <div>
              <a-range-picker
                v-model:value="dateTime"
                size="default"
                format="YYYY-MM-DD"
                style="width: 256px; height: 32px"
              />
            </div>
          </div>
        </template>
        <a-tab-pane key="sales" tab="销售额">
          <div style="display: flex; padding-bottom: 32px">
            <div id="sales-volume-main"></div>
            <div class="sales-rank">
              <h4>门店销售额排名</h4>
              <ul>
                <li v-for="item of salesRanking">
                  <span>{{ item.rank }}</span>
                  <span>{{ item.name }}</span>
                  <span>{{ item.valume }}</span>
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="visit" tab="访问量">
          <div style="display: flex; padding-bottom: 32px">
            <div id="visit-volume-main"></div>
            <div class="visit-rank">
              <h4>门店销售额排名</h4>
              <ul>
                <li v-for="item of salesRanking">
                  <span>{{ item.rank }}</span>
                  <span>{{ item.name }}</span>
                  <span>{{ item.valume }}</span>
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import echarts from "@/utils/echarts";
import { nextTick, onMounted, reactive, ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

function initLineChart(visitData) {
  const list = [];
  visitData.forEach(val => {
    const arr = [];
    arr.push(val.x);
    arr.push(val.y);
    list.push(arr);
  });
  const lineChartDom = document.getElementById("visit-main");
  const lineChart = echarts.init(lineChartDom);
  const lineChartOption = {
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false, // 不显示分割线（即网格线）
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false, // 不显示分割线（即网格线）
      },
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data: [...list],
        type: "line",
        smooth: true,
        areaStyle: {},
        symbol: "none",
      },
    ],
  };
  lineChart.setOption(lineChartOption);
}

function initBarChart(visitData) {
  const list = [];
  visitData.forEach(val => {
    const arr = [];
    arr.push(val.x);
    arr.push(val.y);
    list.push(arr);
  });
  const barChartDom = document.getElementById("pay-main");
  const barChart = echarts.init(barChartDom);
  const barChartOption = {
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false, // 不显示分割线（即网格线）
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false, // 不显示分割线（即网格线）
      },
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data: [...list],
        type: "bar",
        smooth: true,
      },
    ],
  };
  barChart.setOption(barChartOption);
}

function initSalesVolume(salesData) {
  const list = [];
  salesData.forEach(val => {
    const arr = [];
    arr.push(val.x);
    arr.push(val.y);
    list.push(arr);
  });
  const salesVolumetDom = document.getElementById("sales-volume-main");
  const salesVolumeChart = echarts.init(salesVolumetDom);
  const salesVolumeChartOption = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    grid: {
      // top: 0,
      // right: 0,
      bottom: 30,
      // left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        name: "销售额",
        data: [...list],
        type: "bar",
        smooth: true,
        areaStyle: {},
        symbol: "none",
      },
    ],
  };
  salesVolumeChart.setOption(salesVolumeChartOption);
}

function initVisitVolume(salesData) {
  const list = [];
  salesData.forEach(val => {
    const arr = [];
    arr.push(val.x);
    arr.push(val.y);
    list.push(arr);
  });
  const visitVolumetDom = document.getElementById("visit-volume-main");
  const visitVolumeChart = echarts.init(visitVolumetDom);
  const visitVolumeChartOption = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    grid: {
      // top: 0,
      // right: 0,
      bottom: 30,
      // left: 0,
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        name: "访问量",
        data: [...list],
        type: "bar",
        smooth: true,
        areaStyle: {},
        symbol: "none",
      },
    ],
  };
  visitVolumeChart.setOption(visitVolumeChartOption);
}

const homeData = ref();
const tabRadioDate = ref("day");
const dateTime = ref([dayjs(), dayjs()]);

function changeDate(en) {
  if (en.target.value === "day") {
    dateTime.value = [dayjs(), dayjs()];
  } else if (en.target.value === "week") {
    dateTime.value = [dayjs().startOf("week"), dayjs().endOf("week")];
  } else if (en.target.value === "month") {
    dateTime.value = [dayjs().startOf("month"), dayjs().endOf("month")];
  } else if (en.target.value === "year") {
    dateTime.value = [dayjs().startOf("year"), dayjs().endOf("year")];
  }
  console.log(dayjs().startOf("week").format("YYYY-MM-DD HH"));
  console.log(dayjs().endOf("week").format("YYYY-MM-DD"));
}

function init() {
  axios.get("/admin/v1/fake_analysis_chart_data").then(res => {
    const { code, data } = res.data;
    if (code === 200) {
      homeData.value = data;
      initLineChart(homeData.value.visitData);
      initBarChart(homeData.value.visitData);
      initSalesVolume(homeData.value.salesData);
      console.log(data);
    }
  });
}
init();

const activeKey = ref("sales");
function changeTab(key) {
  if (key === "sales") {
    initSalesVolume(homeData.value.salesData);
  } else {
    nextTick(() => {
      initVisitVolume(homeData.value.visitData);
    });
  }
}

const salesRanking = reactive([
  { rank: 1, name: "莲花大道1号门店", valume: "999,999" },
  { rank: 2, name: "莲花大道2号门店", valume: "888,888" },
  { rank: 3, name: "莲花大道3号门店", valume: "777,777" },
  { rank: 4, name: "莲花大道4号门店", valume: "666,999" },
  { rank: 5, name: "莲花大道5号门店", valume: "555,999" },
  { rank: 6, name: "莲花大道6号门店", valume: "444,999" },
  { rank: 7, name: "莲花大道7号门店", valume: "333,999" },
]);
</script>

<style lang="less" scoped>
.header {
  display: flex;
  margin-left: -12px;
  margin-right: -12px;
  .sales-volume-wrapper,
  .visit-volume-wrapper,
  .pay-volume-wrapper,
  .operation-volume-wrapper {
    padding: 0 12px;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .sales-volume,
  .visit-volume,
  .pay-volume,
  .operation-volume {
    flex: 0 0 25%;
    background: #fff;
    border-radius: 8px;
    box-shadow:
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02);
    .title {
      height: 55px;
      font-weight: 600;
      padding: 15px 24px;
      line-height: 1.5;
      border-bottom: 1px solid #f0f0f0;
    }
    .content {
      padding: 20px 24px 8px;
      .title-tip {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        & > div {
          display: flex;
          justify-content: space-between;
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #000000e0;
        padding-top: 9px;
        margin-top: 8px;
        border-top: 1px solid rgba(5, 5, 5, 0.06);
      }
    }
  }
}
.main {
  background: #fff;
  border-radius: 8px;
  margin-top: 24px;
}

#visit-main,
#pay-main {
  width: 100%;
  height: 46px;
}

#sales-volume-main,
#visit-volume-main {
  width: 66%;
  height: 300px;
}

.sales-rank,
.visit-rank {
  flex: 0 0 33%;
  padding: 0 32px 32px 72px;
  ul {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    // li:not()
    li {
      display: flex;
      align-items: center;
      margin-top: 16px;
      zoom: 1;
      span:nth-of-type(1) {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 1.5px;
        margin-right: 16px;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.85);
      }
      span:nth-of-type(2) {
        flex: 1;
        margin-right: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
