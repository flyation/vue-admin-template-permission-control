<template>
  <div class="app-container">
    <el-form :model="pojo" label-width="90px">
      <el-card class="box-card">
        <div class="text item">
          教室名：<font color="#6495ed">{{pojo.name}}</font>
          <br>
          <br>
          预约日期：<font color="#6495ed">{{pojo.date}}</font>
        </div>
      </el-card>
      <br>

<!--      <el-card class="box-card">-->
<!--        <div class="text item">-->
<!--          -->
<!--        </div>-->
<!--      </el-card>-->
<!--      <br>-->

<!--      <el-card class="box-card">-->
<!--        <div class="text item">-->
<!--          <el-form-item label="教室容量">-->
<!--            <el-slider-->
<!--              width="50%"-->
<!--              v-model="pojo.capacity"-->
<!--              show-stops-->
<!--              :step="50"-->
<!--              :max="250"-->
<!--              :marks="marks"-->
<!--              disabled>-->
<!--            </el-slider>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <br>-->

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择时间段</span>
        </div>
        <el-form-item label="" label-width="auto">
          <el-checkbox label="第1节课" v-model="pojo.course1" :disabled="pojo.disable1"></el-checkbox>
          <el-checkbox label="第2节课" v-model="pojo.course2" :disabled="pojo.disable2"></el-checkbox>
          <el-checkbox label="第3节课" v-model="pojo.course3" :disabled="pojo.disable3"></el-checkbox>
          <el-checkbox label="第4节课" v-model="pojo.course4" :disabled="pojo.disable4"></el-checkbox>
        </el-form-item>
      </el-card>
      <br>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>预约事由</span>
        </div>
        <div class="text item">
          <el-form-item label="" label-width="auto">
            <el-input v-model="pojo.reason" type="textarea"  placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
        <div class="bottom clearfix">
          <el-button type="primary" @click="handleReserveSubmit">提 交</el-button>
        </div>
      </el-card>
    </el-form>

<!--    <el-button type="primary" @click="handleReserveTest">测试</el-button>-->
  </div>
</template>

<script>
import qrApi from '@/api/qr'
import message from '@/utils/message'

export default {
  data() {
    return {
      pojo: {}, // 预约申请表单绑定的实体对象
      typeOptions: [{
        value: '普通教室',
        label: '普通教室'
      }, {
        value: '多媒体教室',
        label: '多媒体教室'
      }],
      buildingOptions: [{
        value: '明德楼',
        label: '明德楼'
      }, {
        value: '文德楼',
        label: '文德楼'
      }, {
        value: '逸夫楼',
        label: '逸夫楼'
      }],
      marks: {
        50: '50',
        100: '100',
        150: '150'
      },
      searchMap: {}
    }
  },
  created() {
    // 获取url中的教室id
    const cid = this.$route.params.cid
    // id为查询教室的id
    // 查询日期为今天
    this.searchMap.cid = cid
    this.searchMap.date = new Date()
    qrApi.getRoomSchedule(this.searchMap).then(response => {
      if (response.flag === true) {
        this.pojo = response.data
        this.pojo.disable1 = this.pojo.course1
        this.pojo.disable2 = this.pojo.course2
        this.pojo.disable3 = this.pojo.course3
        this.pojo.disable4 = this.pojo.course4
        this.pojo.course1 = false
        this.pojo.course2 = false
        this.pojo.course3 = false
        this.pojo.course4 = false
      }
    })
  },
  methods: {
    // 抓取列表数据
    fetchData(cid) {

    },

    // 教室预约确认
    handleReserveSubmit() {
      // 表单验证，要选择至少一个时间段
      if (!this.pojo.course1 && !this.pojo.course3 && !this.pojo.course4 && !this.pojo.course4) {
        this.$message({
          message: '请至少选择一个时间段！',
          type: 'warning'
        })
      } else {
        message.handleShowMessage(qrApi.reserve(this.pojo), this)
      }
    },

    handleReserveTest() {
      // 表单验证，要选择至少一个时间段
      if (!this.pojo.course1 && !this.pojo.course3 && !this.pojo.course4 && !this.pojo.course4) {
        this.$message({
          message: '请至少选择一个时间段！',
          type: 'warning'
        })
      } else {
        message.handleShowMessage(qrApi.test(this.pojo), this)
      }
    }
  }
}
</script>
