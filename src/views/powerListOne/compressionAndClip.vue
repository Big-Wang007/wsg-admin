<template>
  <div class="compression-clip">
    <div>
      <h3>图片上传和压缩</h3>
      <div style="margin-bottom: 24px">
        <p v-if="beforeSize">
          图片压缩前大小：<strong>{{ beforeSize }}</strong>
        </p>
        <p v-if="afterSize">
          图片压缩后大小：<strong>{{ afterSize }}</strong>
        </p>
        <div style="width: 500px; height: 400px; display: flex; align-items: center">
          <a-image v-for="file of fileSrcList" :src="file" />
        </div>
      </div>
      <a-upload :file-list="fileList" list-type="text" :before-upload="beforeUpload" @remove="handleRemove">
        <a-button v-if="fileList.length < 1"> <plus-outlined /> Upload </a-button>
      </a-upload>
    </div>
    <div>
      <croppedImage />
    </div>
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import Compressor from "compressorjs";

const croppedImage = defineAsyncComponent(() => import("@/components/imageCropper.vue"));

const fileList = ref([]);
const fileSrcList = ref([]);
const beforeSize = ref();
const afterSize = ref();

const handleRemove = () => {
  fileList.value.length = 0;
  fileSrcList.value.length = 0;
  beforeSize.value = 0;
  afterSize.value = 0;
};

const beforeUpload = async file => {
  console.log("压缩前大小：", file.size);
  beforeSize.value = file.size;
  compressImage(file);
  return false;
};

const compressImage = async file => {
  new Compressor(file, {
    quality: 0.6, // 压缩质量，数值范围0-1
    success: compressedFile => {
      // 压缩后的文件处理，例如上传到服务器
      fileList.value = [...(fileList.value || []), compressedFile];
      fileSrcList.value = [...(fileSrcList.value || []), URL.createObjectURL(compressedFile)];

      console.log("压缩后大小：", compressedFile.size);
      afterSize.value = compressedFile.size;
    },
    error(err) {
      console.error("压缩失败", err.message);
    },
  });
};
</script>
<style lang="less" scoped>
.compression-clip {
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  & > div {
    flex: 0 0 50%;
  }
}
</style>
