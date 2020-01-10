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
    <van-icon name="plus" class="plus" @click="channel"/>
    <div class="nav">
      <!-- 顶部tab栏 -->
      <van-tabs v-model="active" swipeable sticky>
        <van-tab :title="item.name" v-for="item in categorylist" :key="item.id">
          <!-- PullRefresh 下拉刷新组件 -->
          <van-pull-refresh v-model="categorylist[active].isLoading" @refresh="onRefresh">
          <!-- List 列表 -->
          <van-list
            v-model="categorylist[active].loading"
            :finished="categorylist[active].finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <!-- 自定义组件 -->
            <eachnews v-for="item in categorylist[active].newslist" :key="item.id" :data="item" @click="click"></eachnews>
          </van-list>
          </van-pull-refresh>
        </van-tab>
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
import { category, articlelist } from '../apis/article'

// 引入栏目的新闻列表
import eachnews from '../components/Eachnews'

export default {
  // 引入栏目的新闻列表
  components: {
    eachnews
  },
  data () {
    return {
      id: '',
      categorylist: [],
      active: localStorage.getItem('user_token') === null ? 0 : 1
    }
  },
  methods: {
    channel () {
      console.log(123)
      router.push({ path: `/changchannel` })
    },
    // 自定义组件的click事件
    click (data) {
      // console.log(data)
      router.push({ path: `/newsdetail/${data}` })
    },
    // 点击用户头像返回到用户也面
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
    },
    async init () {
      // 如果isLoading 为true 则说明刷新了，需要进行判断
      if (this.categorylist[this.active].isLoading) {
        this.$toast('刷新成功')
        this.categorylist[this.active].isLoading = false
        this.categorylist[this.active].pageIndex = 1
        this.categorylist[this.active].finished = false
      }
      // 发送axios请求得到文章列表
      let res1 = await articlelist({
        pageIndex: this.categorylist[this.active].pageIndex,
        pageSize: this.categorylist[this.active].pageSize,
        category: this.categorylist[this.active].id
      })
      // 如果页面数不为1 把后面取到的数据补回带原来的数据里面
      if (this.categorylist[this.active].pageIndex === 1) {
        // 存回原来的对应栏目的数组中
        this.categorylist[this.active].newslist = res1.data.data
      } else if (this.categorylist[this.active].pageIndex !== 1) {
        this.categorylist[this.active].newslist.push(...res1.data.data)
      }
      // 如果取回数据的长度不等于pageSize，则表明数据取完了
      // 加载完成，finished为true，此时不会触发load事件
      if (res1.data.data.length !== this.categorylist[this.active].pageSize) {
        this.categorylist[this.active].finished = true
      } else {
        // onload事件触发后把当前栏的loding值改回为false
        this.categorylist[this.active].loading = false
      }
    },
    // List 列表load事件
    onLoad () {
      // console.log(123)
      ++this.categorylist[this.active].pageIndex
      // console.log(this.categorylist[this.active].pageIndex)
      this.init()
    },
    // 下拉刷新时会触发 refresh 事件
    onRefresh () {
      // console.log(123)
      // 把该栏的newlist清空 然后再次请求数据
      this.categorylist[this.active].newslist = []
      this.init()
    }
  },
  async mounted () {
    // 页面一加载的时候，进行axios数据请求，得到栏目列表并对回传的数据进行改造
    let res = await category()
    // 取回栏目列表数据，并且准备渲染
    this.categorylist = res.data.data
    // console.log(this.categorylist)
    // 重新改造categorylist
    this.categorylist = this.categorylist.map(element => {
      return {
        ...element,
        pageSize: 5,
        pageIndex: 1,
        newslist: [],
        loading: false,
        finished: false,
        isLoading: false
      }
    })
    // console.log(this.categorylist)
    // console.log(this.categorylist[this.active].id)
    this.init()
    // console.log(this.categorylist)
  },
  // watch属性
  watch: {
    // 侦听器，检查active的值的变化
    active: function (currentactive) {
      this.active = currentactive
      //   console.log(this.active)
      // 的到文章列表的id
      //   console.log(this.categorylist[this.active].id)
      //  调用方法取回文章列表
      if (this.categorylist[this.active].newslist.length === 0) {
        this.init()
        // console.log(this.categorylist)
      }
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
.plus{
  margin-top: 5px;
  font-size: 30px;
  position: -webkit-sticky;
  float:right;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
}
</style>
