<template>
  <div class="app-container">
    <!--"list"代表刚才定义的list()函数，":load"表示表格下面有子表，
      "getChildrens" 表示查询层级下的表
      ":tree-props"表示，根据hasChildren决定是否有子表来显示，
      也就是数据库表对应的实体类Dict中hasChildren属性
      lazy代表懒加载，点击才会加载下一层
      -->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{ row }">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dict from "@/api/cmn/dict.js";
export default {
  data() {
    return {
      list: [], //数据字典列表数组
    };
  },
  created() {
    //目的是查询数据字典的所有数据，所以id=1
    this.getDictList(1);
  },
  //methods....  写成了method
  methods: {
    getDictList(id) {
      //response是指接口成功返回后的数据，包含请求头，请求体等信息
      dict.dictList(id).then((response) => {
        // "data": [
        //  {
        //   "id": 10001,
        //   "createTime": "2019-06-10 10:43:32",
        //   "updateTime": "2020-06-23 09:23:48",
        //   "isDeleted": 0,
        //   "param": {},
        //   "parentId": 10000,
        //   "name": "三级甲等",
        //   "value": "1",
        //   "dictCode": "",
        //   "hasChildren": false
        //  }
        // ]  实际response中的data如上所示
        this.list = response.data;
      });
    },
    //递归查询
    getChildrens(tree, treeNode, resolve) {
      dict.dictList(tree.id).then((response) => {
        resolve(response.data);
      });
    },
  },
};
</script>