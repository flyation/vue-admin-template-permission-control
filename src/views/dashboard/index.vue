<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleChangeRouter1">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              预约记录
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleChangeRouter2">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              预约座位
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
        <div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="5">
        <el-card class="box-card">
<!--          <div slot="header" class="clearfix">-->
<!--            -->
<!--          </div>-->
          <div class="text item">
            <b class="el-icon-user">&nbsp;{{ name }}</b>&nbsp;
            <span v-for="role in roles" :key="role">
              <el-tag type="primary" v-show="role === 'admin'">管理员</el-tag>
              <el-tag type="success" v-show="role === 'teacher'">教师</el-tag>
              <el-tag type="warning" v-show="role === 'editor'">学生</el-tag>
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

<!--    <div class="dashboard-text">name: {{ name }}</div>-->
<!--    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <mallki class-name="mallki-text" :text="this.$store.state.user.avatar" />

  <el-carousel :interval="2000" type="card" height="370px">
    <el-carousel-item>
      <img src='../../assets/carousel/1.jpg' class="carousel_image_type">
    </el-carousel-item>
    <el-carousel-item>
      <img src='../../assets/carousel/2.jpg' class="carousel_image_type">
    </el-carousel-item>
    <el-carousel-item>
      <img src='../../assets/carousel/3.jpg' class="carousel_image_type">
    </el-carousel-item>
    <el-carousel-item>
      <img src='../../assets/carousel/4.jpg' class="carousel_image_type">
    </el-carousel-item>
    <el-carousel-item>
      <img src='../../assets/carousel/5.jpg' class="carousel_image_type">
    </el-carousel-item>
    <el-carousel-item>
      <img src='../../assets/carousel/6.jpg' class="carousel_image_type">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    Mallki
  },
  data() {
    return {
      imgs: [
        '../../assets/carousel/1.jpg',
        '../../assets/carousel/2.jpg',
        '../../assets/carousel/3.jpg'
      ]
    }
  },
  methods: {
    handleChangeRouter1() {
      this.$router.push({ name: 'Record' })
    },
    handleChangeRouter2() {
      this.$router.push({ name: 'Seat' })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.carousel_image_type{
  width: 100%;
}
</style>

// panel group
<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
