<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#2578b5"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="(item, index) in menus">
          <el-submenu :index="index + ''" :key="index" v-if="!item.hidden&&!item.isCommon">
            <template slot="title"  class="title">
              <i class="el-icon-menu" style="color: white"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in item.children"
              :key="index"
            >
              <el-menu-item :index="child.path" v-if="!child.hidden">
                {{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "ProjectMenu",
  data() {
    return {
      menus: [],
    };
  },

  created() {
    this.menus = [...this.$router.options.routes]; //接受路由传递过来的name,icon参数
    console.log(this.menus);
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.menu {
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
      color: #fff;
      .fa {
        margin-right: 10px;
        color: #fff;
      }
      .el-submenu .el-menu-item {
        min-width: 0;
      }
    }
  }
}
</style>