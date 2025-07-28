<template>
  <a-form :model="form" ref="formRef" layout="vertical" @finish="handleSubmit" @finishFailed="handleSubmitFailed">
    <!-- 基础信息部分 -->
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
                { pattern: /^[A-Z]{3}\d{10}$/, message: '格式错误: 3位字母+10位数字' },
              ]"
            >
              <a-input v-model:value="form.trackingNumber" placeholder="例如: ABC1234567890" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="托运人" name="shipper" :rules="[{ required: true, message: '托运人不能为空' }]">
              <a-input v-model:value="form.shipper" placeholder="托运人姓名/公司名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="托运人电话"
              name="shipperPhone"
              :rules="[
                { required: true, message: '电话不能为空' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
              ]"
            >
              <a-input v-model:value="form.shipperPhone" placeholder="手机号码" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="收货人" name="consignee" :rules="[{ required: true, message: '收货人不能为空' }]">
              <a-input v-model:value="form.consignee" placeholder="收货人姓名/公司名称" />
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
              <a-input v-model:value="form.consigneePhone" placeholder="手机号码" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="运输方式" name="transportType" :rules="[{ required: true, message: '请选择运输方式' }]">
              <a-select v-model:value="form.transportType" placeholder="请选择运输方式">
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

    <!-- 货物信息部分 -->
    <div class="card">
      <div class="card-title">
        货物信息
        <a-button type="dashed" @click="addCargoItem" style="margin-left: 12px"> <plus-outlined /> 添加货物 </a-button>
      </div>
      <div class="form-content">
        <div v-for="(item, index) in form.cargoItems" :key="item.id" class="dynamic-item">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item
                :label="`货物名称 ${index + 1}`"
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
                :rules="[{ required: true, message: '数量不能为空' }, { validator: validateQuantity }]"
              >
                <a-input-number v-model:value="item.quantity" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="重量 (kg)"
                :name="['cargoItems', index, 'weight']"
                :rules="[{ required: true, message: '重量不能为空' }, { validator: validateWeight }]"
              >
                <a-input-number v-model:value="item.weight" :min="0.1" :step="0.1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="体积 (m³)"
                :name="['cargoItems', index, 'volume']"
                :rules="[{ required: true, message: '体积不能为空' }, { validator: validateVolume }]"
              >
                <a-input-number v-model:value="item.volume" :min="0.01" :step="0.01" style="width: 100%" />
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
                  <a-upload v-model:file-list="item.msds" :before-upload="beforeUpload" accept=".pdf,.doc,.docx">
                    <a-button> <upload-outlined /> 上传文件 </a-button>
                  </a-upload>
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <a-button class="remove-btn" type="text" danger @click="removeCargoItem(item.id)">
            <delete-outlined />
          </a-button>
        </div>

        <!-- 货物总览 -->
        <div class="summary-card">
          <a-row :gutter="16">
            <a-col :span="6">
              <div>
                货物总数: <strong>{{ totalCargoItems }}</strong> 项
              </div>
            </a-col>
            <a-col :span="6">
              <div>
                总重量: <strong>{{ totalWeight.toFixed(2) }} kg</strong>
              </div>
            </a-col>
            <a-col :span="6">
              <div>
                总体积: <strong>{{ totalVolume.toFixed(3) }} m³</strong>
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

    <!-- 运输信息部分 -->
    <div class="card">
      <div class="card-title">运输信息</div>
      <div class="form-content">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="发货日期" name="shipDate" :rules="[{ required: true, message: '请选择发货日期' }]">
              <a-date-picker v-model:value="form.shipDate" style="width: 100%" :disabled-date="disabledShipDate" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="预计到达日期"
              name="estimatedArrival"
              :rules="[{ required: true, message: '请选择预计到达日期' }, { validator: validateEstimatedArrival }]"
            >
              <a-date-picker
                v-model:value="form.estimatedArrival"
                style="width: 100%"
                :disabled-date="disabledEstimatedArrival"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="实际到达日期" name="actualArrival" :rules="[{ validator: validateActualArrival }]">
              <a-date-picker
                v-model:value="form.actualArrival"
                style="width: 100%"
                :disabled-date="disabledActualArrival"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="始发地" name="origin" :rules="[{ required: true, message: '始发地不能为空' }]">
              <a-input v-model:value="form.origin" placeholder="始发地详细地址" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="目的地" name="destination" :rules="[{ required: true, message: '目的地不能为空' }]">
              <a-input v-model:value="form.destination" placeholder="目的地详细地址" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 运输方式特定字段 -->
        <div v-if="form.transportType === 'air'" class="form-section">
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
                <a-input v-model:value="form.flightNumber" placeholder="例如: CA1234" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="最大载重 (kg)"
                name="maxWeight"
                :rules="[{ required: true, message: '最大载重不能为空' }, { validator: validateAirMaxWeight }]"
              >
                <a-input-number v-model:value="form.maxWeight" :min="100" :step="10" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="温控要求" name="temperatureControl">
                <a-select v-model:value="form.temperatureControl" placeholder="选择温控要求">
                  <a-select-option value="none">无</a-select-option>
                  <a-select-option value="cool">冷藏 (2-8°C)</a-select-option>
                  <a-select-option value="freeze">冷冻 (-18°C以下)</a-select-option>
                  <a-select-option value="ambient">常温 (15-25°C)</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div v-if="form.transportType === 'sea'" class="form-section">
          <h3>海运信息</h3>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="船名" name="vesselName" :rules="[{ required: true, message: '船名不能为空' }]">
                <a-input v-model:value="form.vesselName" placeholder="船名" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="航次" name="voyageNumber" :rules="[{ required: true, message: '航次不能为空' }]">
                <a-input v-model:value="form.voyageNumber" placeholder="航次编号" />
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
                <a-input v-model:value="form.containerNumber" placeholder="例如: ABCD1234567" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <!-- 费用信息部分 -->
    <div class="card">
      <div class="card-title">费用信息</div>
      <div class="form-content">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item
              label="运费 (¥)"
              name="freight"
              :rules="[{ required: true, message: '运费不能为空' }, { validator: validateFreight }]"
            >
              <a-input-number v-model:value="form.freight" :min="0" :step="100" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="保险费 (¥)" name="insurance" :rules="[{ validator: validateInsurance }]">
              <a-input-number v-model:value="form.insurance" :min="0" :step="50" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="关税 (¥)" name="customsDuty" :rules="[{ validator: validateCustomsDuty }]">
              <a-input-number v-model:value="form.customsDuty" :min="0" :step="100" style="width: 100%" />
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
              <a-input-number v-model:value="form.totalValue" :min="0" :step="1000" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="保险覆盖比例"
              name="insuranceCoverage"
              :rules="[{ validator: validateInsuranceCoverage }]"
            >
              <a-input-number
                v-model:value="form.insuranceCoverage"
                :min="0"
                :max="100"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
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

        <div v-if="form.insurance > 0" class="validation-error">
          * 注意：当填写保险费时，保险覆盖比例不能超过100%，且保险费不能超过货物总价值的10%
        </div>
      </div>
    </div>

    <div class="submit-area">
      <a-button type="primary" size="large" html-type="submit" :loading="submitting"> 提交运单 </a-button>
      <a-button style="margin-left: 16px" @click="resetForm"> 重置表单 </a-button>
    </div>
  </a-form>
