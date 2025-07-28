<template>
  <div>
    <a-form :model="formState" ref="formRef" layout="vertical" @finish="onFinish" @finishFailed="onFinishFailed">
      <div class="card">
        <div class="card-title">基础信息</div>
        <div class="form-content">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item
                label="运单号"
                name="trackingNumber"
                :rules="[
                  { required: true, message: '运单号不能为空' },
                  { pattern: /^[a-zA-Z]{3}\d{10}$/, message: '格式错误: 3位字母+10位数字' },
                ]"
              >
                <a-input v-model:value="formState.trackingNumber" placeholder="例如: ABC1234567890" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="托运人信息" name="shipper" :rules="[{ required: true, message: '托运人不能为空' }]">
                <a-input v-model:value="formState.shipper" placeholder="托运人姓名/公司名称" /> </a-form-item
            ></a-col>
            <a-col :span="8">
              <a-form-item
                label="托运人电话"
                name="shipperPhone"
                :rules="[
                  { required: true, message: '电话不能为空' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
                ]"
              >
                <a-input v-model:value="formState.shipperPhone" placeholder="手机号码" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="收货人" name="consignee" :rules="[{ required: true, message: '收货人不能为空' }]">
                <a-input v-model:value="formState.consignee" placeholder="收货人姓名/公司名称" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="收货人电话"
                name="consigneePhone"
                :rules="[
                  { required: true, message: '电话不能为空' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
                ]"
              >
                <a-input v-model:value="formState.consigneePhone" placeholder="手机号码" /> </a-form-item
            ></a-col>
            <a-col :span="8">
              <a-form-item
                label="运输方式"
                name="transportType"
                :rules="[{ required: true, message: '请选择运输方式' }]"
              >
                <a-select v-model:value="formState.transportType" placeholder="请选择运输方式">
                  <a-select-option value="air">航空运输</a-select-option>
                  <a-select-option value="sea">海运</a-select-option>
                  <a-select-option value="land">陆运</a-select-option>
                  <a-select-option value="rail">铁路运输</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          货物信息
          <a-button type="dashed" @click="addCargoItem">添加货物</a-button>
        </div>
        <div class="form-content">
          <div class="dynamic-item" v-for="(item, index) of formState.cargoItems" :key="item.id">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item
                  label="货物名称"
                  :name="['cargoItems', index, 'name']"
                  :rules="[{ required: true, message: '货物名称不能为空' }]"
                >
                  <a-input v-model:value="item.name" placeholder="货物名称" />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item
                  label="数量"
                  :name="['cargoItems', index, 'quantity']"
                  :rules="[{ required: true, validator: validateQuantity }]"
                >
                  <a-input-number
                    v-model:value="item.quantity"
                    :default-value="1"
                    :min="1"
                    :auto-complete="false"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item
                  label="重量 (kg)"
                  :name="['cargoItems', index, 'weight']"
                  :rules="[{ required: true, validator: validateWeight }]"
                >
                  <a-input-number
                    v-model:value="item.weight"
                    :min="0.1"
                    :step="0.1"
                    :auto-complete="false"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item
                  label="体积 (m³)"
                  :name="['cargoItems', index, 'volume']"
                  :rules="[{ required: true, validator: validateVolume }]"
                >
                  <a-input-number
                    v-model:value="item.volume"
                    :min="0.01"
                    :step="0.01"
                    :auto-complete="false"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="货物类型"
                  :name="['cargoItems', index, 'type']"
                  :rules="[{ required: true, message: '请选择货物类型' }]"
                >
                  <a-select v-model:value="item.type" placeholder="货物类型" @change="handleCargoTypeChange(item)">
                    <a-select-option value="general">普通货物</a-select-option>
                    <a-select-option value="fragile">易碎品</a-select-option>
                    <a-select-option value="danger">危险品</a-select-option>
                    <a-select-option value="perishable">易腐品</a-select-option>
                    <a-select-option value="valuable">贵重物品</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>

            <a-button class="remove-btn" type="text" danger @click="removeCargoItem(item.id)">
              <delete-outlined />
            </a-button>
            <!-- 特殊货物额外信息 -->
            <div v-if="item.type === 'fragile'" class="special-info">
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item
                    label="易碎品处理方式"
                    :name="['cargoItems', index, 'fragileHandling']"
                    :rules="[{ required: true, message: '请选择处理方式' }]"
                  >
                    <a-select v-model:value="item.fragileHandling" placeholder="选择处理方式">
                      <a-select-option value="standard">标准包装</a-select-option>
                      <a-select-option value="enhanced">增强包装</a-select-option>
                      <a-select-option value="custom">定制包装</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    label="最大堆叠层数"
                    :name="['cargoItems', index, 'maxStack']"
                    :rules="[
                      { required: true, message: '请输入最大堆叠层数' },
                      { type: 'number', min: 1, max: 5, message: '1-5层' },
                    ]"
                  >
                    <a-input-number v-model:value="item.maxStack" :min="1" :max="5" style="width: 100%" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>

            <div v-if="item.type === 'danger'" class="special-info">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-item
                    label="危险品等级"
                    :name="['cargoItems', index, 'dangerClass']"
                    :rules="[{ required: true, message: '请选择危险品等级' }]"
                  >
                    <a-select v-model:value="item.dangerClass" placeholder="选择等级">
                      <a-select-option v-for="i in 9" :key="i" :value="`class${i}`">第{{ i }}类危险品</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="UN编号"
                    :name="['cargoItems', index, 'unNumber']"
                    :rules="[
                      { required: true, message: 'UN编号不能为空' },
                      { pattern: /^UN\d{4}$/, message: '格式: UN+4位数字' },
                    ]"
                  >
                    <a-input v-model:value="item.unNumber" placeholder="例如: UN1234" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="MSDS文件"
                    :name="['cargoItems', index, 'msds']"
                    :rules="[{ required: true, message: '请上传MSDS文件' }]"
                  >
                    <a-upload v-model:file-list="item.msds" accept=".pdf,.doc,.docx">
                      <a-button> <upload-outlined /> 上传文件 </a-button>
                    </a-upload>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="summary-card">
            <a-row :gutter="16">
              <a-col :span="6">
                <div>
                  货物总数: <strong>{{ totalCargoItems }}</strong> 项
                </div>
              </a-col>
              <a-col :span="6">
                <div>
                  总重量: <strong>{{ totalWeight }} kg</strong>
                </div>
              </a-col>
              <a-col :span="6">
                <div>
                  总体积: <strong>{{ totalVolume }} m³</strong>
                </div>
              </a-col>
              <a-col :span="6">
                <div>
                  特殊货物:
                  <span v-if="hasDangerousGoods" class="custom-tag danger-tag">危险品</span>
                  <span v-if="hasFragileGoods" class="custom-tag fragile-tag">易碎品</span>
                  <span v-if="!hasDangerousGoods && !hasFragileGoods">无</span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">运输信息</div>
        <div class="form-content">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="发货日期" name="shipDate" :rules="[{ required: true, message: '请选择发货日期' }]">
                <a-date-picker v-model:value="formState.shipDate" :disabled-date="disabledDate" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="预计到达日期"
                name="estimatedArrival"
                :rules="[{ required: true, validator: validateEstimatedArrival }]"
              >
                <a-date-picker
                  v-model:value="formState.estimatedArrival"
                  :disabled-date="disabledEstimatedDate"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="实际到达日期" name="actualArrival" :rules="[{ validator: validateActualArrival }]">
                <a-date-picker
                  v-model:value="formState.actualArrival"
                  :disabled-date="disabledActualDate"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="始发地" name="origin" :rules="[{ required: true, message: '始发地不能为空' }]">
                <a-input v-model:value="formState.origin" placeholder="始发地详细地址" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="目的地" name="destination" :rules="[{ required: true, message: '目的地不能为空' }]">
                <a-input v-model:value="formState.destination" placeholder="目的地详细地址" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 运输方式特定字段 -->
          <div v-if="formState.transportType === 'air'" class="form-section">
            <h3>航空运输信息</h3>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item
                  label="航班号"
                  name="flightNumber"
                  :rules="[
                    { required: true, message: '航班号不能为空' },
                    { pattern: /^[A-Z]{2}\d{3,4}$/, message: '格式: 2位字母+3-4位数字' },
                  ]"
                >
                  <a-input v-model:value="formState.flightNumber" placeholder="例如: CA1234" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="最大载重 (kg)"
                  name="maxWeight"
                  :rules="[{ required: true, validator: validateAirMaxWeight }]"
                >
                  <a-input-number v-model:value="formState.maxWeight" :min="100" :step="10" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="温控要求" name="temperatureControl">
                  <a-select v-model:value="formState.temperatureControl" placeholder="选择温控要求">
                    <a-select-option value="none">无</a-select-option>
                    <a-select-option value="cool">冷藏 (2-8°C)</a-select-option>
                    <a-select-option value="freeze">冷冻 (-18°C以下)</a-select-option>
                    <a-select-option value="ambient">常温 (15-25°C)</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div v-if="formState.transportType === 'sea'" class="form-section">
            <h3>海运信息</h3>
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="船名" name="vesselName" :rules="[{ required: true, message: '船名不能为空' }]">
                  <a-input v-model:value="formState.vesselName" placeholder="船名" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="航次" name="voyageNumber" :rules="[{ required: true, message: '航次不能为空' }]">
                  <a-input v-model:value="formState.voyageNumber" placeholder="航次编号" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="集装箱号"
                  name="containerNumber"
                  :rules="[
                    { required: true, message: '集装箱号不能为空' },
                    { pattern: /^[A-Z]{4}\d{7}$/, message: '4位字母+7位数字' },
                  ]"
                >
                  <a-input v-model:value="formState.containerNumber" placeholder="例如: ABCD1234567" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">费用信息</div>
        <div class="form-content">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="运费 (¥)" name="freight" :rules="[{ required: true, validator: validateFreight }]">
                <a-input-number v-model:value="formState.freight" :min="0" :step="100" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="保险费 (¥)" name="insurance" :rules="[{ validator: validateInsurance }]">
                <a-input-number v-model:value="formState.insurance" :min="0" :step="50" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="关税 (¥)" name="customsDuty" :rules="[{ validator: validateCustomsDuty }]">
                <a-input-number v-model:value="formState.customsDuty" :min="0" :step="100" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item
                label="货物总价值 (¥)"
                name="totalValue"
                :rules="[
                  { required: true, message: '货物总价值不能为空' },
                  { type: 'number', min: 1, message: '必须大于0' },
                ]"
              >
                <a-input-number v-model:value="formState.totalValue" :min="0" :step="1000" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="保险覆盖比例"
                name="insuranceCoverage"
                :rules="[{ validator: validateInsuranceCoverage }]"
              >
                <a-input-number
                  v-model:value="formState.insuranceCoverage"
                  :min="0"
                  :max="100"
                  :formatter="(value: number) => `${value}%`"
                  :parser="(value: string) => value.replace('%', '')"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="总计费用 (¥)">
                <a-input-number :value="totalCost" :step="100" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
          </a-row>

          <div v-if="formState.insurance > 0" class="validation-error">
            * 注意：当填写保险费时，保险覆盖比例不能超过100%，且保险费不能超过货物总价值的10%
          </div>
        </div>
      </div>

      <a-row :gutter="24">
        <a-col :span="24">
          <div style="text-align: center">
            <a-button type="primary" html-type="submit" style="margin-right: 24px">提交</a-button>
            <a-button @click="resetForm">重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { BigNumber } from "bignumber.js";
