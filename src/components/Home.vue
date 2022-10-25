<template>
  <div class="home">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container class="content">
        <Menu></Menu>
        <el-container>
          <el-main>
            <Bread></Bread>
            <div class="cont">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
import Menu from '../components/common/Menu.vue'
import Bread from '../components/common/Breadcrumb.vue'
export default {
  name: 'ProjectHome',
  components: {
    Header,
    Footer,
    Menu,
    Bread
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .el-header {
    padding: 0;
  }
  .content {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    .cont{
      margin: 20px 0;
    }
  }
}
</style>