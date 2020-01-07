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
        <van-field v-model="user.username" placeholder="请输入用户名/手机号码"  />
        <van-field v-model="user.nickname" placeholder="昵称"  />
        <van-field v-model="user.password" type="password" placeholder="密码" />
      </div>
      <br />
      <p class="tips">
        没有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <van-button type="danger" size="large" @click="login">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.user)
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