import { add, multiply } from "@/utils/bigNumberUtils";
import dayjs, { Dayjs } from "dayjs";

interface CargoItems {
  id: number;
  name: string;
  quantity: number;
  weight: number;
  volume: number;
  type: string;
  fragileHandling: undefined; // 易碎品处理方式
  maxStack: undefined; // 最大堆叠层数
  dangerClass: undefined; // 危险品等级
  unNumber: string; // UN编号
  msds: string[]; // msds文件
}

const formRef = ref();
const formState = reactive({
  trackingNumber: "",
  shipper: "",
  shipperPhone: "",
  consignee: "",
  consigneePhone: "",
  transportType: undefined,
  cargoItems: [
    {
      id: Date.now(),
      name: "",
      quantity: 1,
      weight: 0.5,
      volume: 0.01,
      type: "general",
      fragileHandling: undefined,
      maxStack: undefined,
      dangerClass: undefined,
      unNumber: "",
      msds: [],
    },
  ],
  shipDate: null, // 发货日期
  estimatedArrival: null, // 预计到达日期
  actualArrival: null, // 实际到达日期
  origin: "", // 始发地
  destination: "", // 目的地
  flightNumber: "", // 航班号
  maxWeight: 20000, // 最大载重
  temperatureControl: undefined, //温控要求
  vesselName: "", // 船名
  voyageNumber: "", // 航次
  containerNumber: "", // 集装箱号
  freight: 0, // 运费
  insurance: 0, // 保险费
  customsDuty: 0, // 关税
  totalValue: 0, // 货物总价值
  insuranceCoverage: 0, // 保险覆盖比例
});

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  formRef.value.resetFields();
  // 保留一项货物
  formState.cargoItems = [
    {
      id: Date.now(),
      name: "",
      quantity: 1,
      weight: 0.5,
      volume: 0.01,
      type: "general",
      fragileHandling: undefined,
      maxStack: undefined,
      dangerClass: undefined,
      unNumber: "",
      msds: [],
    },
  ];
};

