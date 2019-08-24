<template>
  <div>
    <el-table :data="nowTableData" border style="width: 100%">
      <el-table-column prop="date" label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.userHead" alt />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column prop="username" label="用户姓名"></el-table-column>
      <el-table-column prop="email" label="用户邮箱"></el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleToFreeze(scope.$index, scope.row)"
          >{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="handleDelete(scope.$index, scope.row)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3
    };
  },
  methods: {
    handleToFreeze(index, row) {
      // console.log(index, row);
      if (!row.isFreeze) {
        this.$confirm("此操作将冻结该账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios
              .post("/api2/admin/updateFreeze", {
                email: row.email,
                isFreeze: !row.isFreeze
              })
              .then(res => {
                if (res.data.status === 0) {
                  this.$message({
                    type: "success",
                    message: "冻结成功!"
                  });
                  this.tableData[index].isFreeze = !row.isFreeze;
                }
              });
          })
          .catch(() => {});
      } else {
        this.$confirm("此操作将解冻该账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios
              .post("/api2/admin/updateFreeze", {
                email: row.email,
                isFreeze: !row.isFreeze
              })
              .then(res => {
                if (res.data.status === 0) {
                  this.$message({
                    type: "success",
                    message: "解冻成功!"
                  });
                  this.tableData[index].isFreeze = !row.isFreeze;
                }
              });
          })
          .catch(() => {});
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/api2/admin/deleteUser", {
              email: row.email
            })
            .then(res => {
              if (res.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.tableData.splice(index, 1);
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      console.log(val);
    }
    // handleSizeChange(val) {
    //   console.log(val);
    // }
  },
  computed: {
    nowTableData() {
      return (
        this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        ) || []
      );
    }
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

<style scoped>
.router-link-exact-active,
.router-link-exact-active i {
  color: aquamarine;
}
.page {
  margin-top: 20px;
}
</style>
