<template>
  <div class="app">
    <!-- 顶部栏目 -->
    <van-nav-bar title="栏目管理" left-text left-arrow @click-left="onClickLeft" />
    <!-- 删除频道 -->
    <div class="removelike">
      <h6>点击删除一下频道</h6>
      <van-button
        type="default"
        @click="remove(index)"
        v-for="(item, index) in likelist"
        :key="item.id"
      >{{item.name}}</van-button>
    </div>
    <!-- 点击添加一下频道 -->
    <div class="addlike">
      <h6 class="secondline">点击添加一下频道</h6>
      <van-button
        type="default"
        @click="add(index)"
        v-for="(item, index) in addlist"
        :key="item.id"
      >{{item.name}}</van-button>
    </div>
  </div>
</template>

<script>
// 引入栏目请求
import { category } from '../apis/article'

export default {
  data () {
    return {
      likelist: [
      ],
      addlist: []
    }
  },
  methods: {
    // 点击左侧栏目，返回上一层
    onClickLeft () {
      history.back(-1)
    },
    // 移除栏目方法
    remove (index) {
      // 得到序号
      console.log(index)
      // 添加数据到addlist中
      this.addlist.unshift(this.likelist[index])
      // 移除likelist的数据
      this.likelist.splice(index, 1)

      this.$notify('移除成功')
    },
    // 添加栏目方法
    add (index) {
      // 得到序号
      console.log(index)
      // 添加数据到likelist中
      this.likelist.unshift(this.addlist[index])
      // 移除addlist的数据
      this.addlist.splice(index, 1)
      this.$notify({
        message: '添加成功',
        type: 'success'
      })
    }
  },
  //  axios请求数据栏目列表
  async mounted () {
    let res = await category()
    console.log(res)
    // 判断。如果有token 则去掉头两个信息
    if (localStorage.getItem('user_token')) {
      this.likelist = res.data.data
      this.likelist.splice(0, 2)
    } else {
    // 否则没有token值，去掉头一个信息
      this.likelist = res.data.data
      this.likelist.splice(0, 1)
    }
  }
}
</script>

<style lang="less" scoped>
//设定button
.van-button {
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
