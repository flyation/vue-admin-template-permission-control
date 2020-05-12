<template>
  <div class="app-container">

    <!-- 查询按钮 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearchOpen()" class="pan-btn green-btn">搜索教室</el-button>
      </el-form-item>
    </el-form>

    <!-- 条件查询对话框 绑定数据：searchMap -->
    <el-dialog title="条件查询" :visible.sync="dialogSearchVisible" width="30%">
      <el-form :model="searchMap" label-width="100px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="searchMap.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择时间段">
            <el-checkbox label="第1节课" v-model="searchMap.course1"></el-checkbox>
            <el-checkbox label="第2节课" v-model="searchMap.course2"></el-checkbox>
            <el-checkbox label="第3节课" v-model="searchMap.course3"></el-checkbox>
            <el-checkbox label="第4节课" v-model="searchMap.course4"></el-checkbox>
        </el-form-item>

        <el-form-item label="教室容量">
          <el-slider
            v-model="searchMap.capacity"
            show-stops
            :step="50"
            :max="200">
          </el-slider>
        </el-form-item>

        <el-form-item label="教学楼">
          <el-select v-model="searchMap.building" placeholder="请选择" clearable>
            <el-option
              v-for="item in buildingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSearchVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSearchSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 日程表格 绑定数据：list -->
    <el-table
      @cell-dblclick="handleRepairOpen"
      :data="list"
      stripe
      border
      max-height="500"
      v-loading="listLoading">
      <el-table-column
        align="center"
        type="index">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        label="教室名">
        <template slot-scope="scope">
          <font color="#409EFF">{{scope.row.name}}</font>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100%"
        sortable
        prop="building"
        label="教学楼">
      </el-table-column>
      <el-table-column
        width="80%"
        align="center"
        sortable
        prop="floor"
        label="楼层">
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        sortable
        prop="capacity"
        label="教室容量">
      </el-table-column>

      <el-table-column
        align="center"
        sortable
        prop="date"
        label="日期">
      </el-table-column>

      <el-table-column
        align="center"
        sortable
        prop="course1"
        label="第1节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course1 ? '被占用': '' }}</font>
          <font color="228b22"><b>{{ scope.row.course1 ? '': '空闲' }}</b></font>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        sortable
        prop="course2"
        label="第2节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course2 ? '被占用': '' }}</font>
          <font color="228b22"><b>{{ scope.row.course2 ? '': '空闲' }}</b></font>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        sortable
        prop="course3"
        label="第3节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course3  ? '被占用': '' }}</font>
          <font color="228b22"><b>{{ scope.row.course3 ? '': '空闲' }}</b></font>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        sortable
        prop="course4"
        label="第4节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course4 ? '被占用': '' }}</font>
          <font color="228b22"><b>{{ scope.row.course4 ? '': '空闲' }}</b></font>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        width="150px"
        label="操作">
        <template slot-scope="scope">
          <el-button class="pan-btn light-blue-btn" @click="handleReserveOpen(scope.row)" icon="el-icon-shopping-cart-2">预约</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 预约申请对话框 绑定数据：pojo -->
    <el-dialog title="预约申请" :visible.sync="dialogReserveVisible" width="30%">
      <el-form :model="pojo" label-width="90px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="pojo.date"
            type="date"
            disabled
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择时间段">
          <el-checkbox label="第1节课" v-model="pojo.course1" :disabled="pojo.disable1"></el-checkbox>
          <el-checkbox label="第2节课" v-model="pojo.course2" :disabled="pojo.disable2"></el-checkbox>
          <el-checkbox label="第3节课" v-model="pojo.course3" :disabled="pojo.disable3"></el-checkbox>
          <el-checkbox label="第4节课" v-model="pojo.course4" :disabled="pojo.disable4"></el-checkbox>
        </el-form-item>

        <el-form-item label="教室容量">
          <el-slider
            width="50%"
            v-model="pojo.capacity"
            show-stops
            :step="50"
            :max="250"
            :marks="marks"
            disabled>
          </el-slider>
        </el-form-item>

        <el-form-item label="教学楼">
          <el-input v-model="pojo.building" disabled></el-input>
        </el-form-item>

        <el-form-item label="预约原因">
          <el-input v-model="pojo.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogReserveVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleReserveSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 教室报修对话框 绑定数据：classroom -->
    <el-dialog title="教室报修" :visible.sync="dialogRepairVisible" width="30%">
      <el-form :model="classroom" label-width="80px">
        <el-form-item label="教室名">
          <font color="#6495ed">{{classroom.name}}</font>
        </el-form-item>
