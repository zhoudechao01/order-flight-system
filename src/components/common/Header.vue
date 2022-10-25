<template>
  <div class="header">
    <el-header>
      <div class="title">航班预定系统</div>
      <div>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link" style="color: white">
            {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span  @click="logOut()">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
import { getToken, removeToken} from "@/utils/setToken.js";
export default {
  name: "ProjectHeader",
  data() {
    return {
      name: "",
    };
  },

  created() {
    this.name = getToken("username");
  },

  mounted() {},

  methods: {
    logOut(){
      this.$router.push("/");
      removeToken("username"),
      removeToken("token")
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  .el-header {
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    background: #2578b5;
    color: #fff;
    line-height: 60px;
    .title{
      width: 200px;
      font-size: 24px;

    }
  }
}
</style>