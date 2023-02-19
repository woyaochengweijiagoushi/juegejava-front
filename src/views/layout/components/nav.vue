<template>
  <div id = "nav-wrap">
    <h1>nav</h1>

  </div>
</template>

<script>
import { toRefs,reactive,watch,inject} from 'vue';
// import { ElInput } from "element-plus";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
export default {
  // name: 'nav',
  setup() {
  }
};
</script>
<style lang = "scss" scoped>
@import url("../../../styles/config.scss");

  #nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: $navWidth;
    height: 100vh;
    background-color: #344a5f;
}
</style>