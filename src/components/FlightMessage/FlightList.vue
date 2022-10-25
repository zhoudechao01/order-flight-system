<template>
  <div class="list">
    <div class="form">
      <div class="city">
        <span>出发地：</span>
        <City @change="changeOriginStation" :fullLocation="searchForm.originStation" />
      </div>
      <!-- <i class="el-icon-right"></i> -->
      <div class="city">
        <span>目的地：</span>
        <City @change="changeDestination" :fullLocation="searchForm.destination" />
      </div>
      <div class="time">
        <span>出发日期：</span>
        <el-date-picker
          v-model="searchForm.time"
          type="date"
          size="small"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="button">
        <el-button type="primary" icon="el-icon-search" size="small" @click="search()">搜索</el-button>
      </div>
    </div>
    <el-tabs style="margin-top: 10px; margin-left: 10px">
      <el-tab-pane label="直达航班">
        <div class="item">
          <FlightItem :tableData='tableData' :originStation="searchForm.originStation" :destination="searchForm.destination"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="中转航班">
        <div class="item">
          <FlightItemTransfer :tableData='tableDataTransfer'/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import City from './City.vue'
import FlightItem from './FlightItem.vue'
import FlightItemTransfer from './FlightItemTransfer.vue'
import { searchNonstop, searchTransfer } from '../../api/api.js'
import moment from 'moment'
import {setToken, getToken } from '../../utils/setToken.js'
import { Message } from 'element-ui'
export default {
  name: 'ProjectFlightList',
  components: {
    City,
    FlightItem,
    FlightItemTransfer
  },
  data() {
    return {
      tableData: [],
      tableDataTransfer: [],
      searchForm: {
        originStation: '北京 北京市',
        destination: '北京 北京市',
        time: new Date(),
      },
      nonstop: true,
      isTransfer: false,
    };
  },

  mounted() {
    this.searchForm = JSON.parse(getToken('searchForm'))
    this.search()
  },

  methods: {
    changeOriginStation (result) {
      this.searchForm.originStation = result.fullLocation
    },
    changeDestination(result) {
      this.searchForm.destination = result.fullLocation
    },
    search(){
      let data = {
        city1: this.searchForm.originStation,
        city2: this.searchForm.destination,
        time1: moment.utc(this.searchForm.time).local().format('YYYY-MM-DD')
      }
      let params = {
        page: 1,
        pageSize: 8
      }

      // 查询中转航班
      searchTransfer(data, params).then(res => {
        console.log(res.data);
        if(res.data.code === 200)
        {
          this.tableDataTransfer = res.data.data.records
          this.tableDataTransfer.forEach(item => {
            item.totalTime = parseInt(item.totalTime1) + parseInt(item.totalTime2);
            item.price = item.price1 + item.price2
          })
        }
        else{
          Message({message: res.data.data.message || 'error', type: 'warning'})
        }
      })

      // 查询直达航班
      searchNonstop(data, params).then( res => {
      if(res.data.code === 200)
        {
          this.tableData = res.data.data.records
          if(this.tableData.length !== 0)
          {
            this.nonstop = true
          }
          this.tableData.forEach(item => item.totalTime = parseInt(item.totalTime))
        }
      })
      setToken('searchForm', JSON.stringify(this.searchForm))
    },
  },
};
</script>

<style lang="less" scoped>
.list{
  .form{
    display: flex;
    .city{
      ~.city{
        margin-left: 20px;
      }
    }
    span{
      margin: auto 0 auto 10px;
    }
    .time{
      margin-left: 20px;
    }
    .button{
      margin-left: 10px;
    }
  }
}
</style>