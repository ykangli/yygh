<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-col :span="10">
          <el-input v-model="hospitalSet.hosname" />
        </el-col>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-col :span="10">
          <el-input v-model="hospitalSet.hoscode" />
        </el-col>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-col :span="10">
          <el-input v-model="hospitalSet.apiUrl" />
        </el-col>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-col :span="10">
          <el-input v-model="hospitalSet.contactsName" />
        </el-col>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-col :span="10">
          <el-input v-model="hospitalSet.contactsPhone" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="10">
          <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospset from "@/api/hosp/hospitalSet.js";
export default {
  data() {
    //data中定义变量和初始值
    return {
      hospitalSet: {},
    };
  },
  created() {
    //页面渲染之前执行
    //获取路由id值 调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getHostSet(id);
    } else{
      this.hospitalSet={}
    }
  },
  methods: {
    //根据id查询
    getHostSet(id) {
      hospset.getHospSet(id).then((response) => {
        this.hospitalSet = response.data;
      });
    },

    //添加
    save() {
      hospset.saveHospSet(this.hospitalSet).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/hosp/hospitalSet/list" });
      });
    },

    //修改
    update() {
      hospset.updateHospSet(this.hospitalSet).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/hosp/hospitalSet/list" });
      });
    },

    saveOrUpdate() {
      //判断添加还是修改
      if (!this.hospitalSet.id) {
        //没有id，做添加
        this.save();
      } else {
        //修改
        this.update();
      }
    },
  },
};
</script>
