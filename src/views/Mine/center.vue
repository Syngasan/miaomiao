<template>
  <div>
    <div>个人中心：</div>
    <div>当前用户：{{$store.state.user.name}}</div>
    <span @touchstart="handleToLogout" style="border:1px solid #ccc;fontSize:1rem">退出</span>
    <div v-if="$store.state.user.isAdmin">
      用户身份：管理员
      <a href="/admin" target="_black">进入管理后台</a>
    </div>
    <div v-else>用户身份：普通会员</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Center",
  methods: {
    handleToLogout() {
      this.axios.get("/api2/users/logout").then(res => {
        var status = res.data.status;
        if (status === 0) {
          localStorage.removeItem("name");
          localStorage.removeItem("isAdmin");
          this.$store.commit("user/USER_NAME", { name: "", isAdmin: false });
          this.$router.push("/mine/login");
        }
      });
    }
  },
  //   进入前先判断是否有登录
  beforeRouteEnter: (to, from, next) => {
    axios.get("/api2/users/getUser").then(res => {
      if (res.data.status === 0) {
        next(vm => {
          localStorage.setItem("name", res.data.data.username);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          vm.$store.commit("user/USER_NAME", {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin
          });
        });
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>

<style>
</style>