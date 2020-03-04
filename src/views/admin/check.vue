<template>
  <div class="app-container">

    <!-- 教室表格 -->
    <el-table
      :data="list"
      stripe
      border
      v-loading="listLoading"
      max-height="480"
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        width="100px"
        sortable
        prop="username"
        label="预约人">
      </el-table-column>
      <el-table-column
        align="center"
        width="100px"
        sortable
        prop="name"
        label="教室">
      </el-table-column>
      <el-table-column
        align="center"
        width="150px"
        sortable
        prop="date"
        label="使用日期">
      </el-table-column>
      <el-table-column
        align="center"
        width="75"
        prop="course1"
        label="第1节课">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course1"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="75"
        prop="course2"
        label="第2节课">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course2"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="75"
        prop="course3"
        label="第3节课">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course3"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="75"
        prop="course4"
        label="第4节课">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle size="small" v-if="scope.row.course4"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip='true'
        prop="reason"
        label="申请事由">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleCheckOpen(scope.row.id, true)" icon="el-icon-check">通过</el-button>
          <el-button type="danger" size="small" @click="handleCheckOpen(scope.row.id, false)" icon="el-icon-close">否决</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <br>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=currentPage
      :page-sizes="[5, 10, 20,]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
</template>

<script>
import CheckApi from '@/api/check'
import message from '@/utils/message'

export default {
  data() {
    return {
      total: 0, // 总记录数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页大小
      list: [], // 后端传回数据列表
      id: '', // 数据库id
      dialogVisible: false, // 弹出框是否可见
      pojo: {}, // 弹出框数据
      listLoading: true // 加载中动画
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
      CheckApi.getReserveList(this.currentPage, this.pageSize).then(response => {
        if (response.flag === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 通过/否决
    handleCheckOpen(id, flag) {
      if (flag) {
        message.handleShowMessage(CheckApi.check(id, true), this)
      } else {
        message.handleShowMessage(CheckApi.check(id, false), this)
      }
    },
    // 编辑框确认
    handleSubmit() {
      if (this.id !== '') {
        // 更新接口
        message.handleShowMessage(CheckApi.update(this.id, this.pojo), this)
      } else {
        // 新增接口
        message.handleShowMessage(CheckApi.save(this.pojo), this)
      }
      this.dialogVisible = false // 隐藏窗口
    }
  }
}
</script>

<style lang="css">
  /* 表格内文字过多时省略号显示，弹出框显示全部文字时的样式 */
  .el-tooltip__popper{font-size: 14px; max-width:25% } /*设置显示隐藏部分内容，按50%显示*/
</style>
