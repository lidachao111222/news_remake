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
    <div class="nav">
      <van-tabs v-model="active">
        <van-tab :title="item.name" v-for="item in categorylist" :key="item.id">内容 1</van-tab>
      </van-tabs>
    </div>
    <!-- 新闻列表 -->
    <div class="newsList"></div>
  </div>
</template>

<script>
// 引入路由
import router from '../ulits/router'

// 引入api
import { category } from '../apis/article'
export default {
  data () {
    return {
      id: '',
      categorylist: [],
      active: localStorage.getItem('user_token') === null ? 0 : 1
    }
  },
  methods: {
    gohomepage () {
      // 提取id
      let id = localStorage.getItem('user_info')
      // 如果id存在时候时，跳转
      //   console.log(id)
      if (id) {
        id = JSON.parse(localStorage.getItem('user_info')).id
        this.id = id
        router.push({ path: `/user/${this.id}` })
      } else {
        router.push({ path: `/user/${this.id}` })
      }
    }
  },
  async mounted () {
    let res = await category()
    // 取回栏目列表数据，并且准备渲染
    this.categorylist = res.data.data
    // console.log(this.categorylist)
    // 重新改造categorylist
    this.categorylist = this.categorylist.map((element) => {
      return {
        ...element,
        pageSize: 5,
        pageIndex: 1,
        newslist: []
      }
    })
    console.log(this.categorylist)
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