// 添加货物项
const addCargoItem = () => {
  formState.cargoItems.push({
    id: Date.now(),
    name: "",
    quantity: 1,
    weight: 0.5,
    volume: 0.01,
    type: "general",
    fragileHandling: undefined,
    maxStack: undefined,
    dangerClass: undefined,
    unNumber: "",
    msds: [],
  });
};

// 删除货物项
const removeCargoItem = (id: number) => {
  if (totalCargoItems.value === 1) return;
  const index = formState.cargoItems.findIndex(item => item.id === id);
  formState.cargoItems.splice(index, 1);
};

/* 货物信息校验 */
// 数量校验
const validateQuantity = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("数量不能为空");
  if (Number(value) < 1) return Promise.reject("数量至少为1");
  return Promise.resolve();
};

// 重量校验
const validateWeight = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("重量不能为空");
  if (Number(value) < 0.01) return Promise.reject("重量至少为0.01kg");
  return Promise.resolve();
};

// 体积校验
const validateVolume = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("体积不能为空");
  if (Number(value) < 0.01) return Promise.reject("体积至少为0.01m³");
  return Promise.resolve();
};

// 货物类型变更处理
const handleCargoTypeChange = (item: CargoItems) => {
  // 易碎品
  if (item.type !== "fragile") {
    item.fragileHandling = undefined;
    item.maxStack = undefined;
  }
  // 危险品
  if (item.type !== "danger") {
    item.dangerClass = undefined;
    item.unNumber = "";
    item.msds = [];
  }
};

