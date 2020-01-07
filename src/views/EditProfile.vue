<template>
  <div>
    <van-nav-bar title="编辑资料" left-text left-arrow @click-left="onClickLeft" />
    <van-uploader :after-read="afterRead" />
    <div id="img">
      <img :src="'http://127.0.0.1:3000'+userinfo.head_img" alt />
    </div>
    <van-cell title="昵称" :value="userinfo.nickname" is-link />
    <van-cell title="密码" :value="userinfo.password" is-link />
    <van-cell title="性别" :value="userinfo.gender === 0 ? '女':'男'" is-link />
  </div>
</template>

<script>
// 引入axios
import { userdata } from '../apis/login'
import { upload } from '../apis/upload'
export default {
  data () {
    return {
      userinfo: ''
    }
  },
  methods: {
    // 点击左侧栏目，返回上一层
    onClickLeft () {
      history.back(-1)
    },
    // 上传文件
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file.file)
      // 使用fromdata转化数据
      let formdata = new FormData()
      formdata.append('file', file.file)
      // 使用axios请求上传图片
      let res = await upload(formdata)
      console.log(res)
      if (res.data.message === '文件上传成功') {
        // 如果成功，有提示
        this.$toast.success(res.data.message)
        // 替换照片（数据库还没有替换）
        this.userinfo.head_img = res.data.data.url
      } else {
        this.$toast.fail('文件上传失败')
      }
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
img {
  width: 70/360 * 100vw;
  height: 70/360 * 100vh;
  border-radius: 50%;
  margin-left: 150/360 * 100vh;
}
#img {
  position: absolute;
  margin-top: -75/360 * 100vh;
}
/deep/.van-uploader__upload {
  width: 150px;
  height: 150px;
}
/deep/.van-uploader {
  margin-left: 150/360 * 100vh;
  opacity: 0;
  z-index: 1000;
}
</style>
