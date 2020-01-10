<template>
  <div class="app">
    <!-- 顶部栏目 -->
    <van-nav-bar title="栏目管理" left-text left-arrow @click-left="onClickLeft" />
    <!-- 删除频道 -->
    <div class="removelike">
      <h6>点击删除一下频道</h6>
      <van-button type="default" @click="remove">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="default">默认按钮</van-button>

      <van-button type="default">默认按钮</van-button>
    </div>
    <!-- 点击添加一下频道 -->
    <div class="addlike">
      <h6 class="secondline">点击添加一下频道</h6>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击左侧栏目，返回上一层
    onClickLeft () {
      history.back(-1)
    },
    remove () {
      this.$notify('提示文案')
    }
  }
}
</script>

<style lang="less" scoped>
//设定button
.van-button{
    width: 22%;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 10px;
}
.app {
  padding: 0px 10px;
}
h6 {
  color: #ccc;
  margin-top: 10px;
  padding-top: 10px;
}
.secondline {
  border-top: 1px solid #ccc;
}
</style>
