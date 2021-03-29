<template>
  <div class="app-container">
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
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template></el-table-column
      ></el-table
    >
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
    this.getList()
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
};
</script>
