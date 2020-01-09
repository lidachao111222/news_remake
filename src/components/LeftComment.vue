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
        <span class="send" @mousedown="feendback">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
// 收藏文章stat  // 发布评论
import { favouritearticle, postcomment } from '../apis/article'
// postcomment
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
    // 点击发送事件
    async feendback () {
      // 发表评论请求(文章id)
      console.log(this.$route.params.id)
      // 得到评论
      console.log(this.$refs.commtext.value)
      // 发送postcomment评论
      let res = await postcomment(this.$route.params.id, {
        content: this.$refs.commtext.value,
        parent_id: ''
      })
      console.log(res)
      if (res.data.message === '评论发布成功') {
        this.$emit('feedbacksuccess')
      }
    },
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      // 设定时器否则自动不会focus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
      // this.$refs.commtext.focus()
      // console.log(this.data)
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
    // 点击跳转到评论页面
    gocomments () {
      // 判断，如果以及位于评论页面 咋补跳转
      if (this.$route.path.indexOf('/newscomments/') === 0) {
        this.$toast.fail('亲，您已经位于该报道的评论页面啦')
      } else {
        // 进行跳转
        router.push({ path: `/newscomments/${this.data.id}` })
      }
    }
  }
}
</script>

<style lang='less' scoped>
textarea{

}
.send{
  padding-left: 30px;
}
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
