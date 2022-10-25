<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>航班订购系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 表单提交的方法传参为'form',这里与<el-form>中的ref属性值一致 -->
          <el-button type="primary" class="login-button" @click="login()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { login } from '../api/api.js'
import { setToken } from "@/utils/setToken.js";
export default {
  name: 'ProjectLogin',
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // this.$router.push("/home");
      // setToken("username", this.form.account);
      // this.$refs[form].validate((valid) => {
      //   if (valid) {
      //     // this.service.post("/login", this.form).then((res) => {
      //     //   if(res.data.status === 200)
      //     //   setToken('username', res.data.username)
      //     //   setToken('token', res.data.token)
      //     //   this.$message({message: res.data.message, type: 'success'})
      //     //   this.$router.push('/home')
      //     // });
        login(this.form).then((res) => {
          if (res.data.code === 200)
          setToken("username", res.data.data.account);
          setToken("token", res.data.token);
          this.$message({ message: "登录成功", type: "success" });
          this.$router.push("/home");
        });
      //   } else {
      //     console.log(this.form);
      //   }
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../assets/12.16-4.jpg') center no-repeat;
  background-size: 100% 100%;
  .el-card{
    background: rgba(255, 255, 255, 0.3);
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    .header {
      font-size: 20px;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>