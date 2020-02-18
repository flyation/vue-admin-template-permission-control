<template>
  <div class="app-container">
    <!-- 预约记录表格 -->
    <el-table
      :data="list"
      stripe
      border
      max-height="480"
      v-loading="listLoading">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        sortable
        width="90"
        prop="name"
        label="教室名">
      </el-table-column>
      <el-table-column
        sortable
        width="120"
        prop="date"
        label="使用日期">
      </el-table-column>
      <el-table-column
        width="80"
        prop="course1"
        label="第1节课">
        <template slot-scope="scope">
          &nbsp; &nbsp;
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course1"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="75"
        prop="course2"
        label="第2节课">
        <template slot-scope="scope">
          &nbsp;
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course2"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="75"
        prop="course3"
        label="第3节课">
        <template slot-scope="scope">
          &nbsp;
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course3"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="75"
        prop="course4"
        label="第4节课">
        <template slot-scope="scope">
          &nbsp;
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course4"></el-button>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="reason"
        label="申请事由">
      </el-table-column>

      <el-table-column
        width="90"
        prop="checked"
        label="审核状态">
        <template slot-scope="scope">
          <font color="#b8860b"><b>{{ scope.row.checked === "待审" ?  '待审': '' }}</b></font>
          <font color="#228b22"><b>{{ scope.row.checked === "通过" ?  '通过': '' }}</b></font>
          <font color="#dc143c"><b>{{ scope.row.checked === "否决" ?  '否决': '' }}</b></font>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        width="180"
        prop="time1"
        label="申请时间">
      </el-table-column>

      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleDetail(scope.row)" icon="el-icon-document">流程</el-button>
          <el-button type="warning" size="small" @click="handleCancelOpen(scope.row)" v-if="scope.row.cancel === false" icon="el-icon-delete">撤销</el-button>
          <el-button type="warning" size="small" v-else ><font color="#dc143c"><b>已取消&nbsp;</b></font></el-button>
<!--          <font color="#dc143c"><b>{{ scope.row.cancel === true ?  '已取消': '' }}</b></font>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 教室预约对话框 -->
    <el-dialog title="撤销预约" :visible.sync="dialogCancelVisible" width="30%">
      为防止误操作，请输入您要撤销预约的教室名<br><br><br>
      <el-input v-model="classroomName" placeholder="请输入教室名"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCancelVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCancelSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 流程时间线 -->
    <el-dialog
      title="时间线"
      :visible.sync="dialogDetailVisible"
      width="30%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.color"
          :icon="activity.icon"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <br>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=currentPage
      :page-sizes="[5, 10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
</template>

<script>
import reserveApi from '@/api/reserve'
import message from '@/utils/message'

export default {
  data() {
    return {
      total: 0, // 总记录数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页大小
      list: [], // 后端传回数据列表
      id: '', // 数据库id
      dialogCancelVisible: false, // 撤销预约对话框是否可见
      dialogDetailVisible: false, // 撤销预约对话框是否可见
      pojo: {}, // 撤回预约申请表单绑定的实体对象
      listLoading: true, // 加载中动画
      classroomName: '', // 撤销预约时的教室名验证
      activities: [] // 时间线
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },

    // 抓取列表数据
    fetchData() {
      this.listLoading = true
      reserveApi.getUserRecordList(this.currentPage, this.pageSize, 0).then(response => {
        if (response.flag === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },

    // 撤销预约对话框打开
    handleCancelOpen(row) {
      this.dialogCancelVisible = true
      this.classroomName = ''
      this.id = row.id
      this.pojo.name = row.name // 教室名验证
    },
    // 撤销预约对话框确认
    handleCancelSubmit() {
      if (this.classroomName === this.pojo.name) {
        message.handleShowMessage(reserveApi.cancel(this.id), this)
        this.dialogCancelVisible = false
      } else {
        this.$message.error('教室名错误')
      }
    },
    // 时间线
    handleDetail(row) {
      this.dialogDetailVisible = true
      const activity1 = { content: '提交预约申请', timestamp: row.time1, color: '#409EFF' }
      const activity2 = { content: '等待管理员审核', timestamp: row.time1, color: '#409EFF', icon: 'el-icon-more' }
      const activity3 = { content: '审核已通过', timestamp: row.time2, color: '#67C23A', icon: 'el-icon-check' }
      const activity4 = { content: '审核被否决', timestamp: row.time2, color: '#F56C6C', icon: 'el-icon-close' }
      const activity5 = { content: '取消申请了', timestamp: row.time3, color: '#E6A23C', icon: 'el-icon-minus' }
      this.activities = []
      this.activities.push(activity1)
      this.activities.push(activity2)
      if (row.checked === '通过') {
        this.activities.push(activity3)
      } else if (row.checked === '否决') {
        this.activities.push(activity4)
      }
      if (row.cancel) {
        this.activities.push(activity5)
      }
    }
  }
}
</script>

