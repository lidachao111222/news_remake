<template>
  <!-- 评论页面单层 -->
  <div class="item1">
    <div class="head">
      <img :src="'http://127.0.0.1:3000'+itemparent.user.head_img" alt />
      <div>
        <p>{{itemparent.user.nickname}}</p>
        <span>{{itemparent.create_date}}</span>
        <div class="text">{{itemparent.content}}</div>
      </div>
      <span>回复</span>
    </div>
     <commentitem :itemparent="itemparent.parent" v-if="itemparent.parent"></commentitem>
  </div>
</template>

<script>
// import commentitem from '../components/CommentItem'
export default {
  name: 'commentitem',
  props: ['itemparent'],
  mounted () {
    // console.log(this.itemparent)
  }
}
</script>

<style lang="less" scoped>
.item1 {
  margin-top: 10px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>
