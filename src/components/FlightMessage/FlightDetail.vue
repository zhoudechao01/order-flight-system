<template>
  <div class="detail">
    <div class="form">
      <el-card>
        <div slot="header" class="clearfix">
          <span>乘客信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addInfo()">修改信息</el-button>
        </div>
        <div class="text item"><span>姓名：{{form.name}}</span></div>
        <div class="text item"><span>手机号：{{form.phone}}</span></div>
      </el-card>
    </div>
    <el-dialog
      title="添加乘车人信息"
      :visible="dialogFormVisible"
      width="400px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" label-width="70px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="70px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="flightinfo">
      <el-card v-if="!isTransfer">
        <div class="message" style="margin-left: 30px">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px">当前航班信息</span>
          </div>
          <ul>
            <li><span>航班号：{{flightMessage.classId}}</span></li>
            <li><span>出发地：{{flightMessage.departureCity}}</span></li>
            <li><span>目的地：{{flightMessage.arrivalCity}}</span></li>
            <li><span>出发时间：{{flightMessage.departureTime}}</span></li>
            <li><span>到达时间：{{flightMessage.arrivalTime}}</span></li>
            <li><span>总时间：{{flightMessage.totalTime}}</span></li>
            <li><span>价格：{{flightMessage.price}}</span></li>
          </ul>
        </div>
        <div class="seat">
          <div slot="header" class="clearfix">
            <span>请选择座位</span>
          </div>
          <div style="margin-top: 16px">
            <Seat @change="changeSeat" :seatList='seatList'/>
          </div>
        </div>
      </el-card>
      <el-card v-if="isTransfer">
        <div class="message" style="margin-left: 30px">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px">当前航班信息</span>
          </div>
          <ul>
            <li><span>航班号：{{flightMessage.classId1}}</span></li>
            <li><span>出发地：{{flightMessage.departureCity1}}</span></li>
            <li><span>目的地：{{flightMessage.arrivalCity1}}</span></li>
            <li><span>出发时间：{{flightMessage.departureTime1}}</span></li>
            <li><span>到达时间：{{flightMessage.arrivalTime1}}</span></li>
            <li><span>总时间：{{flightMessage.totalTime1}}</span></li>
            <li><span>价格：{{flightMessage.price1}}</span></li>
          </ul>
        </div>
        <div class="seat">
          <div slot="header" class="clearfix">
            <span>请选择座位</span>
          </div>
          <div style="margin-top: 16px">
            <Seat @change="changeSeat1" :seatList='seat1List'/>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 10px" v-if="isTransfer">
        <div class="message">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px">当前航班信息</span>
          </div>
          <ul>
            <li><span>航班号：{{flightMessage.classId2}}</span></li>
            <li><span>出发地：{{flightMessage.arrivalCity1}}</span></li>
            <li><span>目的地：{{flightMessage.arrivalCity2}}</span></li>
            <li><span>出发时间：{{flightMessage.departureTime2}}</span></li>
            <li><span>到达时间：{{flightMessage.arrivalTime2}}</span></li>
            <li><span>总时间：{{flightMessage.totalTime2}}</span></li>
            <li><span>价格：{{flightMessage.price2}}</span></li>
          </ul>
        </div>
        <div class="seat" style="margin-right: 50px">
          <div slot="header" class="clearfix">
            <span>请选择座位</span>
          </div>
          <div style="margin-top: 16px">
            <Seat @change="changeSeat2" :seatList='seat2List'/>
          </div>
        </div>
      </el-card>
      <el-button type="primary" class="button" @click="submit()">提交订单</el-button>
    </div>

  </div>
</template>

