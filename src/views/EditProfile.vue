<template>
  <div>
    <van-nav-bar title="编辑资料" left-text left-arrow @click-left="onClickLeft" />
    <van-uploader :after-read="afterRead" />
    <div id="img">
      <img :src="'http://127.0.0.1:3000'+userinfo.head_img" alt />
    </div>
    <van-cell title="昵称" :value="userinfo.nickname" is-link @click="nickshow=!nickshow" />
    <!-- 昵称的dialog -->
    <van-dialog v-model="nickshow" title="昵称" show-cancel-button @confirm="updatenickname">
      <van-field
        :value="userinfo.nickname"
        placeholder="请输入用户名"
        required
        label="用户名"
        ref="nickname"
      />
    </van-dialog>
    <van-cell
      title="密码"
      :value=" typeof userinfo.password === 'number' ?'无法显示':'****'"
      is-link
      @click="passwordshow=!passwordshow"
    />
    <!-- 密码的dialog -->
    <van-dialog v-model="passwordshow" title="密码" show-cancel-button @confirm="updatepassword">
      <van-field placeholder="请输入老密码" required label="老密码" ref="oldpassword" />
      <van-field placeholder="请输入新密码" required label="新密码" ref="newpassword" />
    </van-dialog>

    <van-cell title="性别" :value="userinfo.gender === 0 ? '女':'男'" is-link    @click="gendershow=!gendershow"/>
    <!-- 性别的dialog -->
    <van-dialog v-model="gendershow" title="性别" show-cancel-button @confirm="updategender">
      <van-picker :columns="columns"  @change="onChange" :default-index="userinfo.gender"/>
    </van-dialog>
  </div>
</template>

<script>
// 引入axios
import { userdata, updateinfo } from '../apis/login'
import { upload } from '../apis/upload'
export default {
  data () {
    return {
      userinfo: '',
      nickshow: false,
      passwordshow: false,
      gendershow: false,
      columns: ['女', '男'],
      index: ''
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
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        // 替换照片（数据库还没有替换）
        this.userinfo.head_img = res.data.data.url

        // axios请求，更新后台图片路径
        let res2 = await updateinfo(this.$route.params.id, {
          head_img: res.data.data.url
        })
        // console.log(res2)
        // 如果成功，有提示
        this.$toast.success(res2.data.message)
      } else {
        this.$toast.fail('文件上传失败')
      }
    },
    // 更新用户名
    async updatenickname () {
      // console.log(213)
      // console.log(this.$refs.nickname.$refs.input.value)
      // console.log(this.userinfo.nickname)
      // 调用axios请求

      let newname = this.$refs.nickname.$refs.input.value
      console.log(this.$refs.nickname.$refs.input.value)
      let res = await updateinfo(this.$route.params.id, {
        nickname: this.$refs.nickname.$refs.input.value
      })
      // console.log(res.data.message)
      // console.log(newname)
      // console.log(112)
      console.log(this.$refs.nickname.$refs.input.value)
      // console.log(res)
      if (res.data.message === '修改成功') {
        // console.log(this.userinfo.nickname)
        // console.log(this.$refs.nickname.$refs.input.value)
        // 直接赋值不行
        // let newname = this.$refs.nickname.$refs.input.value
        this.userinfo.nickname = newname
        // 的把服务器传回来的nickname赋值才行
        // this.userinfo.nickname = res.data.data.nickname
        this.$toast.success(res.data.message)
      }
    },
    // 更新密码
    async updatepassword () {
      // console.log(this.$refs.oldpassword.$refs.input.value)
      // console.log(this.$refs.newpassword.$refs.input.value)
      // 判断输入的密码是否是老密码, 如果不是，请求再输入一次
      if (this.$refs.oldpassword.$refs.input.value !== this.userinfo.password) {
        this.$toast.fail('输入的老密码不对')
      } else {
        // 这里不正则判断了
        // axios请求
        let res = await updateinfo(this.$route.params.id, {
          password: this.$refs.newpassword.$refs.input.value
        })
        if (res.data.message === '修改成功') {
          // 直接赋值失败
          // this.userinfo.password = this.$refs.newpassword.$refs.input.value
          // 的把服务器传回来的密码赋值才行
          this.userinfo.password = JSON.parse(res.config.data).password
          this.$toast.success('修改成功')
        }
      }
    },
    // 更新性别
    async updategender () {
      // axios修改请求
      let res = await updateinfo(this.$route.params.id, {
        gender: this.index
      })
      // console.log(res)
      if (res.data.message === '修改成功') {
        // this.userinfo.gender = res.data.data.nickname
        // console.log(res)
        this.$toast.success(res.data.message)
        this.userinfo.gender = JSON.parse(res.config.data).gender
      }
    },
    onChange (picker, value, index) {
      // console.log(index)
      this.index = index
    }
  },
  // 使用mounter方法调用axios取回数据进行渲染
  async mounted () {
    let res = await userdata(this.$route.params.id)
    if (res.data.message === '获取成功') {
      this.userinfo = res.data.data
      // console.log(this.userinfo)
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
