<template>
  <div class="indexDiv">
    <LayoutHeader></LayoutHeader>
    <LayoutBody></LayoutBody>
    <LayoutNav></LayoutNav>
  </div>
</template>

<script>
import { toRefs, reactive, watch, inject } from "vue";
import LayoutHeader from "./components/header";
import LayoutBody from "./components/body";
import LayoutNav from "./components/nav";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
export default {
  name: "layout",
  components: { LayoutHeader, LayoutBody, LayoutNav },
  setup() {},
};
</script>
<style scoped>

  .indexDiv {
    position: relative;
  }

</style>