<script>
import Seat from './Seat.vue'
import {setToken, getToken } from '../../utils/setToken.js'
import { nonstopOrder, transferOrder, getSeatData1, getSeatData2 } from '../../api/api.js'
export default {
  name: 'ProjectFlightDetail',
  components: {
    Seat
  },

  data() {
    return {
      flightMessage:{
        ...JSON.parse(this.$route.query.flightMessage),
      },
      seat: '',
      seat1: '',
      seat2: '',
      seatList: [
        {
          seatNumber: '01',
          disabled: false
        },
        {
          seatNumber: '02',
          disabled: false
        },
        {
          seatNumber: '03',
          disabled: false
        },
        {
          seatNumber: '04',
          disabled: false
        },
        {
          seatNumber: '05',
          disabled: false
        },
        {
          seatNumber: '06',
          disabled: false
        },
        {
          seatNumber: '07',
          disabled: false
        },
        {
          seatNumber: '08',
          disabled: false
        },
        {
          seatNumber: '09',
          disabled: false
        },
        {
          seatNumber: '10',
          disabled: false
        },
        {
          seatNumber: '11',
          disabled: false
        },
        {
          seatNumber: '12',
          disabled: false
        },
        {
          seatNumber: '13',
          disabled: false
        },
        {
          seatNumber: '14',
          disabled: false
        },
        {
          seatNumber: '15',
          disabled: false
        },
        {
          seatNumber: '16',
          disabled: false
        },
        {
          seatNumber: '17',
          disabled: false
        },
        {
          seatNumber: '18',
          disabled: false
        },
        {
          seatNumber: '19',
          disabled: false
        },
        {
          seatNumber: '20',
          disabled: false
        }
      ],
      seat1List: [
        {
          seatNumber: '01',
          disabled: false
        },
        {
          seatNumber: '02',
          disabled: false
        },
        {
          seatNumber: '03',
          disabled: false
        },
        {
          seatNumber: '04',
          disabled: false
        },
        {
          seatNumber: '05',
          disabled: false
        },
        {
          seatNumber: '06',
          disabled: false
        },
        {
          seatNumber: '07',
          disabled: false
        },
        {
          seatNumber: '08',
          disabled: false
        },
        {
          seatNumber: '09',
          disabled: false
        },
        {
          seatNumber: '10',
          disabled: false
        },
        {
          seatNumber: '11',
          disabled: false
        },
        {
          seatNumber: '12',
          disabled: false
        },
        {
          seatNumber: '13',
          disabled: false
        },
        {
          seatNumber: '14',
          disabled: false
        },
        {
          seatNumber: '15',
          disabled: false
        },
        {
          seatNumber: '16',
          disabled: false
        },
        {
          seatNumber: '17',
          disabled: false
        },
        {
          seatNumber: '18',
          disabled: false
        },
        {
          seatNumber: '19',
          disabled: false
        },
        {
          seatNumber: '20',
          disabled: false
        }
      ],
      seat2List: [
        {
          seatNumber: '01',
          disabled: false
        },
        {
          seatNumber: '02',
          disabled: false
        },
        {
          seatNumber: '03',
          disabled: false
        },
        {
          seatNumber: '04',
          disabled: false
        },
        {
          seatNumber: '05',
          disabled: false
        },
        {
          seatNumber: '06',
          disabled: false
        },
        {
          seatNumber: '07',
          disabled: false
        },
        {
          seatNumber: '08',
          disabled: false
        },
        {
          seatNumber: '09',
          disabled: false
        },
        {
          seatNumber: '10',
          disabled: false
        },
        {
          seatNumber: '11',
          disabled: false
        },
        {
          seatNumber: '12',
          disabled: false
        },
        {
          seatNumber: '13',
          disabled: false
        },
        {
          seatNumber: '14',
          disabled: false
        },
        {
          seatNumber: '15',
          disabled: false
        },
        {
          seatNumber: '16',
          disabled: false
        },
        {
          seatNumber: '17',
          disabled: false
        },
        {
          seatNumber: '18',
          disabled: false
        },
        {
          seatNumber: '19',
          disabled: false
        },
        {
          seatNumber: '20',
          disabled: false
        }
      ],
      form: {
        name: '张三',
        phone: '12222222222',
      },
      isTransfer: /^true$/i.test(this.$route.query.isTransfer),
      isAdd: false,
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        phone: [{ required: true, message: "请输入手机号" }],
      },
    };
  },
  methods: {

    changeSeat(result){
      this.seat = result.seatNumber
    },

    changeSeat1(result){
      this.seat1 = result.seatNumber
    },

    changeSeat2(result){
      this.seat2 = result.seatNumber
    },

    // 查询当前航班的座位信息
    getSeatData(){
      if(this.isTransfer){
        let params = {
          classId1: this.flightMessage.classId1,
          classId2: this.flightMessage.classId2
        }
        getSeatData2(params).then(res => {
          this.seat1List[0].disabled = res.data.data[0].seat1
          this.seat1List[1].disabled = res.data.data[0].seat2
          this.seat1List[2].disabled = res.data.data[0].seat3
          this.seat1List[3].disabled = res.data.data[0].seat4
          this.seat1List[4].disabled = res.data.data[0].seat5
          this.seat1List[5].disabled = res.data.data[0].seat6
          this.seat1List[6].disabled = res.data.data[0].seat7
          this.seat1List[7].disabled = res.data.data[0].seat8
          this.seat1List[8].disabled = res.data.data[0].seat9
          this.seat1List[9].disabled = res.data.data[0].seat10
          this.seat1List[10].disabled = res.data.data[0].seat11
          this.seat1List[11].disabled = res.data.data[0].seat12
          this.seat1List[12].disabled = res.data.data[0].seat13
          this.seat1List[13].disabled = res.data.data[0].seat14
          this.seat1List[14].disabled = res.data.data[0].seat15
          this.seat1List[15].disabled = res.data.data[0].seat16
          this.seat1List[16].disabled = res.data.data[0].seat17
          this.seat1List[17].disabled = res.data.data[0].seat18
          this.seat1List[18].disabled = res.data.data[0].seat19
          this.seat1List[19].disabled = res.data.data[0].seat20

          this.seat2List[0].disabled = res.data.data[1].seat1
          this.seat2List[1].disabled = res.data.data[1].seat2
          this.seat2List[2].disabled = res.data.data[1].seat3
          this.seat2List[3].disabled = res.data.data[1].seat4
          this.seat2List[4].disabled = res.data.data[1].seat5
          this.seat2List[5].disabled = res.data.data[1].seat6
          this.seat2List[6].disabled = res.data.data[1].seat7
          this.seat2List[7].disabled = res.data.data[1].seat8
          this.seat2List[8].disabled = res.data.data[1].seat9
          this.seat2List[9].disabled = res.data.data[1].seat10
          this.seat2List[10].disabled = res.data.data[1].seat11
          this.seat2List[11].disabled = res.data.data[1].seat12
          this.seat2List[12].disabled = res.data.data[1].seat13
          this.seat2List[13].disabled = res.data.data[1].seat14
          this.seat2List[14].disabled = res.data.data[1].seat15
          this.seat2List[15].disabled = res.data.data[1].seat16
          this.seat2List[16].disabled = res.data.data[1].seat17
          this.seat2List[17].disabled = res.data.data[1].seat18
          this.seat2List[18].disabled = res.data.data[1].seat19
          this.seat2List[19].disabled = res.data.data[1].seat20
        })
      }
      else{
        let params = {
          classId: this.flightMessage.classId
        }
        getSeatData1(params).then(res => {
          console.log(res.data);
          this.seatList[0].disabled = res.data.data.seat1
          this.seatList[1].disabled = res.data.data.seat2
          this.seatList[2].disabled = res.data.data.seat3
          this.seatList[3].disabled = res.data.data.seat4
          this.seatList[4].disabled = res.data.data.seat5
          this.seatList[5].disabled = res.data.data.seat6
          this.seatList[6].disabled = res.data.data.seat7
          this.seatList[7].disabled = res.data.data.seat8
          this.seatList[8].disabled = res.data.data.seat9
          this.seatList[9].disabled = res.data.data.seat10
          this.seatList[10].disabled = res.data.data.seat11
          this.seatList[11].disabled = res.data.data.seat12
          this.seatList[12].disabled = res.data.data.seat13
          this.seatList[13].disabled = res.data.data.seat14
          this.seatList[14].disabled = res.data.data.seat15
          this.seatList[15].disabled = res.data.data.seat16
          this.seatList[16].disabled = res.data.data.seat17
          this.seatList[17].disabled = res.data.data.seat18
          this.seatList[18].disabled = res.data.data.seat19
          this.seatList[19].disabled = res.data.data.seat20
        })
      }
    },

    addInfo(){
      this.dialogFormVisible = true
      setToken('detailForm', JSON.stringify(this.form))
    },

    cancel(){
      this.form = JSON.parse(getToken('detailForm'))
      this.dialogFormVisible = false
    },
    sure(){
      this.isAdd = true
      this.dialogFormVisible = false
      setToken('detailForm', JSON.stringify(this.form))
    },

    submit(){
      if(this.isTransfer)
      {
        let params = {
          classId1: this.flightMessage.classId1,
          classId2: this.flightMessage.classId2,
        };
        let data = {
          name: this.form.name,
          idCard: this.form.phone,
          seat: this.seat1.replace(/\b(0+)/gi,""),
          seat2: this.seat2.replace(/\b(0+)/gi,"")
        }
        console.log(data);
        transferOrder(data, params).then( res => {
          if(res.data.code === 200)
          {
            this.$message({ message: "插入成功", type: "success" });
            this.$router.push("/home");
          }
          else{
            this.$message({ message: "插入失败", type: "warn" });
          }
        })
      }
      else{
        let params = {
          classId: this.flightMessage.classId
        };
        let data = {
          name: this.form.name,
          idCard: this.form.phone,
          seat: this.seat.replace(/\b(0+)/gi,"")
        }
        console.log(params, data);
        nonstopOrder(data, params).then(res => {
          if(res.data.code === 200)
          {
            this.$message({ message: "插入成功", type: "success" });
            this.$router.push("/home");
          }
          else{
            this.$message({ message: "插入失败", type: "warn" });
          }
        })
      }
    }
  },

  mounted() {
    this.form = JSON.parse(getToken('detailForm'))
    this.getSeatData()
  }
};
</script>

<style lang="less" scoped>
.detail{
  display: flex;
  .item {
    margin-bottom: 18px;
  }
  .form{
    width: 30%;
    .el-card{
      text-align: left;
    }
  }
  .flightinfo{
    width: 90%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .message{
      width: 30%;
      float: left;
      text-align: left;
      margin: 20px 0 0 30px;
      ul{
        li{
          margin-top: 10px;
        }
      }
    }
    .seat{
      margin-right: 30px;
      display: inline-block;
      width: 400px;
    }
    .button{
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>