<!--        <el-form-item label="图片" prop="file">-->
<!--          <el-upload-->
<!--            :on-change="handleChange"-->
<!--            :auto-upload="false"-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="https://jsonplaceholder.typicode.com/posts/">-->
<!--            <i class="el-icon-upload"></i>-->
<!--            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-form-item label="报修详情">
          <el-input v-model="classroom.detail" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogRepairVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleRepairSubmit">确 定</el-button>
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
      dialogSearchVisible: false, // 条件查询对话框是否可见
      dialogReserveVisible: false, // 预约申请对话框是否可见
      dialogRepairVisible: false, // 教室报修对话框是否可见
      dialogVisible: false,
      pojo: {}, // 预约申请表单绑定的实体对象
      classroom: {}, // 教室报修表单绑定的实体对象
      listLoading: true, // 加载中动画
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
      searchMap: {} // 查询表单绑定的实体对象
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
      // 设置查询日期为今天
      this.searchMap.date = new Date()
      reserveApi.getScheduleRoomList(this.currentPage, this.pageSize, this.searchMap).then(response => {
        if (response.flag === true) {
          this.list = response.data.rows
          this.total = response.data.total
        }
        this.listLoading = false
      })
    },
    // 条件查询对话框打开
    handleSearchOpen() {
      this.searchMap = { capacity: 0, course1: false, course2: false, course3: false, course4: false }
      this.dialogSearchVisible = true
    },
    // 条件查询对话框确认
    handleSearchSubmit() {
      reserveApi.getScheduleRoomList(this.currentPage, this.pageSize, this.searchMap).then(response => {
        if (response.flag === true) {
          this.list = response.data.rows
          this.total = response.data.total
          // 查询结果的消息提示
          if (response.data.total) {
            this.$message({
              message: `查询成功，共${response.data.total}条结果`,
              type: 'success'
            })
          } else {
            this.$message({
              message: `很抱歉，没有满足条件的结果`,
              type: 'warning'
            })
          }
        }
      })
      this.dialogSearchVisible = false // 隐藏窗口
    },
    // 教室预约对话框打开
    handleReserveOpen(row) {
      this.dialogReserveVisible = true
      this.pojo = { ...row }
      this.pojo.disable1 = row.course1
      this.pojo.disable2 = row.course2
      this.pojo.disable3 = row.course3
      this.pojo.disable4 = row.course4
      this.pojo.course1 = false
      this.pojo.course2 = false
      this.pojo.course3 = false
      this.pojo.course4 = false
      this.pojo.uid = 19980307
    },
    // 教室预约对话框确认
    handleReserveSubmit() {
      console.log(this.pojo)
      // 表单验证，要选择至少一个时间段
      if (!this.pojo.course1 && !this.pojo.course2 && !this.pojo.course3 && !this.pojo.course4) {
        this.$message({
          message: '请至少选择一个时间段！',
          type: 'warning'
        })
      } else {
        message.handleShowMessage(reserveApi.apply(this.pojo), this)
        this.dialogReserveVisible = false // 隐藏窗口
      }
    },
    // 教室报修对话框打开
    handleRepairOpen(row, cell) {
      if (cell.property === 'name') {
        this.dialogRepairVisible = true
        this.classroom = row
        console.log(row)
      }
    },
    // 教室报修对话框确认
    handleRepairSubmit() {
      console.log(this.classroom)
      // 表单验证，必填报修详情
      if (!this.classroom.detail) {
        this.$message({
          message: '请填写报修详情！',
          type: 'warning'
        })
      } else {
        message.handleShowMessage(reserveApi.repair(this.classroom), this)
        this.dialogRepairVisible = false // 隐藏窗口
      }
    }
  }
}
</script>
