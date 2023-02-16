<template>
<div class="loginDiv">

  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>

  <h1 >觉 哥 IT资源 网</h1>
  <br/>
  <br/>
  <br/>
  <input style="width: 400px;" placeholder="请输入8位数字建议身份证前后四位" v-model="numbers"/>
  <input placeholder="请输入生日 如0825" v-model="numbersbirthday"/>
  <input placeholder="请输入名字首字母 2-4位" v-model="pwdPart3"/>
  <button @click="isLoginValid" style="color:red;background-color:aquamarine">进入首页</button>

</div>


</template>

<script>
import { toRefs,reactive,watch,inject} from 'vue';
// import { ElInput } from "element-plus";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》'
export default {
  name: 'login',
  setup() {
    var isPwdValid1 = false 
    var isPwdValid2 = false 
    var isPwdValid3 = false 
    
    const pwd = reactive({
      numbers: "",
      birthday: "",
      nameChars: "",
    })

   //监听用户输入 然后校验输入是否符合规则
    watch(()=>pwd.numbers,()=>{
      // if(){

      // }
      console.log('pwd.numbers',pwd.numbers)
    })

    watch(()=>pwd.numbersbirthday,()=>{
      console.log('pwd.birthday',pwd.birthday)
    })

    watch(()=>pwd.pwdPart3,()=>{
      console.log('pwd.nameChars',pwd.nameChars)
    })

    var vm = this

    const $axios = inject('$axios')
    const isLoginValid = ()=>{
      
      // if(isPwdValid1 && isPwdValid2 && isPwdValid3){

        //登录 后台接口判断是否第一次登录 如果是第一次那么先注册再登录
      
        //登录成功后跳转首页
        // let res=await proxy.$axios.post(
        //                     '/user/login',
        //                     { 
        //                       pwd
        //                     })   
        debugger
     
    $axios.post("/hello",{pwd}).then((resp) => {    
      console.log("后端返回结果",resp.data)
      vm.$router.push("/home");
    }).catch((err) => {
      console.log(err)
    })

      }


    return {...toRefs(pwd),isLoginValid}
  }
};
</script>
<style scoped>

.loginDiv {
  height: 100vh;
  background: url("../../image/idea壁纸6.jpg") no-repeat 100%;
  background-size:100% 100%;
  align-content: center;
  /* margin-left: 300px; */
}

input,button{
  height: 100px;
  border-radius: 40%;
  font-family: 'Consolas', Times, serif;
  font-size: 24px;
  text-align: center
}

h1{
  font-size: 80px;
  color: aqua;
  margin-top: 120px;
  /* margin-bottom: 100px; */
}

</style>