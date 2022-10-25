<template>
  <div class="info">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="addStudent()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="id" label="航班号" width="160" align="center"></el-table-column>
      <el-table-column prop="takeoffTime" label="出发时间" width="160" align="center"></el-table-column>
      <el-table-column prop="landTime" label="到达时间" width="160" align="center"></el-table-column>
      <el-table-column prop="originStation" label="出发地" width="180" align="center"></el-table-column>
      <el-table-column prop="destination" label="目的地" width="180" align="center"></el-table-column>
      <el-table-column prop="wholeTime" label="全程时间" sortable width="180" align="center"></el-table-column>
      <el-table-column prop="price" sortable label="价格" align="center"  style="color: red !important"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
          type="danger"
          size="mini"
          icon="el-icon-edit"
          @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="state ? '添加航班信息' : '修改航班信息'"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <!-- 校验表单要写rules，ref，item中要写prop属性 -->
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="航班号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.flightId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出发时间" :label-width="formLabelWidth" prop="takeoffTime">
          <el-date-picker v-model="form.depatureTIme" type="datetime" :change="calculateTotalTime()" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到达时间" :label-width="formLabelWidth" prop="landTime">
          <el-date-picker v-model="form.arrivalTime" type="datetime" :change="calculateTotalTime()" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="总时间(m)"
          :label-width="formLabelWidth"
          prop="totalTime"
        >
          <el-input v-model="form.totalTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="价格(元)"
          :label-width="formLabelWidth"
          prop="price"
        >
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "InfoLIst",
  data() {
    return {
      tableData: [
        {
          id: '1001',
          takeoffTime: '8:30',
          landTime: '16:30',
          originStation: '北京 北京市',
          destination: '上海 上海市',
          wholeTime: '480',
          price: '360'
        },
        {
          id: '1002',
          takeoffTime: '8:30',
          landTime: '15:30',
          originStation: '北京 北京市',
          destination: '上海 上海市',
          wholeTime: '420',
          price: '390'
        },
        {
          id: '1003',
          takeoffTime: '8:30',
          landTime: '14:30',
          originStation: '北京 北京市',
          destination: '上海 上海市',
          wholeTime: '360',
          price: '390'
        },
      ],
      formInline: {},
      dialogFormVisible: false,
      form: {
        flightId: '',
        depatureTIme: '',
        arrivalTime: '',
        totalTime: '',
        price: ''
      },
      formLabelWidth: "80px",
      // 控制弹出框是新增还是修改
      state: true,
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        adress: [{ required: true, message: "请输入地址" }],
        time: [{ required: true, message: "请输入入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
    };
  },

  created() {
    this.getData()
  },

  methods: {
    // 获取信息列表
    getData() {
    },
    addStudent() {
      // // 清空表单验证
      // this.$nextTick(() => {
      //   this.$refs["form"].resetFields();
      // });
      // // 修改时表单的数据发生了变化，新增时需要初始化表单
      // this.form = {
      //   name: "",
      //   sex: "1",
      //   age: "",
      //   father: "",
      //   mother: "",
      //   adress: "",
      //   time: "",
      //   phone: "",
      // };
      // 设置对话框标题为新增信息
      this.state = true;
      this.dialogFormVisible = true;
    },
    edit(row) {
      // 令表单值为当前行的值
      this.form = row;
      //改变表单显示的状态
      this.state = false;
      this.dialogFormVisible = true;
    },
    del(row) {
      console.log(row);
      this.$alert('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        // callback: () => {
        //   infoDel(row.id).then(res => {
        //     if(res.data.status === 200)
        //     {
        //       this.$message({message: res.data.message, type: 'success'})
        //       this.getData()
        //     }
        //   })
        // }
      })
    },
    sure(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 如果新增
          if (this.state) {
            console.log("添加");
            // addInfo(this.form).then((res) => {
            //   if (res.data.status === 200) {
            //     this.getData();
            //     this.dialogFormVisible = false;
            //     this.$message({ message: res.data.message, type: "success" });
            //   }
            // });
          } else {
            console.log('修改');
            console.log(form);
            // updateInfo(this.form).then((res) => {
            //   if (res.data.status === 200) {
            //     this.getData();
            //     this.dialogFormVisible = false;
            //     this.$message({ message: res.data.message, type: "success" });
            //   }
            // });
          }
        }
      });
    },
    // 计算总时间
    calculateTotalTime(){
      if(this.form.depatureTIme != '' && this.form.arrivalTime!= '')
      {
        let firstHour =  moment.utc(this.form.depatureTIme).format('HH')
        let firstMinute = moment.utc(this.form.depatureTIme).format('mm')
        let secondHour =  moment.utc(this.form.arrivalTime).format('HH')
        let secondMinute =  moment.utc(this.form.arrivalTime).format('mm')
        this.form.totalTime =(parseInt(secondHour)*60 + parseInt(secondMinute)) - (parseInt(firstHour)*60 + parseInt(firstMinute)) 
      }
    }
  },
};
</script>

<style lang="less" scoped>
.info {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
}
</style>