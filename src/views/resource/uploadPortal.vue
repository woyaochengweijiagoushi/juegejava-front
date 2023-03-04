<template>
  <el-dialog title="导入" width="500px" v-model="portalService.upload">
    <div style="text-align: center; margin-top: 20px">
      <el-upload class="upload-demo" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useInjectPortalSerivce } from "@/hooks/portalService";
import { ElMessage, ElMessageBox } from "element-plus";
import Vue, { reactive } from "vue";

const portalService = useInjectPortalSerivce();
</script>

<style scoped></style>
