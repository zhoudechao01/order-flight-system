<template>
  <el-table
  :data="tableData"
  style="width: 100%"
  :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column prop="classId" label="航班号" width="200" align="center"></el-table-column>
    <el-table-column prop="departureTime" label="出发时间" width="200" align="center"></el-table-column>
    <el-table-column prop="arrivalTime" label="到达时间" width="200" align="center"></el-table-column>
    <el-table-column prop="totalTime" label="全程时间(m)" sortable width="200" align="center"></el-table-column>
    <el-table-column prop="price" sortable label="价格(元)" align="center" style="color: red"></el-table-column>
    <el-table-column label="操作" align="center" width="200">
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
      tableData: {
        type: Array,
        default: []
      },
      originStation: {
        type: String,
        default: ''
      },
      destination: {
        type: String,
        defulat: ''
      }
    },
    data() {
      return {
        isTransfer: false
      }
    },
    mounted() {
    },
    methods: {
      formatter(row) {
        return row.address;
      },
      goDetail(row){
        let data = this.tableData[this.tableData.findIndex(item => item.classId === row.classId)]
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