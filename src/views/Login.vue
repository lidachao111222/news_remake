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
        <van-field v-model="user.name" placeholder="请输入用户名" :border="true" />
        <van-field v-model="user.password" type="password" placeholder="请输入密码" :border="true" />
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
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
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
