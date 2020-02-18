<template>
  <div class="app-container">
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="handleEdit('')" icon="el-icon-circle-plus-outline" >新增教室</el-button>
      </el-form-item>
    </el-form>

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
        <el-form-item label="教室类型">
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
      max-height="480"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        sortable
        prop="name"
        label="教室名"
        width="180">
      </el-table-column>
      <el-table-column
        sortable
        prop="building"
        label="教学楼">
      </el-table-column>
      <el-table-column
        sortable
        prop="floor"
        label="教室楼层">
      </el-table-column>
      <el-table-column
        sortable
        prop="type"
        label="教室类型">
      </el-table-column>
      <el-table-column
        sortable
        prop="capacity"
        label="教室容量">
      </el-table-column>
      <el-table-column
        sortable
        prop="repair"
        label="是否报修">
        <template slot-scope="scope">
          <font color="red"><b>{{ scope.row.repair === true ?  '报修': '' }}</b></font>
          <font color="#228b22">{{ scope.row.repair === false ?  '正常使用': '' }}</font>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!--        <el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">查看</el-button>-->
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
      // 教室类型选项
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
    }
  }
}
</script>
