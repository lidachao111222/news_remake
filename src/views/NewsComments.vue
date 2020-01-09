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
        <span>回复</span>
      </div>
      <!-- 子组件 -->
      <div class="text">{{item.content}}</div>
      <citem :itemparent="item.parent" v-if="item.parent"></citem>
    </div>
  </div>
</template>

<script>
// 引入axios请求
import { getnewscomments } from '../apis/article'

// 引入组件
import citem from '../components/CommentItem'
export default {
  components: {
    citem
  },
  data () {
    return {
      data: []
    }
  },
  async mounted () {
    // console.log(this.$route.params.id)
    let res = await getnewscomments(this.$route.params.id, {
      pageIndex: 1,
      pageSize: 20
    })
    console.log(res)
    this.data = res.data.data
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
