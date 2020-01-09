<template>
  <div class="commentApp">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="gocomments">
        <i class="iconfont iconpinglun-"></i>
        <em>{{data.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="star" :class="{ starcolor : data.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" @blur="isFocus = false"></textarea>
      <div>
        <span>发送</span>
      </div>
    </div>
  </div>
</template>

<script>
import { favouritearticle } from '../apis/article'
// 引入router
import router from '../ulits/router'
export default {
  props: ['data'],
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      this.$refs.commtext.focus()
      console.log(this.data)
    },
    //   点击收藏
    async star () {
      // axios请求
      let res = await favouritearticle(this.data.id)
      // console.log(res)
      this.$toast.success(res.data.message)
      //   改变样式
      this.data.has_star = !this.data.has_star
    },
    gocomments () {
      router.push({ path: `/newscomments/${this.data.id}` })
    }
  }
}
</script>

<style lang='less' scoped>
.starcolor{
    color: red;
}
.commentApp {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}

</style>
