<template>
  <div class="findpassword_body">
    <div class="email">
      邮箱：
      <input type="text" class="findpassword_text" v-model="email" />
      <button @touchstart="handleToVerify">{{msg}}</button>
    </div>
    <div>
      新密码：
      <input type="password" class="findpassword_text" v-model="password" />
    </div>
    <div>
      验证码：
      <input type="text" class="findpassword_text" v-model="verify" />
    </div>
    <div class="findpassword_btn">
      <input type="submit" value="修改" @touchstart="handleToPassword" />
    </div>
    <div class="findpassword_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
  name: "FindPassword",
  data() {
    return {
      email: "",
      password: "",
      verify: "",
      msg: "发送验证码"
    };
  },
  methods: {
    handleToVerify() {
      this.axios.get("/api2/users/verify?email=" + this.email).then(res => {
        if (res.data.status === 0) {
          this.msg = "发送成功";
        } else {
          this.msg = "发送失败";
        }
      });
    },
    handleToPassword() {
      this.axios
        .post("/api2/users/findpassword", {
          email: this.email,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var that = this;
          if (res.data.status === 0) {
            messageBox({
              title: "修改",
              content: "修改密码成功",
              ok: "确定",
              handleOk() {
                that.$router.push("/mine/login");
              }
            });
          } else {
            messageBox({
              title: "修改",
              content: "修改失败",
              ok: "确定"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
#content .findpassword_body {
  width: 100%;
}
.findpassword_body .email {
  position: relative;
}
.findpassword_body .email button {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  border: none;
  padding: 5px;
  outline: none;
}
.findpassword_body .findpassword_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.findpassword_body .findpassword_btn {
  height: 50px;
  margin: 10px;
}
.findpassword_body .findpassword_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.findpassword_body .findpassword_link {
  display: flex;
  justify-content: space-between;
}
.findpassword_body .findpassword_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>