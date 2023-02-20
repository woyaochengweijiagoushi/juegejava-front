<template>
  <div class="form">
    <div>
    <el-form :model="form" label-width="120px" class="form">
    <el-form-item label="前端 or 后端">
      <el-radio-group v-model="form.resource">
        <el-radio label="前端" />
        <el-radio label="后端" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="标签">
    <el-select
      v-model="form.ages"
      placeholder="请选择"
      multiple
      style="width: 320px;"
    >
      <el-option
        v-for="item in ageList"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>

    </el-form-item>
    <el-form-item label="免费">
      <el-switch v-model="form.delivery" />
    </el-form-item>

    <el-form-item label="已解锁">
      <el-switch v-model="form.delivery" />
    </el-form-item>


    <el-form-item label="资源类型">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="电子书" name="type" />
        <el-checkbox label="官方文档" name="type" />
        <el-checkbox label="面试题" name="type" />
        <el-checkbox label="学习视频" name="type" />
        <el-checkbox label="面试题录音" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button>上传</el-button>
    </el-form-item>
  </el-form>
</div>

      <div class="container">
      <el-table :data="batchTableData" height="565"
                :cell-style="{padding: '2px 0'}" class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="selectChanges">
        <el-table-column type="selection" width="40"/>
        <el-table-column prop="allNum" label="资源简介" >
          <template #default="scope">{{ scope.row.allNum }}</template>
        </el-table-column>
        <el-table-column prop="toBeSent" label="资源大小"  >
          <template #default="scope">{{ scope.row.toBeSent }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="资源平均评分"  >
          <template #default="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column prop="batchNo2" label="资源链接"   v-if="true">
          <template #default="scope">{{ scope.row.batchNo2 }}</template>
        </el-table-column>
        <el-table-column prop="batchNo3" label="所属网盘"   v-if="true">
          <template #default="scope">{{ scope.row.batchNo3 }}</template>
        </el-table-column>
        <el-table-column prop="batchNo4" label="是否已失效"   v-if="true">
          <template #default="scope">{{ scope.row.batchNo4 }}</template>
        </el-table-column>
        <el-table-column prop="batchNo" label="提取码"   v-if="true">
          <template #default="scope">{{ scope.row.batchNo }}</template>
        </el-table-column>
        <el-table-column label="操作" >
            <template #default="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看详情
              <el-button type="primary">解锁</el-button>
              <el-button type="primary" @click="goExcel">评分(已解锁资源可评分)</el-button>
              </el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination background layout="total, prev, pager, next" :current-page="queryBatch.page"
                       :page-size="queryBatch.size" :total="pageTotalBatch" @current-change="handlePageChangeBatch"></el-pagination>
      </div>

    </div>

    <el-dialog v-model="batchFriends" title="好友列表" width="70%" :before-close="handleClose">
      <el-input v-model="query.mobile" placeholder="客户号码" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-table :data="tableData" height="565" style="margin-top:20px"
                :cell-style="{padding: '2px 0'}" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="selectChanges">
        <el-table-column type="selection" width="40"/>
        <el-table-column prop="area" label="客户手机号码" width="150" >
          <template #default="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column prop="area_in" label="客户备注" width="100" >
          <template #default="scope">{{ scope.row.cust_mark }}</template>
        </el-table-column>
        <el-table-column label="发送内容" >
          <template #default="scope">{{ scope.row.send_content }}</template>
        </el-table-column>
        <el-table-column label="托管手机号码" width="150" >
          <template #default="scope">{{ scope.row.trust_mobile }}</template>
        </el-table-column>
        <el-table-column label="导入时间" width="200" >
          <template #default="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="状态"  width="150" >
          <template #default="scope">
            <el-tag>{{ scope.row.state === '1'?'待添加':
              scope.row.state === '2'?'待用户接受请求':
              scope.row.state === '3'?'已添加':
              scope.row.state === '4'?'该用户不存在':
              scope.row.state === '5'?'已经是用户':
              scope.row.state}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                       :page-size="query.size" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="导入" v-model="addVisible" width="500px"  v-if="addVisible">
      <div style="text-align: center;margin-top: 20px">
        <el-upload
                class="upload-demo"
                drag
                :action="url"
                :data="addParams"
                :on-success="uploadSuc"
                :on-remove="removeFile"
                :on-error="uploadErr">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>


<!-- //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》' -->
<script>
  import { ref, reactive, toRefs } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  // import {FL_SERVICE} from "../../api/config";
  // import {
  //   queryAddCustlist,
  //   addCustlistAft,
  //   queryBatchList,
  // } from "../../api/apiIndex";
  // import {
  //   REQ_SUCCESS_GET
  // } from "../../assets/js/commonConfig";


  export default {
    name: "addCustlist",
    data(){
      return{
      }
    },
    methods:{
      goExcel(){
        this.$router.push({path:'/ExcelAdds'})
      }
    },
    setup() {
      const addParams = reactive({
        reqTicket: sessionStorage.getItem("reqClientTicket")
      });
      // 批次数据列表 -------------------------
      const beginTime = ref('')
      const endTime = ref('')
      const batchFriends = ref(false)
      const handleClose = () =>{
        batchFriends.value = false;
        query.mobile = '';
        tableData.value = null;

      }
      const batchNo = ref('')
      const handleEdit = (index,row) => {
        batchFriends.value = true;
        batchNo.value = row.batchNo;
        console.log(batchNo.value);
        getData();
      }
      const batchTableData = ref([])
      // 查询操作(批次列表)
      const handleSearchBatch = () => {
        queryBatch.page = 1;
        getBatchTableData();
      };
      // 重置
      const resetSearch = () =>{
          beginTime.value = '';
          endTime.value = '';
          handleSearchBatch();
      }
      // 分页导航(批次列表)
      const handlePageChangeBatch = (val) => {
        queryBatch.page = val;
        getBatchTableData();
      };
      const queryBatch = reactive({
        flag:0,
        page:1,
        size:50,
        clientId:'',
        state:'',
        hasMsg:'',
        markState:''
      });
      const pageTotalBatch = ref(0);
      // const getBatchTableData = () =>{
      //   queryBatchList({
      //     flag:queryBatch.flag,
      //     page:queryBatch.page,
      //     size:queryBatch.size,
      //     state:queryBatch.state,
      //     hasMsg:queryBatch.hasMsg,
      //     markState:queryBatch.markState,
      //     reqTicket:addParams.reqTicket,
      //     beginTime:(beginTime.value?beginTime.value.format("yyyy-MM-dd"):''),
      //     endTime:(endTime.value?endTime.value.format("yyyy-MM-dd"):'')
      //   },res => {
      //     console.log(res);
      //     if(res.retCode == REQ_SUCCESS_GET){
      //       if(res.body.total != null){
      //         pageTotalBatch.value = res.body.total;
      //       }
      //       batchTableData.value = res.body.list;
      //     }else {
      //       ElMessage.error(res.retMsg);
      //     }
      //   },err => {
      //     ElMessage.error('查询异常');
      //     console.log(err);
      //   })
      // }
      // getBatchTableData();
      // 批次数据列表 -------------------------

      const query = reactive({
        flag:0,
        page:1,
        size:100,
        clientId:'',
        state:'',
        mobile:'',
        hasMsg:'',
        markState:''
      });

      const tableData = ref([]);
      const pageTotal = ref(0);
      // const url = ref(FL_SERVICE + "/qwAddCustlist/excelAdd")

      // 获取表格数据
      const getData = () =>{
        queryAddCustlist({
          flag:query.flag,
          page:query.page,
          size:query.size,
          state:query.state,
          mobile:query.mobile,
          hasMsg:query.hasMsg,
          markState:query.markState,
          reqTicket:addParams.reqTicket,
          batchNo:batchNo.value
        },res => {
          console.log(res);
          if(res.retCode == REQ_SUCCESS_GET){
            if(res.body.total != null){
              pageTotal.value = res.body.total;
            }
            tableData.value = res.body.list;
          }else {
            ElMessage.error(res.retMsg);
          }
        },err => {
          ElMessage.error('查询异常');
          console.log(err);
        })
      }

      // 查询操作
      const handleSearch = () => {
        query.page = 1;
        getData();
      };
      // 分页导航
      const handlePageChange = (val) => {
        query.page = val;
        getData();
      };

      const addVisible = ref(false);

      let form = reactive({
        id:"",
        name: "",
        isBackToCenter:""
      });
      let idx = -1;

      const selectChanges = (val) => {
        val.forEach(item =>{
          console.log(item.id)
        })
        // queryStoreInfo.selected = val;
      };

      const uploadSuc = (response,file,fileList) =>{
        console.log(response);
        if(response.retCode == REQ_SUCCESS_GET){
          ElMessage.success(response.body);
          addVisible.value = false;
          removeFile();
          importAfter();
          handleSearchBatch();
        }else{
          ElMessage.error(response.retMsg);
        }
      }

      const uploadErr = (err,file,fileList) =>{
        console.log(err);
        ElMessage.error("上传失败");
      }

      const removeFile = (file, fileList) =>{
        console.log("文件删除");
      }

      let idxx = -1;

      const downloadUrl = ref(process.env.BASE_URL +'/excelDemo.xlsx')
      const ExcelAddUrl = ref(process.env.BASE_URL +'/ExcelAdds')
      console.log(ExcelAddUrl.value);

      const importAfter = () =>{
        console.log("导入成功后调用此接口");
        addCustlistAft({
        },res => {
          console.log(res);
          console.log("调用结果：" + res.body);
        },err => {
          console.log(err);
        })
      }

      const state = reactive({
        ageList: ["全部", "jvm", "并发", "vue", "typescript"],
        form1: {
          ages: [],
        },
      });

      const { ageList, form1 } = toRefs(state);


      return {
        query,
        tableData,
        pageTotal,
        addVisible,
        form,
        // url,
        // downloadUrl,
        addParams,
        handleSearch,
        handlePageChange,
        selectChanges,
        uploadSuc,
        uploadErr,
        removeFile,
        importAfter,
        ExcelAddUrl,
        batchFriends,
        handleClose,
        beginTime,
        endTime,
        batchTableData,
        handleEdit,
        handleSearchBatch,
        handlePageChangeBatch,
        // getBatchTableData,
        queryBatch,
        pageTotalBatch,
        resetSearch,
        ageList,
        form1
      };
    },
  };
</script>

<style scoped>
@import url("../../styles/config.scss");

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    /* left: 200px; */
    font-size: 14px;
  }
  table tbody::-webkit-scrollbar {
    width: 6px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    width: 300px;
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

  .container {
    /* align-content: center; */
    /* padding-left: 200px; */
  }


  .form {
    padding:20px  300px;
  }

</style>