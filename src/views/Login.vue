<template>
  <div>
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <van-field v-model="user.username" placeholder="请输入用户名" @blur="ckeck1" />
        <van-field v-model="user.password" type="password" placeholder="请输入密码" @blur="ckeck2" />
      </div>
      <br />
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <van-button type="danger" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
// 引入axios api
import { login } from '../apis/login'
// 引入router
import router from '../ulits/router'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  // 方法集合
  methods: {
    // 登录方法
    async login () {
      //   console.log(this.user)
      let res = await login(this.user)
      //   console.log(res)
      // 判断登录是否成功
      if (res.data.message === '登录成功') {
        localStorage.setItem('user_token', res.data.data.token)
        localStorage.setItem('user_info', JSON.stringify(res.data.data.user))
        // 准备进行跳转
        router.push({ path: `/user/${res.data.data.user.id}` })
      } else {
        this.$toast.fail(res.data.message)
      }
    },
    // 失焦检验用户名格式方法
    ckeck1 () {
      if (!/^\d{4,11}$/.test(this.user.username)) {
        this.$toast.fail('用户名格式不对')
      }
    },
    // 失焦检验密码格式方法
    ckeck2 () {
      if (!/^\d{3,11}$/.test(this.user.username)) {
        this.$toast.fail('密码格式不对')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}

.van-cell:not(:last-child)::after {
  border-bottom: none;
}

.van-cell {
  border-bottom: none;
  border-bottom: 2px solid #ebedf0;
}

button {
  border-radius: 20px;
}
</style>
