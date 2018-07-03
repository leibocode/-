<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
         form(action="",onsubmit="return false")
          mt-search.search(v-model="searchText",placeholder="请输入关键字",@keyup.native.enter="search")
          div
          mt-loadmore(:autoFill="false",:bottom-method="loadBottom",:bottom-all-loaded="allLoaded",ref="loadmore")
            ul.load-more(id="ul-box",class="ul-box starth")
              li.weui-cells(v-for="(item,index) in Data",:key="'list'+index",@click="showDetail(item)")
                .weui-cell
                  .weui-cell__hd
                    p.weui-cell-icon
                      i.fa.fa-star.icon-important-color.fa-3x
                  .weui-cell__bd
                    p {{item.ProjectName}}
                    p.desc-text 项目地址:{{item.Address?item.Address:'暂无地址'}}
                    p.desc-text 项目类型: {{item.Classification}}
                  .weui-cell__ft
                    p.fa.fa-angle-right.fa-2x
                li(v-show="allLoaded")
                    span.weui-cell-ptetx 已经加载全部数据
      // tabbar
      .weui-tabbar
        a.weui-tabbar__item(href='#',v-for="(item,index) in tabbar",:key="index",:class="{'weui-bar__item_on':index===num}",@click="swichTabbar(item)")
          span(style='display: inline-block;position: relative;')
            p.weui-tabbar__label.nav-text-color.icon-default-color
              span
                i.fa.fa-bars.fa-2x(v-if="index==0")
                i.fa.fa-search.fa-2x(v-else)
            p.weui-tabbar__label {{item.value}}
</template>
<script>
import { Search, Toast, Loadmore } from "mint-ui"
import axios from "axios"
import { ListUtil } from '../../static/js/util'

export default {
  middleware: 'wechat-auth',
  head() {
    return {
      title: "项目搜索页面"
    }
  },
  data() {
    return {
      num: 1,
      searchText: "",
      tabbar: [
        {
          value: "首页",
          router: "/",
          img: ""
        },
        {
          value: "搜索",
          router: "/search",
          img: ""
        }
      ],
      Data:[],
      allLoaded:false,
      isText:false,
      pageIndex:1,
      oneLoad:false,//第一次加载
      text:""
    };
  },
  computed:{

  },
  methods: {
    loadTop(){//下拉刷新
      this.pageIndex =1
      this.update(0,'top')
    },
    loadBottom(){//上拉加载
      this.pageIndex+=1
      let offset =this.pageIndex*10
      this.update(offset,'bottom')
    },
    update(offset,type){
        let page =this.pageIndex
        const res = axios.get(`/api/search?searchText=${this.searchText}&page=${this.pageIndex}&rows=10`)
        res.then((data)=>{
          if(offset===0){//下拉刷新
            this.allLoaded =false
            this.Data =[]
            if(data.data.data.rows.length>0){
              ListUtil(data.data.data.rows,this.Data)
            }
          }else {//下拉加载
            if(data.data.data.rows.length>0){
              ListUtil(data.data.data.rows,this.Data)
            }else {
              if(this.pageIndex>4){
                 this.isText =true
              }
              this.allLoaded =true
            }
            if(type==='top'){
              this.$refs.loadmore.onTopLoaded()
            }else if(type==='bottom') {
              this.$refs.loadmore.onBottomLoaded()
            }
          }
        })
    },
    swichTabbar(item) {
      this.$router.push({
        path: item.router
      });
    },
    search() {
      //判断输入中文
      this.oneLoad =true
      this.allLoaded =false
      this.isText =false
      this.pageIndex =1
      this.Data =[]
      let reg = /[\u4e00-\u9fa5]+$/;
      if (!reg.test(this.searchText)) {
        Toast({
          message: "输入不合法,请输入中文",
          position: "middle",
          duration: 800
        });
        this.searchText = ""
        return false;
      }
      Toast({
        message: "正在搜索中...",
        position: "middle",
        duration: 800
      })

      this.text = this.searchText
      // 开始加载
      setTimeout(() => {
        const res = axios.get(`/api/search?searchText=${this.searchText}&page=${this.pageIndex}&rows=10`)
        res.then(data => {
          if (data.data.data.rows.length>0) {
               ListUtil(data.data.data.rows,this.Data)
          } else {
             this.text =''
             this.searchText =''
            Toast({
              message: "没有相关项目",
              position: "middle",
              duration: 800
            });
          }
        })
      },1000)
      document.activeElement.blur()
    },
    showDetail(item){
      this.$router.push({
         path:'/detail',
         query:{
           ID:item.ID
         }
      })
    }
  },
  computed: {
    filterResult() {}
  },
  components: {
    "mt-search":Search,
    "mt-loadmore":Loadmore
  }
};
</script>

<style scoped>
.search{
  position:fixed;
  width:100%;
  height:53px;
  z-index:500;
  margin-bottom:30px;
}

.desc-text {
    color: #666;
    font-size: 14px;
}
.search-bg{
    background:#39a0ff;
    border-bottom:0px;
}
.weui-cell-icon {
    width: 63px;
    height: 63px;
    margin-right: 5px;
    display: block;
}
.list{
  overflow: scroll;
  width:100%;
  height:100%;
}
.load-more{
  margin-top: 14%;
}

.icon-important-color {
  color:#e0db13
}
.weui-cell-ptetx{
   margin-left:35%;
   font-size:16px;
   color:#666;
}
</style>




