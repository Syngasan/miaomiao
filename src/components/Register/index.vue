<template>
  <div class="register_body">
    <div class="email">
      邮箱：
      <input type="text" class="register_text" v-model="email" />
      <button type="button" :disabled="disabled" @touchstart="handleToVerify">{{msg}}</button>
    </div>
    <div>
      用户名：
      <input type="text" class="register_text" v-model="username" />
    </div>
    <div>
      密码：
      <input type="password" class="register_text" v-model="password" />
    </div>
    <div>
      确认密码：
      <input type="password" class="register_text" />
    </div>
    <div>
      验证码：
      <input type="text" class="register_text" v-model="verify" />
    </div>
    <div class="register_btn">
      <input type="submit" value="注册" @touchstart="handleToRegister" />
    </div>
    <div class="register_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/findpassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
import { messageBox } from "@/components/JS";
import { clearInterval } from "timers";
export default {
  name: "Register",
  data() {
    return {
      msg: "发送验证码",
      email: "",
      username: "",
      password: "",
      verify: "",
      disabled: false,
      timer: null
    };
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    countDown() {
      this.disabled = true;
      var count = 60;
      this.timer = window.setInterval(() => {
        count--;
        this.msg = "剩余" + count + "秒";
        if (count === 0) {
          this.disabled = false;
          count = 60;
          this.msg = "发送验证码";
          window.clearInterval(this.timer);
        }
      }, 1000);
      // this.$once("hook:beforeDestroy", () => {
      //   window.clearInterval(timer);
      // });
    },
    handleToVerify() {
      if (this.disabled) {
        return;
      }
      this.axios.get("/api2/users/verify?email=" + this.email).then(res => {
        if (res.data.status === 0) {
          this.countDown();
        } else {
          this.msg = "发送失败,请重新尝试";
        }
      });
    },
    handleToRegister() {
      this.axios
        .post("/api2/users/register", {
          email: this.email,
          username: this.username,
          password: this.password,
          verify: this.verify
        })
        .then(res => {
          var that = this;
          if (res.data.status === 0) {
            messageBox({
              title: "注册",
              content: "注册成功",
              ok: "确定",
              handleOk() {
                that.$router.push("/mine/login");
              }
            });
          } else {
            messageBox({
              title: "注册",
              content: res.data.msg + "，请重新注册",
              ok: "确定"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
#content .register_body {
  width: 100%;
}
.register_body .email {
  position: relative;
}
.register_body .email button {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  border: none;
  padding: 5px;
  outline: none;
}
.register_body .register_text {
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px #ccc solid;
  margin-bottom: 5px;
  outline: none;
  text-indent: 10px;
}
.register_body .register_btn {
  height: 50px;
  margin: 10px;
}
.register_body .register_btn input {
  width: 100%;
  height: 100%;
  background: #e54847;
  border-radius: 3px;
  border: none;
  display: block;
  color: white;
  font-size: 20px;
}
.register_body .register_link {
  display: flex;
  justify-content: space-between;
}
.register_body .register_link a {
  text-decoration: none;
  margin: 0 5px;
  font-size: 12px;
  color: #e54847;
}
</style>