<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>

    <!-- banner列表 -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <!-- ===表示值和类都相同 -->
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template></el-table-column
      >
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
</el-table-column>
</el-table>
</div>
</template>


<script>
//引入接口定义的js文件   hospitalSet.js  js可以省略不写
import hospitalSet from "@/api/hosp/hospitalSet";

export default {
  // 定义数据模型
  data() {
    return {
      current: 1, //当前页
      limit: 3, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
    };
  },

  // 页面渲染成功后获取数据
  created() {
    //一般调用methods定义的方法，得到数据
    //注意：是调用当前vue中的getList()方法，然后getList()再去调用/api/hosp/hospitalSet中的getPageList()方法
    this.getList();
  },

  methods: {
    //医院设置列表  getList()这个方法去调用/api/hosp/hospitalSet中的getPageList()方法
    getList(page = 1) {
      //添加当前页参数
      this.current = page;
      //hospitalSet就是import中的
      hospitalSet
        .getPageList(this.current, this.limit, this.searchObj)
        .then((response) => {
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
          // console.log(response)
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
  },
  //删除医院设置的方法
  removeDataById(id) {
    this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      //确定执行then方法
      //调用接口 教程中是hospSet，应该是hospitalSet
      hospitalSet.deleteHospSet(id).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //刷新页面
        this.getList(1);
      });
    });
  },
};
</script>
