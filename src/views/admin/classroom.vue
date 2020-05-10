<template>
  <div class="app-container">

    <el-row>
      <!-- 新增教室 -->
      <el-col :xs="8" :sm="6" :lg="3">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleEdit('')" class="pan-btn green-btn">新增教室</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 批量新增教室 -->
      <el-col :xs="8" :sm="6" :lg="3">
        <el-upload
          action="http://localhost:8081/upload/classroom"
          ref="upload"
          :show-file-list="false"
          :limit="1"
          :before-upload="beforeExcelUpload"
          :on-success="handleExcelUploadSuccess">
          <el-button type="primary" icon="el-icon-upload2" class="pan-btn tiffany-btn"  @click="uploadExcelNotice">批量新增教室</el-button>
        </el-upload>
      </el-col>
      <!-- 批量新增日程 -->
      <el-col :xs="8" :sm="6" :lg="3">
        <el-upload
          action="http://localhost:8081/upload/schedule"
          ref="upload"
          :show-file-list="false"
          :limit="1"
          :before-upload="beforeExcelUpload"
          :on-success="handleExcelUploadSuccess">
          <el-button type="primary" icon="el-icon-upload2" class="pan-btn tiffany-btn"  @click="uploadExcelNotice">批量新增日程</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <!-- 新增教室/修改教室对话框 -->
    <el-dialog title="新增教室" :visible.sync="dialogVisible" width="30%">
      <el-form :model="pojo" label-width="100px">
        <el-form-item label="教室名">
          <el-input v-model="pojo.name" placeholder="教室名" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="教室楼层">
          <el-input-number v-model="pojo.floor" placeholder="教室楼层"></el-input-number>
        </el-form-item>
        <el-form-item label="教室容量">
          <el-input-number v-model="pojo.capacity" placeholder="教室容量"></el-input-number>
        </el-form-item>
        <el-form-item label="教学楼">
          <el-select v-model="pojo.building" placeholder="请选择">
            <el-option
              v-for="item in buildingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约类型">
          <el-select v-model="pojo.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否报修">
          <el-switch v-model="pojo.repair"  :active-value="true" :inactive-value="false"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 教室表格 -->
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
        label="教室名">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="building"
        label="教学楼">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="floor"
        label="教室楼层">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="capacity"
        label="教室容量">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip='true'
        prop="type"
        label="预约类型">
        <template slot-scope="scope">
          <i class="el-icon-user-solid" v-show="scope.row.type">&nbsp;{{'预约教室'}}</i>
          <i class="el-icon-user" v-show="!scope.row.type">&nbsp;{{'预约座位'}}</i>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="repair"
        label="是否报修">
        <template slot-scope="scope">
          <font color="red"><b>{{ scope.row.repair === true ?  '报修': '' }}</b></font>
          <font color="#228b22">{{ scope.row.repair === false ?  '正常使用': '' }}</font>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.row.id)" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" icon="el-icon-delete">删除</el-button>
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
import classroomApi from '@/api/classroom'
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
      listLoading: true, // 加载中动画
      // 教室预约类型
      typeOptions: [{
        value: false,
        label: '预约座位'
      }, {
        value: true,
        label: '预约教室'
      }],
      buildingOptions: [{
        value: '明德楼',
        label: '明德楼'
      }, {
        value: '文德楼',
        label: '文德楼'
      }]
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
      classroomApi.getPageList(this.currentPage, this.pageSize, this.searchMap).then(response => {
        if (response.flag === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 新增教室/修改教室弹出框
    handleEdit(id) {
      this.dialogVisible = true
      this.id = id
      if (this.id !== '') {
        classroomApi.findById(this.id).then(response => {
          if (response.flag === true) {
            this.pojo = response.data
          }
        })
      } else {
        this.pojo = {} // 清空表单
      }
    },
    // 编辑框确认
    handleSubmit() {
      if (this.id !== '') {
        // 更新接口
        message.handleShowMessage(classroomApi.update(this.id, this.pojo), this)
      } else {
        // 新增接口
        message.handleShowMessage(classroomApi.save(this.pojo), this)
      }
      this.dialogVisible = false // 隐藏窗口
    },
    // 表格单项删除
    handleDelete(id) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        message.handleShowMessage(classroomApi.deleteById(id), this)
      })
    },
    beforeExcelUpload(file) {
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isXLSX) {
        this.$message.error({
          message: '只能上传 XLSX 格式的文件 !',
          center: true
        })
      }
      if (!isLt5M) {
        this.$message.error({
          message: '上传文件大小不能超过 5MB !',
          center: true
        })
      }
      return isXLSX && isLt5M
    },
    handleExcelUploadSuccess() {
      this.$refs.upload.clearFiles()
      this.fetchData()
      this.$notify.success({
        title: '成功',
        message: '上传成功'
      })
    },
    uploadExcelNotice() {
      this.$notify.info({
        title: '提示',
        message: '上传xlsx文件，批量新增'
      })
    }
  }
}
</script>
