<template>
  <div>管理页面</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  beforeRouteEnter: (to, from, next) => {
    axios.get("/api2/admin").then(res => {
      if (res.data.status === 0) {
        next();
      } else {
        next("/mine/login");
      }
    });
  }
};
</script>

<style>
</style>