<template>
  <div class="city" ref="showPanel">
    <div class="select" @click="toggle()" :class="{active:visible}">
      <span v-if="!fullLocation" class="placeholder">{{placeholder}}</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i v-if="iconIsDown" class="el-icon-arrow-down"></i>
      <i v-else class="el-icon-arrow-up"></i>
    </div>
    <div class="option" v-if="visible">
      <template>
        <span class="ellipsis" @click.stop="changeItem(item)" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProjectCity',
  props: {
    fullLocation: {
      type: String,
      default: '湖北 武汉市'
    },
    placeholder: {
      type: String,
      defulat: '请选择配送地址'
    }
  },
  data() {
    return {
      // 是否显示城市列表
      visible: false,
      // 图标显示
      iconIsDown: true,
      // 所有城市地信息
      allCityData: [],
      // 点击之后改变的城市列表
      changeResult: {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        fullLocation: ''
      },
    };
  },

  created() {
    document.addEventListener("click", e => {
      if (this.$refs.showPanel) {
        let isSelf = this.$refs.showPanel.contains(e.target);
        if (!isSelf) {
          this.visible = false
          this.iconIsDown = true
        }
      }
    })
  },

  mounted() {
      this.getCityData()
      this.props
  },

  methods: {

    open() {
      this.visible = true
      this.iconIsDown = false
      // 清空之前选择
      for (const key in this.changeResult) {
        this.changeResult[key] = ''
      }
    },

    close() {
      this.visible = false
      this.iconIsDown = true
    },

    // 提供一个切换函数给select使用
    toggle () {
      this.visible ? this.close() : this.open()
    },
    // 点击组件调用接口获取城市数据
    getCityData () {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        this.allCityData = res.data
      })
    },

    onClickOutside(){
      this.close()
    },

    changeItem(item) {
      if (item.level === 0) {
        // 省
        this.changeResult.provinceCode = item.code
        this.changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        // 市
        this.changeResult.cityCode = item.code
        this.changeResult.cityName = item.name
        this.changeResult.fullLocation = `${this.changeResult.provinceName} ${this.changeResult.cityName}`
        // 这是最后一级，选完了，关闭对话框，通知父组件数据
        this.close()
        this.$emit('change', this.changeResult)
      }
    }

        // 实现点击组件外部元素进行关闭操作
      // 参数1：监听那个元素
      // 参数2：点击了该元素外的其他地方触发的函数
  },

  computed: {
    currList (){
      // 默认省一级
      let list = this.allCityData
      // 可能：市一级
      if (this.changeResult.provinceCode && this.changeResult.provinceName) {
        list = list.find(p => p.code === this.changeResult.provinceCode).areaList
      }
      return list
    }
  }
};
</script>

<style lang="less" scoped>
.city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 560px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 5px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 5px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>