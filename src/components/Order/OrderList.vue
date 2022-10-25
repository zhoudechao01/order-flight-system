<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="订单号">
            <span>{{ props.row.orderId }}</span>
          </el-form-item>
          <el-form-item label="乘车人">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.idCard }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.idCard }}</span>
          </el-form-item>
          <el-form-item label="中转站" v-if="props.row.transitCity">
            <span>{{ props.row.transitCity }}</span>
          </el-form-item>
          <el-form-item label="座位" v-if="props.row.seat1">
            <span>{{ props.row.seat1 }}</span>
          </el-form-item>
          <el-form-item label="座位" v-if="props.row.seat2">
            <span>{{ props.row.seat2 }}</span>
          </el-form-item>
          <el-form-item label="下单时间">
            <span>{{ props.row.orderTime }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="乘车人" prop="name" align="center"></el-table-column>
    <el-table-column label="出发地" prop="departureCity" align="center"></el-table-column>
    <el-table-column label="目的地" prop="arrivalCity" align="center"></el-table-column>
    <el-table-column label="出发时间" prop="departureTime1" align="center"></el-table-column>
    <el-table-column label="到达时间" prop="arrivalTime1" align="center"></el-table-column>
    <el-table-column label="价格(元)" prop="price" align="center"></el-table-column>
    <el-table-column label="操作" align="center" width="180">
      <template slot-scope="scope">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="del(scope.row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllOrder, deleteOrder } from '../../api/api.js'
export default {
  name: 'ProjectOrderList',

  data() {
    return {
      tableData: []
    };
  },

  mounted() {
    this.getData()
  },

  methods: {

    getData(){
      getAllOrder().then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data
        this.tableData.forEach( item => {
          item.seat1 = item.seat.split(' ')[0];
          item.seat2 = item.seat.split(' ')[1];
          })
      })
    },

    del(row) {
      console.log(row);
      this.$alert('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          let params = {
            id: row.orderId
          }
          deleteOrder(params).then(res =>{
            if(res.data.code === 500)
            {
              this.$message({message: "删除成功", type: 'success'})
              this.getData()
            }
          })
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item{
  margin-bottom: 0 !important;
  margin-left: 40px;
}
</style>