</template>
<script lang="js" setup>
import dayjs from "dayjs";
import { ref, reactive, computed } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
const formRef = ref(null);
const submitting = ref(false);

// 表单数据模型
const form = reactive({
  trackingNumber: "",
  shipper: "",
  shipperPhone: "",
  consignee: "",
  consigneePhone: "",
  transportType: undefined,
  cargoItems: [
    {
      id: ref(Date.now()),
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
  shipDate: null,
  estimatedArrival: null,
  actualArrival: null,
  origin: "",
  destination: "",
  flightNumber: "",
  maxWeight: 20000,
  temperatureControl: undefined,
  vesselName: "",
  voyageNumber: "",
  containerNumber: "",
  freight: 0,
  insurance: 0,
  customsDuty: 0,
  totalValue: 0,
  insuranceCoverage: 0,
});

// 计算属性
const totalCargoItems = computed(() => form.cargoItems.length);
const totalWeight = computed(() => form.cargoItems.reduce((sum, item) => sum + item.weight * item.quantity, 0));
const totalVolume = computed(() => form.cargoItems.reduce((sum, item) => sum + item.volume * item.quantity, 0));
const hasDangerousGoods = computed(() => form.cargoItems.some(item => item.type === "danger"));
const hasFragileGoods = computed(() => form.cargoItems.some(item => item.type === "fragile"));
const totalCost = computed(() => form.freight + form.insurance + form.customsDuty);

// 添加货物项
const addCargoItem = () => {
  form.cargoItems.push({
    id: ref(Date.now()),
    name: "",
    quantity: 1,
    weight: 0.5,
    volume: 0.01,
    type: "general",
  });
};

// 移除货物项
const removeCargoItem = id => {
  if (form.cargoItems.length <= 1) {
    message.warning("至少需要保留一项货物");
    return;
  }
  const index = form.cargoItems.findIndex(item => item.id === id);
  if (index !== -1) {
    form.cargoItems.splice(index, 1);
  }
};

// 货物类型变更处理
const handleCargoTypeChange = item => {
  // 重置特殊货物相关字段
  if (item.type !== "fragile") {
    item.fragileHandling = undefined;
    item.maxStack = undefined;
  }
  if (item.type !== "danger") {
    item.dangerClass = undefined;
    item.unNumber = "";
    item.msds = [];
  }
};

// 上传前校验
const beforeUpload = file => {
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error("文件大小不能超过5MB!");
    return false;
  }
  return true;
};

// 日期禁用逻辑
const disabledShipDate = current => {
  return current && current < dayjs().startOf("day");
};

const disabledEstimatedArrival = current => {
  if (!form.shipDate) return true;
  const minDate = dayjs(form.shipDate).add(1, "days");
  const maxDate = dayjs(form.shipDate).add(60, "days");
  return current && (current < minDate || current > maxDate);
};

const disabledActualArrival = current => {
  if (!form.shipDate) return true;
  return current && current < dayjs(form.shipDate);
};

// 自定义校验方法
const validateQuantity = (rule, value) => {
  if (!value) return Promise.reject("数量不能为空");
  if (value < 1) return Promise.reject("数量至少为1");
  return Promise.resolve();
};

const validateWeight = (rule, value) => {
  if (!value) return Promise.reject("重量不能为空");
  if (value < 0.01) return Promise.reject("重量至少为0.01kg");
  return Promise.resolve();
};

const validateVolume = (rule, value) => {
  if (!value) return Promise.reject("体积不能为空");
  if (value < 0.001) return Promise.reject("体积至少为0.001m³");
  return Promise.resolve();
};

const validateEstimatedArrival = (rule, value) => {
  if (!value) return Promise.reject("请选择预计到达日期");
  if (!form.shipDate) return Promise.reject("请先选择发货日期");

  const shipdayjs = dayjs(form.shipDate);
  const arrivaldayjs = dayjs(value);

  if (arrivaldayjs.isSameOrBefore(shipdayjs)) {
    return Promise.reject("预计到达日期必须在发货日期之后");
  }

  // 根据运输方式校验时间范围
  if (form.transportType === "air" && arrivaldayjs.diff(shipdayjs, "days") > 7) {
    return Promise.reject("航空运输预计到达日期不能超过7天");
  }

  if (form.transportType === "sea" && arrivaldayjs.diff(shipdayjs, "days") > 60) {
    return Promise.reject("海运预计到达日期不能超过60天");
  }

  return Promise.resolve();
};

const validateActualArrival = (rule, value) => {
  if (!value) return Promise.resolve(); // 实际到达日期可选

  if (!form.shipDate) return Promise.reject("请先选择发货日期");
  if (dayjs(value).isBefore(dayjs(form.shipDate))) {
    return Promise.reject("实际到达日期不能在发货日期之前");
  }

  if (form.estimatedArrival && dayjs(value).isBefore(dayjs(form.estimatedArrival))) {
    return Promise.resolve(); // 提前到达是允许的
  }

  return Promise.resolve();
};

const validateAirMaxWeight = (rule, value) => {
  if (!value) return Promise.reject("最大载重不能为空");
  if (value < totalWeight.value) {
    return Promise.reject(`最大载重不能小于货物总重量 (${totalWeight.value.toFixed(1)}kg)`);
  }
  return Promise.resolve();
};

const validateFreight = (rule, value) => {
  if (!value) return Promise.reject("运费不能为空");
  if (value < 100) return Promise.reject("运费不能低于100元");
  return Promise.resolve();
};

const validateInsurance = (rule, value) => {
  // 保险费可选
  if (!value || value === 0) return Promise.resolve();

  if (value > form.totalValue * 0.1) {
    return Promise.reject("保险费不能超过货物总价值的10%");
  }

  return Promise.resolve();
};

const validateCustomsDuty = (rule, value) => {
  // 关税可选
  if (!value || value === 0) return Promise.resolve();

  if (value > form.totalValue * 0.3) {
    return Promise.reject("关税不能超过货物总价值的30%");
  }

  return Promise.resolve();
};

const validateInsuranceCoverage = (rule, value) => {
  // 保险覆盖比例可选
  if (!value || value === 0) return Promise.resolve();

  if (value > 100) {
    return Promise.reject("保险覆盖比例不能超过100%");
  }

  if (form.insurance === 0 && value > 0) {
    return Promise.reject("请先填写保险费");
  }

  return Promise.resolve();
};

// 表单提交
const handleSubmit = values => {
  submitting.value = true;

  // 模拟API请求
  setTimeout(() => {
    submitting.value = false;
    message.success("运单提交成功！");
    console.log("提交数据:", values);
  }, 1500);
};

const handleSubmitFailed = ({ errorFields }) => {
  console.log("提交失败:", errorFields);
  message.error("表单校验失败，请检查输入");
};

// 重置表单
const resetForm = () => {
  formRef.value.resetFields();
  // 保留一项货物
  form.cargoItems = [
    {
      id: ref(Date.now()),
      name: "",
      quantity: 1,
      weight: 0.5,
      volume: 0.01,
      type: "general",
    },
  ];
};
</script>
<style lang="less" scoped>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  padding: 20px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.header {
  background: linear-gradient(135deg, #1890ff 0%, #0050b3 100%);
  color: white;
  padding: 20px 30px;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
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
