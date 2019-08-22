<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="handle" label="操作">
        <template>
          <el-button type="text" size="small">未冻结</el-button>
          <el-button type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.axios.get("/api2/admin/usersList").then(res => {
      //   console.log(res);
      if (res.data.status === 0) {
        this.tableData = res.data.data.usersList;
      }
    });
  }
};
</script>

<style >
.router-link-exact-active,
.router-link-exact-active i {
  color: aquamarine;
}
</style>
