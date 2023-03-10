<template>
  <el-dialog
    title="导入"
    width="500px"
    v-model="portalService.upload"
    destroy-on-close="true"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="上传excel" name="upload">
        <div style="text-align: center; margin-top: 20px">
          <el-upload
            class="upload-demo"
            drag
            :on-remove="removeFile"
            :on-change="onFileUpload"
            :on-error="uploadErr"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </div></el-tab-pane
      >
      <el-tab-pane label="手动填写" name="manual"><div></div></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useInjectPortalSerivce } from "@/hooks/portalService";
import { ElMessage, ElMessageBox } from "element-plus";
import Vue, { reactive, onMounted, ref } from "vue";
import xlsxWorker from "./xlsx.worker.js";
const workerRef = ref();

const activeName = ref("upload");

onMounted(() => {
  const xlsxParseWorker = new xlsxWorker();

  xlsxParseWorker.onmessage = (e) => {
    console.error(e);
  };

  workerRef.value = xlsxParseWorker;
});

const onFileUpload = (e) => {
  if (e.status === "ready") {
    workerRef.value.postMessage(e.raw);
  }
};

const portalService = useInjectPortalSerivce();

const uploadErr = (err, file, fileList) => {
  ElMessage.error("上传失败");
};

const removeFile = (file, fileList) => {
  console.log("文件删除");
};
</script>

<style scoped></style>
