<template>
  <div>
    <div class="header">
      <form action="/">
        <van-icon name="arrow-left" class="icon" @click="goback" />
        <van-search
          v-model="keyword"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
          class="search"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </form>
    </div>
    <div v-if="!infolist">
      <van-cell title="历史记录" v-if="!infolist" />
      <p
        class="searchhistory"
        v-for="item in searchhistory"
        :key="item.id"
        @click="onSearch"
        @mousedown="keyword=item"
      >{{item}}</p>
        <van-cell title="清除历史记录" v-if="!infolist"  @click="cleanhistory"/>
    </div>
    <van-cell-group>
      <van-cell
        :title="item.title"
        :label="item.create_date"
        v-for="item in infolist"
        :key="item.id"
        @click="gonewsdetail(item.id)"
      />
    </van-cell-group>

    <van-pagination
      v-model="currentPage"
      :total-items="total"
      :items-per-page="2"
      v-if="infolist"
      @change="changepage"
    />
  </div>
</template>

<script>
// 引入路由
import router from '../ulits/router'
// 引入搜索api
import { postsearch } from '../apis/article'
export default {
  mounted () {
    // this.searchhistory = JSON.parse(localStorage.getItem('searchhistory'))
    // console.log(localStorage.getItem('searchhistory'))
    if (localStorage.getItem('searchhistory')) {
      this.searchhistory = JSON.parse(localStorage.getItem('searchhistory'))
    }
  },
  data () {
    return {
      keyword: '',
      total: '',
      infolist: null,
      currentPage: 1,
      searchhistory: []
    }
  },
  watch: {
    keyword (newval) {
      //   console.log(newval)
      if (newval.length === 0) {
        this.infolist = null
      }
    }
  },
  methods: {
    // 清除历史记录
    cleanhistory () {
    // 还未完成
      console.log(123)
    },
    // 改变页面
    changepage () {
      //   console.log(this.currentPage)
      this.onSearch()
    },
    // 进行跳转
    gonewsdetail (newsid) {
      router.push({ path: `/newsdetail/${newsid}` })
    },
    // 返回
    goback () {
      //   console.log(321)
      history.back(-1)
    },
    // 进行搜索
    async onSearch () {
      if (this.keyword.length !== 0) {
        for (let i = 0; i < this.searchhistory.length; i++) {
          if (this.searchhistory[i] === this.keyword) {
            console.log(i)
            this.searchhistory.splice(i, 1)
          }
        }
        this.searchhistory.unshift(this.keyword)
        localStorage.setItem(
          'searchhistory',
          JSON.stringify(this.searchhistory)
        )
        //   console.log(this.keyword)
        let res = await postsearch({
          keyword: this.keyword,
          pageIndex: this.currentPage,
          pageSize: 2
        })
        if (res.statusText === 'OK') {
          // console.log(res)
          this.total = res.data.total
          // console.log(this.total)
          this.infolist = res.data.data
          // console.log(this.infolist)
        }
        // axios请求
      }
    }
  }
}
</script>

<style>
.icon {
  float: left;
  margin-top: 15px;
  font-size: 20px;
  margin-left: 10px;
}
.searchhistory {
  display: inline-block;
  padding: 10px;
}
</style>
