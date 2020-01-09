<template>
  <div class="focus">
    <div class="header">
      <van-nav-bar title="我的关注" left-text left-arrow @click-left="$router.back()" />
    </div>
    <div class="list">
      <div class="box" v-for="item in data" :key="item.id">
        <img :src='"http://127.0.0.1:3000"+item.head_img' alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>{{item.create_date}}</span>
        </div>
        <span>取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入用户关注的列表请求
import { favouruser } from '../apis/article'
export default {
  data () {
    return {
      data: ''
    }
  },
  // 加载页面是axios取回数据
  async mounted () {
    let res = await favouruser()
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
</style>
