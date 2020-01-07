<template>
  <div>
    <van-nav-bar title="编辑资料" left-text left-arrow @click-left="onClickLeft" />
    <div id="img"><img :src="'http://127.0.0.1:3000'+userinfo.head_img" alt=""></div>
    <van-cell title="昵称" :value="userinfo.nickname" is-link />
    <van-cell title="密码" :value="userinfo.password" is-link />
    <van-cell title="性别" :value="userinfo.gender === 0 ? '女':'男'" is-link />
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
  methods: {
    onClickLeft () {
      history.back(-1)
    }
  },
  // 使用mounter方法调用axios取回数据进行渲染
  async mounted () {
    let res = await userdata(this.$route.params.id)
    if (res.data.message === '获取成功') {
      this.userinfo = res.data.data
      console.log(this.userinfo)
    }
  }
}
</script>

<style lang="less" scoped>
img{
  width: 70/360*100vw;
  height: 70/360*100vh;
  border-radius: 50%;
  margin-left: 150/360*100vh;
}

</style>
