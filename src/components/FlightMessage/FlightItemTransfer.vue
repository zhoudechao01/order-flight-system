<template>
  <el-table
  :data="tableData"
  style="width: 100%"
  :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="departureTime1" label="出发时间" width="160" align="center"></el-table-column>
    <el-table-column prop="arrivalTime1" label="到达时间" width="160" align="center"></el-table-column>
    <el-table-column prop="arrivalCity1" label="中转站" width="160" align="center"></el-table-column>
    <el-table-column prop="departureTime2" label="出发时间" width="160" align="center"></el-table-column>
    <el-table-column prop="arrivalTime2" label="到达时间" width="160" align="center"></el-table-column>
    <el-table-column prop="totalTime" label="全程时间" sortable width="160" align="center"></el-table-column>
    <el-table-column prop="price" sortable label="价格" width="160" align="center" style="color: red"></el-table-column>
    <el-table-column label="操作" align="center" width="160">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="goDetail(scope.row)"
        >点击购票</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'ProjectFlightItem',

  props: {
    // originStation: {
    //   type: String,
    //   default: ''
    // },
    // destination: {
    //   type: String,
    //   defulat: ''
    // }
    tableData: {
      type: Array,
      default: []
    }
  },
    data() {
      return {
        isTransfer: true
      }
    },
    methods: {
      formatter(row) {
        return row.address;
      },

      goDetail(row){
        let data = this.tableData[this.tableData.findIndex(item => item.arrivalCity1 === row.arrivalCity1)]
        this.$router.push(
          {
            path: '/home/flightDetail',
            query: {
              flightMessage: JSON.stringify(data),
              isTransfer: this.isTransfer
            }
          }
        )
      }
    }
  }
</script>

<style lang="less" scoped>
</style>