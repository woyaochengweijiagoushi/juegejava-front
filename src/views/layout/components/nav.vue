<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo side-navi w-56 fixed top-0 left-0 h-screen"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <router-link to="/goHome">Go to Home</router-link>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span><router-link to="/navigatorTwo">Navigator Two</router-link></span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span
        ><router-link to="/navigatorThree">Navigator Three</router-link></span
      >
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span><router-link to="/">Navigator Four</router-link></span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import httpClient from "@/api/http";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.side-navi {
  border-right: 1px solid #f0f0f0;
}
</style>
