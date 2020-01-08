<template>
  <!-- 一张图片展示 -->
  <div class="single" v-if="data.type === 1 && data.cover.length === 1" @click="godetail">
    <div class="left">
      <p class="content">{{data.title}}</p>
      <p class="info">
        <span>{{data.user.nickname}}</span>
        <span>{{data.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="data.cover[0].url" alt />
  </div>
  <!-- 三张图片展示 -->
  <div class="singlet" v-else-if="data.type === 1 && data.cover.length === 3" @click="godetail">
    <div class="left">
      <p class="content">{{data.title}}</p>
      <div class="imgs">
        <!-- 遍历的话更好 -->
        <img :src="item.url" v-for="item in data.cover" :key="item.id" alt />
        <!-- <img :src="data.cover[1].url" alt />
        <img :src="data.cover[2].url" alt />-->
      </div>
      <p class="info">
        <span>{{data.user.nickname}}</span>
        <span>{{data.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
  <!-- video展示 -->
  <div class="singvdo" v-else-if="data.type === 2" @click="godetail">
    <div class="left">
      <p class="content">{{data.title}}</p>
      <div class="video">
        <!-- 遍历的话更好 -->
        <img :src="data.cover[0].url" alt />
        <!-- <img :src="data.cover[1].url" alt />
        <img :src="data.cover[2].url" alt />-->
      </div>
      <p class="info">
        <span>{{data.user.nickname}}</span>
        <span>{{data.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    godetail () {
      this.$emit('click', this.data.id)
    }
  }
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
// 三个图片的样式
.singlet {
  padding: 15px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      width: 32%;
    }
  }
  .info {
    margin-top: 10px;
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
}
// 视频的样式
.singvdo {
  padding: 15px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
}
</style>