/* 货物汇总信息 */
// 货物总数
const totalCargoItems = computed(() => {
  return formState.cargoItems.length;
});

// 货物总重量
const totalWeight = computed(() => {
  return formState.cargoItems.reduce((sum, item) => add(sum, multiply(item.weight, item.quantity)), new BigNumber(0));
});

// 货物总体积
const totalVolume = computed(() => {
  return formState.cargoItems.reduce((sum, item) => add(sum, multiply(item.volume, item.quantity)), new BigNumber(0));
});

// 是否含易碎品
const hasDangerousGoods = computed(() => formState.cargoItems.some(item => item.type === "danger"));

// 是否含危险品
const hasFragileGoods = computed(() => formState.cargoItems.some(item => item.type === "fragile"));

/* 运输信息 */
// 发货日期选择限制
const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().subtract(1, "day").endOf("day");
};

// const range = (start: number, end: number) => {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// };

// // 发货时间选择限制
// const disabledDateTime = (current: Dayjs) => {
//   let hour: number, minute: number, second: number;
//   if (current) {
//     hour = dayjs(current).hour();
//     minute = dayjs(current).minute();
//     second = dayjs(current).second();
//   }
//   return {
//     disabledHours: () => range(0, 24).splice(0, hour),
//     disabledMinutes: () => range(0, 60).splice(0, minute),
//     disabledSeconds: () => range(0, 60).splice(0, second),
//   };
// };

// 到达日期选择限制
const disabledEstimatedDate = (current: Dayjs) => {
  if (!formState.shipDate) return true;
  let tooLate = false;
  let tooEarly = false;
  if (formState.transportType === "air") {
    tooLate = current.diff(dayjs(formState.shipDate), "day") > 6;
    tooEarly = current < dayjs(formState.shipDate);
    return tooLate || tooEarly;
  } else if (formState.transportType === "sea") {
    tooLate = current.diff(dayjs(formState.shipDate), "day") > 59;
    tooEarly = current < dayjs(formState.shipDate);
    return tooLate || tooEarly;
  } else {
    return disabledDate(current);
  }
};

