<template>
  <div class="app">
      <!-- 顶部栏目 -->
    <van-nav-bar title="栏目管理" left-text left-arrow @click-left="onClickLeft" />
    <!-- 删除频道 -->
    <h4>点击删除一下频道</h4>
    <!-- 点击添加一下频道 -->
    <h4>点击添加一下频道</h4>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击左侧栏目，返回上一层
    onClickLeft () {
      history.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.app{
    padding: 0px 10px
}
h4{
    color: #ccc;
    margin-top: 10px;
}
</style>
