<template>
  <div class="app-container">

    <!-- 报修表格 -->
    <el-table
      :data="list"
      stripe
      border
      v-loading="listLoading"
      max-height="500"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        width="200%"
        label="教室名">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="building"
        width="200%"
        label="教学楼">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="date"
        width="200%"
        label="报修时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="detail"
        label="报修详情">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import repairApi from '@/api/repair'

export default {
  data() {
    return {
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
      repairApi.findAll().then(response => {
        if (response.flag === true) {
          this.list = response.data
        }
        this.listLoading = false
      })
    }
  }
}
</script>
