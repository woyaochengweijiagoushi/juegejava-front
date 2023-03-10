<template>
  <div class="form flex flex-col justify-start items-stretch">
    <div class="flex flex-row justify-center items-center">
      <div class="inline-flex flex-col justify-start items-start">
        <el-form
          :model="form"
          class="form"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="大分类">
            <el-radio-group v-model="form.frontendOrBackend">
              <el-radio label="前端" />
              <el-radio label="后端" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="标签">
            <el-select
              v-model="form.tag"
              placeholder="请选择"
              multiple
              style="width: 320px"
            >
              <el-option
                v-for="item in tags"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="免费">
            <el-switch v-model="form.forFree" />
          </el-form-item>

          <el-form-item label="已解锁">
            <el-switch v-model="form.unlocked" />
          </el-form-item>

          <el-form-item label="资源类型">
            <el-checkbox-group
              v-model="form.checkedTypes"
              @change="handleCheckedTypesChange"
            >
              <el-checkbox v-for="type in types" :key="type" :label="type">{{
                type
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">查询</el-button>
            <el-button @click="() => (portalService.upload = true)"
              >上传</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <upload-portal />
    <el-table
      :data="batchTableData"
      height="565"
      :cell-style="{ padding: '2px 0' }"
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="selectChanges"
    >
      <el-table-column type="selection" width="40" />
      <el-table-column prop="description" label="资源简介">
        <template #default="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column prop="resourceSize" label="资源大小">
        <template #default="scope">{{ scope.row.resourceSize }}</template>
      </el-table-column>
      <el-table-column prop="score" label="资源最近10次评分">
        <template #default="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column prop="linkStr" label="资源链接" v-if="true">
        <template #default="scope"
          ><a :href="scope.row.linkStr">{{ scope.row.linkStr }}</a></template
        >
      </el-table-column>
      <el-table-column prop="isActive" label="是否已失效" v-if="true">
        <template #default="scope">{{ scope.row.isActive }}</template>
      </el-table-column>
      <el-table-column prop="extractionCode" label="提取码" v-if="true">
        <template #default="scope">{{ scope.row.extractionCode }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看详情 -->
          <el-button>解锁</el-button>
          <el-button @click="goExcel">评分(已解锁资源可评分)</el-button>
          <!-- </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="queryBatch.page"
        :page-size="queryBatch.size"
        :total="pageTotalBatch"
        @current-change="handlePageChangeBatch"
      ></el-pagination>
    </div>

    <el-dialog
      v-model="batchFriends"
      title="好友列表"
      width="70%"
      :before-close="handleClose"
    >
      <el-input
        v-model="query.mobile"
        placeholder="客户号码"
        class="handle-input mr10"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >搜索</el-button
      >
      <el-table
        :data="tableData"
        height="565"
        style="margin-top: 20px"
        :cell-style="{ padding: '2px 0' }"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="selectChanges"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column prop="area" label="客户手机号码" width="150">
          <template #default="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column prop="area_in" label="客户备注" width="100">
          <template #default="scope">{{ scope.row.cust_mark }}</template>
        </el-table-column>
        <el-table-column label="发送内容">
          <template #default="scope">{{ scope.row.send_content }}</template>
        </el-table-column>
        <el-table-column label="托管手机号码" width="150">
          <template #default="scope">{{ scope.row.trust_mobile }}</template>
        </el-table-column>
        <el-table-column label="导入时间" width="200">
          <template #default="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="状态" width="150">
          <template #default="scope">
            <el-tag>{{
              scope.row.state === "1"
                ? "待添加"
                : scope.row.state === "2"
                ? "待用户接受请求"
                : scope.row.state === "3"
                ? "已添加"
                : scope.row.state === "4"
                ? "该用户不存在"
                : scope.row.state === "5"
                ? "已经是用户"
                : scope.row.state
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.size"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <el-dialog
      title="导入"
      v-model="addVisible"
      width="500px"
      v-if="addVisible"
    >
      <div style="text-align: center; margin-top: 20px">
        <el-upload
          class="upload-demo"
          drag
          :action="url"
          :data="addParams"
          :on-success="uploadSuc"
          :on-remove="removeFile"
          :on-error="uploadErr"
        >
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
import {
  toRefs,
  ref,
  reactive,
  watch,
  inject,
  provide,
  defineAsyncComponent,
} from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { listResource } from "@/api/resource.js";
import { useCreatePortalService } from "../../hooks/portalService";
const UploadPortal = defineAsyncComponent(() => import("./uploadPortal.vue"));

export default {
  name: "addCustlist",
  data() {
    return {};
  },
  methods: {
    goExcel() {
      this.$router.push({ path: "/ExcelAdds" });
    },
  },
  components: { UploadPortal },
  setup() {
    const addParams = reactive({
      reqTicket: sessionStorage.getItem("reqClientTicket"),
    });
    // 批次数据列表 -------------------------
    const beginTime = ref("");
    const endTime = ref("");
    const batchFriends = ref(false);
    const portalService = useCreatePortalService({ upload: false });

    const handleClose = () => {
      batchFriends.value = false;
      query.mobile = "";
      tableData.value = null;
    };
    const batchNo = ref("");
    const handleEdit = (index, row) => {
      batchFriends.value = true;
      batchNo.value = row.batchNo;
      console.log(batchNo.value);
      getData();
    };
    const batchTableData = ref([]);
    // 查询操作(批次列表)
    const handleSearchBatch = () => {
      queryBatch.page = 1;
      getBatchTableData();
    };
    // 重置
    const resetSearch = () => {
      beginTime.value = "";
      endTime.value = "";
      handleSearchBatch();
    };
    // 分页导航(批次列表)
    const handlePageChangeBatch = (val) => {
      queryBatch.page = val;
      getBatchTableData();
    };
    const queryBatch = reactive({
      flag: 0,
      page: 1,
      size: 50,
      clientId: "",
      state: "",
      hasMsg: "",
      markState: "",
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
      flag: 0,
      page: 1,
      size: 100,
      clientId: "",
      state: "",
      mobile: "",
      hasMsg: "",
      markState: "",
    });

    const tableData = ref([]);
    const pageTotal = ref(0);
    // const url = ref(FL_SERVICE + "/qwAddCustlist/excelAdd")

    // 获取表格数据
    const getData = () => {
      queryAddCustlist(
        {
          flag: query.flag,
          page: query.page,
          size: query.size,
          state: query.state,
          mobile: query.mobile,
          hasMsg: query.hasMsg,
          markState: query.markState,
          reqTicket: addParams.reqTicket,
          batchNo: batchNo.value,
        },
        (res) => {
          console.log(res);
          if (res.retCode == REQ_SUCCESS_GET) {
            if (res.body.total != null) {
              pageTotal.value = res.body.total;
            }
            tableData.value = res.body.list;
          } else {
            ElMessage.error(res.retMsg);
          }
        },
        (err) => {
          ElMessage.error("查询异常");
          console.log(err);
        }
      );
    };

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

    const selectChanges = (val) => {
      val.forEach((item) => {
        console.log(item.id);
      });
      // queryStoreInfo.selected = val;
    };

    const uploadSuc = (response, file, fileList) => {
      if (response.retCode == REQ_SUCCESS_GET) {
        ElMessage.success(response.body);
        addVisible.value = false;
        removeFile();
        importAfter();
        handleSearchBatch();
      } else {
        ElMessage.error(response.retMsg);
      }
    };

    const uploadErr = (err, file, fileList) => {
      console.log(err);
      ElMessage.error("上传失败");
    };

    const removeFile = (file, fileList) => {
      console.log("文件删除");
    };

    let idxx = -1;

    const downloadUrl = ref(process.env.BASE_URL + "/excelDemo.xlsx");
    const ExcelAddUrl = ref(process.env.BASE_URL + "/ExcelAdds");

    const importAfter = () => {
      console.log("导入成功后调用此接口");
      addCustlistAft(
        {},
        (res) => {
          console.log(res);
          console.log("调用结果：" + res.body);
        },
        (err) => {
          console.log(err);
        }
      );
    };

    const onSubmit = () => {
      console.log("checkedType:" + data.form.checkedTypes);
      console.log("forFree:" + data.form.forFree);
      console.log("frontendOrBackend:" + data.form.frontendOrBackend);
      console.log("tag:" + data.form.tag);
      console.log("unlocked:" + data.form.unlocked);

      // batchTableData.value = [
      //   {description:"这是套缓存学习视频，从cdn到nginx到前端到本地到分布式到数据库各个层级的缓存学习视频",
      //   resourceSize:"2G",
      //   score:"4 5 7 10 8",
      //   linkStr:"https://pan.baidu.com/s/1M_3GcftT3CPWhrNy2AqdsA",
      //   isActive:"有效",
      //   extractionCode:"v08t"
      // }
      // ]

      // // debugger;

      // router.push("main");
      listResource(data.form)
        .then((resp) => {
          console.log("后端返回结果", resp.data);

          batchTableData.value = resp.data;
          // vm.$router.push("/index");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const data = reactive({
      tags: ["全部", "jvm", "并发", "vue", "typescript"],
      types: ["学习视频", "电子书", "官方文档", "面试题", "面试题录音"],
      form: {
        frontendOrBackend: "",
        tag: "",
        forFree: ref(true),
        unlocked: ref(true),
        checkedTypes: ref(["学习视频"]),
      },
    });

    const checkAll = ref(false);
    const isIndeterminate = ref(true);
    const checkedTypes = ref(["Shanghai", "Beijing"]);

    const handleCheckAllChange = (val) => {
      checkedTypes.value = val ? types : [];
      isIndeterminate.value = false;
    };
    const handleCheckedTypesChange = (value) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === types.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < types.length;
    };

    const { tags, types, form } = toRefs(data);

    return {
      handleCheckAllChange,
      handleCheckedTypesChange,
      query,
      tableData,
      pageTotal,
      addVisible,
      tags,
      form,
      types,
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
      onSubmit,
      portalService,
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

.form {
  font-size: 50px;
}

a {
  text-decoration: underline;
}
</style>
