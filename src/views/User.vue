<template>
  <div class="personal">
    <router-link :to="'/editprofile/'+ this.$route.params.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="'http://127.0.0.1:3000'+ userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{userinfo.nickname}}
          </div>
          <div class="time">{{userinfo.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <van-cell title="我的关注" value="关注的用户" is-link />
    <van-cell title="我的跟帖" value="跟帖/回复" is-link />
    <van-cell title="我的收藏" value="文章/视频" is-link />
    <van-cell title="设置" is-link />
  </div>
</template>

<script>
// 引入axios
import { userdata } from '../apis/login'
export default {
  data () {
    return {
      userinfo: ''
    }
  },
  // 使用mounter方法调用axios取回数据进行渲染
  async mounted () {
    let res = await userdata(this.$route.params.id)
    if (res.data.message === '获取成功') {
      this.userinfo = res.data.data
    //   console.log(this.userinfo)
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
