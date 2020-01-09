<template>
  <div class="focus">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar title="精彩跟帖" left-text left-arrow @click-left="$router.back()" />
    </div>
    <!-- 评论页面单层 -->
    <div class="item" v-for="item in data" :key="item.id">
      <div class="head">
        <img :src="'http://127.0.0.1:3000'+item.user.head_img" alt />
        <div>
          <p>{{item.user.nickname}}</p>
          <span>{{item.create_date}}</span>
        </div>
        <span @click="firstlevelreply(item)">回复</span>
      </div>
      <!-- 子组件 -->
      <div class="text">{{item.content}}</div>
      <citem :itemparent="item.parent" v-if="item.parent"></citem>
    </div>
    <!-- 评论 -->
    <leavecomment :data="whicknews" @feedbacksuccess="issuccess" :obj="obj"  @reset='reset'></leavecomment>
  </div>
</template>

<script>
// 引入axios请求得到所有一级评论
// 得到是那篇新闻的数据，因为leavecomment子组件需要
import { getnewscomments, articldetail } from '../apis/article'

// 引入子组件组件(评论页面)
import citem from '../components/CommentItem'

// 引入评论组件
import leavecomment from '../components/LeftComment'

export default {
  components: {
    citem,
    leavecomment
  },
  data () {
    return {
      // 把所有一级评论存到data中
      data: [],
      // 把通过id得到是哪一篇新闻的信息存起来
      whicknews: '',
      obj: null
    }
  },
  async mounted () {
    // 通过axios请求得到所有一级评论
    // console.log(this.$route.params.id)
    // let res = await getnewscomments(this.$route.params.id, {
    //   pageIndex: 1,
    //   pageSize: 20
    // })
    // // console.log(res)
    // this.data = res.data.data

    // 得到是那篇新闻的数据，因为leavecomment子组件需要
    let res2 = await articldetail(this.$route.params.id)
    this.whicknews = res2.data.data
    this.getdata()
  },
  methods: {
    // obj重置方法
    reset () {
      this.obj = null
    },
    // 这个组件的点击回复触发事件
    firstlevelreply (item) {
      // console.log(item)
      this.obj = item
    },
    // 是否评论成功
    issuccess () {
      // console.log(3123124124)
      // 如果成功，刷新数据
      this.getdata()
    },
    // 封装得到所有评论的方法
    async getdata () {
      let res = await getnewscomments(this.$route.params.id, {
        pageIndex: 1,
        pageSize: 20
      })
      // console.log(res)
      this.data = res.data.data
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}

.item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>
