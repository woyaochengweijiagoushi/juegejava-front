<template>
<div id = "body-wrap"></div>
  <h1>main</h1>
    <router-view></router-view>
</template>

<script>
import { toRefs,reactive,watch,inject} from 'vue';
// import { ElInput } from "element-plus";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
export default {
 
};
</script>
<style lang = "scss" scoped>
@import url("../../../styles/config.scss");

 #body-wrap {
    position: fixed;
    top: 75px;
    right: 0;
    left: $navWidth;
    bottom: 0;
    border: 3px solid #f7f7f7;
    border-bottom: none;
    box-sizing: border;
}
</style>