<template>
  <div class="app-container">

    <!-- 新增教室/修改教室对话框 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="20%">
      <el-form :model="pojo" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="pojo.username" placeholder="教室名" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pojo.password" placeholder="密码" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="pojo.name" placeholder="姓名" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="pojo.role" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.row.id)" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, getUser, updateUser } from '@/api/user'
import message from '@/utils/message'

export default {
  data() {
    return {
      list: [], // 后端传回数据列表
      id: '', // 数据库id
      dialogVisible: false, // 弹出框是否可见
      pojo: {}, // 弹出框数据
      listLoading: true, // 加载中动画
      roleOptions: [{
        value: 'admin',
        label: '管理员'
      }, {
        value: 'teacher',
        label: '教师'
      }, {
        value: 'editor',
        label: '学生'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 抓取列表数据
    fetchData() {
      this.listLoading = true
      getUserList().then(response => {
        if (response.flag === true) {
          this.list = response.data
          console.log(this.list)
        }
        this.listLoading = false
      })
    },

    // 新增教室/修改教室弹出框
    handleEdit(id) {
      this.dialogVisible = true
      this.id = id
      if (this.id !== '') {
        getUser(this.id).then(response => {
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
        message.handleShowMessage(updateUser(this.pojo), this)
      } else {
        // 新增接口
      }
      this.dialogVisible = false // 隐藏窗口
    }
  }
}
</script>
