<template>
  <div>
    <div>个人中心：</div>
    <div>当前用户：{{$store.state.user.name}}</div>
    <span @touchstart="handleToLogout" style="border:1px solid #ccc;fontSize:1rem">退出</span>
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
            this.$store.commit("user/USER_NAME",{name:''})
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
          vm.$store.commit("user/USER_NAME", { name: res.data.data.username });
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