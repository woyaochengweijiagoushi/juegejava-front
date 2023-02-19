<template>
<div id = "header-wrap">
    <h1>header</h1>

</div>
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

 #header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navWidth;
    height: 75px;
    background-color: #fff;
    box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1)
}


</style>