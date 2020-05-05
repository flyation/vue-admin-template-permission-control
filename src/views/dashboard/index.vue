<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <mallki class-name="mallki-text" :text="this.$store.state.user.avatar" />

  <el-carousel :interval="2000" type="card" height="400px">
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