// 实际到达日期选择限制
const disabledActualDate = (current: Dayjs) => {
  if (!formState.shipDate) return true;
  return disabledDate(current);
};

// 到达日期校验
const validateEstimatedArrival = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("请选择预计到达日期");
  if (!formState.shipDate) return Promise.reject("请先选择发货日期");
  const shipdayjs = dayjs(formState.shipDate);
  const arrivaldayjs = dayjs(value);
  if (arrivaldayjs < shipdayjs) {
    return Promise.reject("预计到达日期必须在发货日期之后");
  }
  if (formState.transportType === "air" && arrivaldayjs.diff(shipdayjs, "day") > 7) {
    return Promise.reject("航空运输预计到达日期不能超过7天");
  }
  if (formState.transportType === "sea" && arrivaldayjs.diff(shipdayjs, "day") > 60) {
    return Promise.reject("海运预计到达日期不能超过60天");
  }
  return Promise.resolve();
};

// 实际到达日期
const validateActualArrival = (_rule: Rule, value: string) => {
  if (!formState.shipDate) return true;
  if (!value) return Promise.resolve();
  if (!formState.shipDate) return Promise.reject("请先选择发货日期");
  const shipdayjs = dayjs(formState.shipDate);
  const arrivaldayjs = dayjs(value);
  if (arrivaldayjs < shipdayjs) {
    return Promise.reject("实际到达日期不能在发货日期之前");
  }
  if (formState.estimatedArrival && dayjs(value) < dayjs(formState.estimatedArrival)) {
    return Promise.resolve(); // 提前到达是允许的
  }
  return Promise.resolve();
};

const validateAirMaxWeight = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("最大载重不能为空");
  if (new BigNumber(value) < totalWeight.value) {
    return Promise.reject(`最大载重不能小于货物总重量 (${totalWeight.value.toFixed(1)}kg)`);
  }
  return Promise.resolve();
};

/* 费用信息 */
const validateFreight = (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("运费不能为空");
  if (Number(value) < 100) return Promise.reject("运费不能低于100元");
  return Promise.resolve();
};

const validateInsurance = (_rule: Rule, value: string) => {
  // 保险费可选
  if (!value || Number(value) === 0) return Promise.resolve();
  if (Number(value) > formState.totalValue * 0.1) {
    return Promise.reject("保险费不能超过货物总价值的10%");
  }
  return Promise.resolve();
};

const validateCustomsDuty = (_rule: Rule, value: string) => {
  // 关税可选
  if (!value || Number(value) === 0) return Promise.resolve();
  if (Number(value) > formState.totalValue * 0.3) {
    return Promise.reject("关税不能超过货物总价值的30%");
  }
  return Promise.resolve();
};

const validateInsuranceCoverage = (_rule: Rule, value: string) => {
  // 保险覆盖比例可选
  if (!value || Number(value) === 0) return Promise.resolve();
  if (Number(value) > 100) {
    return Promise.reject("保险覆盖比例不能超过100%");
  }
  if (formState.insurance === 0 && Number(value) > 0) {
    return Promise.reject("请先填写保险费");
  }
  return Promise.resolve();
};

// 总费用
const totalCost = computed(() => add(formState.freight, formState.insurance, formState.customsDuty));
</script>
<style lang="less" scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  overflow: hidden;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}
.form-content {
  padding: 24px;
}
.form-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #f0f0f0;
}
.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
.dynamic-item {
  background: #fafafa;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  position: relative;
}
.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.summary-card {
  background: #f9f9f9;
  border-left: 4px solid #1890ff;
  padding: 16px;
  margin-top: 20px;
}
.submit-area {
  text-align: center;
  padding: 24px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
}
.ant-form-item-label label {
  font-weight: 500;
}
.validation-error {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}
.custom-tag {
  display: inline-block;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
}
.danger-tag {
  background: #fff1f0;
  border: 1px solid #ffa39e;
  color: #cf1322;
}
.fragile-tag {
  background: #fff7e6;
  border: 1px solid #ffd591;
  color: #fa8c16;
}
</style>
