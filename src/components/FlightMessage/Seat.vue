<template>
  <div>
    <div style="width: 500px">
      <el-radio-group v-model="seat.seatNumber">
        <el-radio v-for="(item, i) in seatList" :key="i" :label="item.seatNumber" :disabled='item.disabled' border>{{item.seatNumber}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import {setToken, getToken } from '../../utils/setToken.js'
export default {
  name: 'ProjectSeat',
  props: {
    seatList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      seat: {
        seatNumber: '',
        disabled: true
      },
    };
  },

  mounted() {
  },

  methods: {
  },
  watch: {
    seat: {
      immediate: true,
      deep: true,
      handler(newVal, oldValue){
        this.$emit('change', newVal)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-radio-group{
  padding: 0 !important;
  .el-radio{
    float: left;
    margin: 10px 0 0 20px !important;
  }
}
</style>