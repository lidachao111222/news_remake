<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="likeuser" :class="{bgc: data.has_follow}">{{follow}}</span>
    </div>
    <div class="detail">
      <div class="title">{{data.title}}</div>
      <div class="desc">
        <span>{{data.user && data.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="data.content"></div>
      <div class="opt">
        <span class="like" :class="{likecol: data.has_like}" @click="likeit">
          <van-icon name="good-job-o" />
          {{like}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
// 引入文章详情api
import { articldetail, unfollow, follows, like } from '../apis/article'
export default {
  data () {
    return {
      data: '',
      follow: '关注',
      like: '点赞'
    }
  },
  async mounted () {
    // 利用id 通过axios得到新闻详情
    // console.log(this.$route.params.id)
    let res = await articldetail(this.$route.params.id)
    this.data = res.data.data
    console.log(this.data)
  },
  methods: {
    // 关注作者
    async likeuser () {
      //   console.log(123)
      // 从localstorage中得到用户id
      // 发送axios请求
      if (this.data.has_follow) {
        // 如果已关注 则请求不关注
        let res1 = await unfollow(this.data.user.id)
        // console.log(res1)
        this.$toast.success(res1.data.message)
        this.follow = '关注'
      } else {
        // 如果未关注 则请求关注
        let res2 = await follows(this.data.user.id)
        // console.log(res2)
        this.$toast.success(res2.data.message)
        this.follow = '已关注'
      }
      // 转化样式用的
      this.data.has_follow = !this.data.has_follow
    },
    // 点赞事件
    async likeit () {
    //   console.log(this.data.has_like)
      let res1 = await like(this.data.id)
      // console.log(res1)
      this.data.has_like = !this.data.has_like
      this.$toast.success(res1.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    // background-color: #f00;
    color: #000;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.bgc {
  background-color: #f00;
  color: #fff !important;
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.likecol {
  background-color: red;
  color: #fff;
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
