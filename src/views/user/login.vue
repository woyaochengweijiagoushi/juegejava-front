<template>
  <div class="loginDiv h-screen pt-56 flex flex-col justify-start items-center">
    <h1>觉 哥 IT资源 网</h1>
    <el-form class="loginForm p-10">
      <el-input
        placeholder="请输入8位数字建议身份证前后四位"
        v-model="numbers"
        class="pb-6"
      />
      <el-input
        class="pb-6"
        placeholder="请输入生日 如0825"
        v-model="numbersbirthday"
      />
      <el-input
        class="pb-6"
        placeholder="请输入名字首字母 2-4位"
        v-model="pwdPart3"
      />
      <div class="flex flex-row justify-between item-center">
        <el-button class="w-5/12" @click="isLoginValid"> 进入首页 </el-button>
        <el-button @click="isLoginValid" class="w-5/12"> 注册 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { toRefs, reactive, watch, inject } from "vue";
import { useRouter } from "vue-router";
// import { ElInput } from "element-plus";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
export default {
  name: "login",
  setup() {
    var isPwdValid1 = false;
    var isPwdValid2 = false;
    var isPwdValid3 = false;

    const pwd = reactive({
      numbers: "",
      birthday: "",
      nameChars: "",
    });

    //监听用户输入 然后校验输入是否符合规则
    watch(
      () => pwd.numbers,
      () => {
        // if(){

        // }
        console.log("pwd.numbers", pwd.numbers);
      }
    );

    watch(
      () => pwd.numbersbirthday,
      () => {
        console.log("pwd.birthday", pwd.birthday);
      }
    );

    watch(
      () => pwd.pwdPart3,
      () => {
        console.log("pwd.nameChars", pwd.nameChars);
      }
    );

    const $axios = inject("$axios");
    var router = useRouter();
    const isLoginValid = () => {
      // if(isPwdValid1 && isPwdValid2 && isPwdValid3){

      //登录 后台接口判断是否第一次登录 如果是第一次那么先注册再登录

      //登录成功后跳转首页
      // let res=proxy.$axios.post(
      //                     '/user/login',
      //                     {
      //                       pwd
      //                     })
      // debugger;

      router.push("main");
      // $axios.post("/hello",{pwd}).then((resp) => {
      //   console.log("后端返回结果",resp.data)
      //   vm.$router.push("/index");
      // }).catch((err) => {
      //   console.log(err)
      // })
    };

    return { ...toRefs(pwd), isLoginValid };
  },
};
</script>
<style scoped>
.loginDiv {
  background: url("../../image/idea壁纸6.jpg") no-repeat 100%;
  background-size: 100% 100%;
}

.loginForm {
  width: 530px;
  backdrop-filter: blur(3px);
}

h1 {
  font-size: 80px;
  color: aqua;
  /* margin-bottom: 100px; */
}
</style>
