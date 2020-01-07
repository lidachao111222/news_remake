<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" @click="gohomepage" />
      </div>
    </div>
    <!-- 标签页 -->
    <div class="nav"></div>
    <!-- 新闻列表 -->
    <div class="newsList"></div>
  </div>
</template>

<script>
import router from '../ulits/router'
export default {
  data () {
    return {
      id: JSON.parse(localStorage.getItem('user_info')).id
    }
  },
  methods: {
    gohomepage () {
      router.push({ path: `/user/${this.id}` })
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
    .iconnew {
      font-size: 60px;
    }
  }
  .search {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    line-height: 40px;
  }
  .user {
    font-size: 25px;
    padding: 0 10px;
  }
}
</style>
