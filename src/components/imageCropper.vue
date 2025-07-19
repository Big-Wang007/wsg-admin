<template>
  <div>
    <a-upload :show-upload-list="false" :before-upload="beforeUpload">
      <a-button> <plus-outlined /> Upload </a-button>
    </a-upload>
    <div class="cropper-container" style="width: 500px; height: 400px"></div>
    <!-- 操作按钮 -->
    <a-space>
      <a-button :icon="h(ZoomInOutlined)" @click="handleZoom(1)"></a-button>
      <a-button :icon="h(ZoomOutOutlined)" @click="handleZoom(0)"></a-button>
      <a-button :icon="h(LeftOutlined)" @click="handleMove('left')"></a-button>
      <a-button :icon="h(RightOutlined)" @click="handleMove('right')"></a-button>
      <a-button :icon="h(UpOutlined)" @click="handleMove('top')"></a-button>
      <a-button :icon="h(DownOutlined)" @click="handleMove('bottom')"></a-button>
      <a-button :icon="h(SwapOutlined)" @click="handleScale('horizontal')"></a-button>
      <a-button :icon="h(SwapOutlined)" style="transform: rotate(90deg)" @click="handleScale('vertical ')"></a-button>
      <a-button :icon="h(ScissorOutlined)" @click="handleCropped"></a-button>
    </a-space>
    <div v-if="croppedImage">
      <h4>裁剪结果：</h4>
      <img :src="croppedImage" style="max-width: 200px" />
    </div>
  </div>
</template>

<script setup>
import { h, ref, shallowRef, nextTick, onBeforeUnmount } from "vue";
import Cropper from "cropperjs";
import {
  PlusOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
  SwapOutlined,
  ScissorOutlined,
} from "@ant-design/icons-vue";

const croppedImage = ref("");
const cropperInstance = shallowRef(null);
let cropperImageRef = null;
let cropperSelectionRef = null;

// 初始化 Cropper
const initCropper = imgSrc => {
  if (!cropperInstance.value) {
    const image = new Image();
    image.src = imgSrc;
    image.alt = "Picture";
    cropperInstance.value = new Cropper(image, {
      container: ".cropper-container",
    });
    cropperImageRef = cropperInstance.value.getCropperImage();
    cropperSelectionRef = cropperInstance.value.getCropperSelection();
  } else {
    cropperImageRef.src = imgSrc;
  }
};

// 处理文件上传
const beforeUpload = file => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    nextTick(initCropper(event.target.result)); // DOM更新后初始化
  };
  reader.readAsDataURL(file);
  return false;
};

// 裁剪图片
const handleCropped = () => {
  if (!cropperSelectionRef) return;
  cropperSelectionRef.$toCanvas().then(res => {
    croppedImage.value = res.toDataURL("image/jpeg"); // 输出为 JPEG
  });
};

// 缩放图片
const handleZoom = num => {
  if (num > 0) {
    cropperImageRef.$zoom(0.1);
  } else {
    cropperImageRef.$zoom(-0.1);
  }
};

// 移动图片
const handleMove = direction => {
  if (direction === "left") {
    cropperImageRef.$move(-1, 0);
  } else if (direction === "right") {
    cropperImageRef.$move(1, 0);
  } else if (direction === "top") {
    cropperImageRef.$move(0, -1);
  } else if (direction === "bottom") {
    cropperImageRef.$move(0, 1);
  }
};

// 水平/垂直翻转
const handleScale = type => {
  if (type === "horizontal") {
    cropperImageRef.$scale(-1, 1);
  } else {
    cropperImageRef.$scale(1, -1);
  }
};

// 销毁实例
onBeforeUnmount(() => {
  if (cropperInstance.value) {
    cropperInstance.value = null;
  }
});
</script>

<style lang="less" scoped>
.cropper-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1.25rem 1.5rem;

  :deep(cropper-canvas) {
    height: 360px;
  }
}
</style>
