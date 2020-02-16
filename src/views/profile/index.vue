<template>
  <div class="app-container">
    <!-- 预约记录表格 -->
    <el-table
      :data="list"
      stripe
      border
      v-loading="listLoading">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        sortable
        prop="name"
        label="教室名">
      </el-table-column>

      <el-table-column
        sortable
        prop="date"
        label="使用日期">
      </el-table-column>

      <el-table-column
        sortable
        prop="course1"
        label="第1节课">
        <template slot-scope="scope">
          {{ scope.row.course1 ? '已选': '' }}
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="course2"
        label="第2节课">
        <template slot-scope="scope">
          {{ scope.row.course2 ? '已选': '' }}
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="course3"
        label="第3节课">
        <template slot-scope="scope">
          {{ scope.row.course3 ? '已选': '' }}
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="course4"
        label="第4节课">
        <template slot-scope="scope">
          {{ scope.row.course4 ? '已选': '' }}
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="reason"
        label="申请事由">
      </el-table-column>

      <el-table-column
        sortable
        prop="check"
        label="审核状态">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleCancelOpen(scope.row)">撤销预约</el-button>
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

    <!-- 分页 -->
    <br>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=currentPage
      :page-sizes="[7, 10, 20,]"
      :page-size="7"
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
      pageSize: 7, // 每页大小
      list: [], // 后端传回数据列表
      id: '', // 数据库id
      dialogCancelVisible: false, // 撤销预约对话框是否可见
      pojo: {}, // 撤回预约申请表单绑定的实体对象
      listLoading: true, // 加载中动画
      classroomName: '' // 教室名验证
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
    }
  }
}
</script>

