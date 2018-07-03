<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          // narbar
          .weui-navbar
            .weui-navbar__item(v-for='(item,index) in tabs',:key="index",@click="showTab(index)",:class="{'weui-bar__item_on':num===index}")
              span {{item.name}}
          // 项目列表页
          .list
            .weui-cells
              #searchBar.weui-search-bar.search-bar
                form.weui-search-bar__form()
                  .weui-search-bar__box
                    i.weui-icon-search
                    input#searchInput.weui-search-bar__input(type='search',placeholder='搜索', :autofocus="true",required='',ref="input",v-model="searchText")
                    div#searchClear.weui-icon-clear
                  label#searchText.weui-search-bar__label(style='transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);',@click="textClick",v-show="!isActive")
                    i.weui-icon-search
                    span 搜索
                .weui-search-bar__cancel-btn(v-show="isActive" v-text="searchText")
            mt-loadmore(:autoFill="false",:top-method="loadTop",:bottom-method="loadBottom",:bottom-all-loaded="allLoaded",ref="loadmore")
              ul(id="ul-box",class="ul-box starth" v-show="oneLoad")
                li.weui-cells(v-for="(item,index) in Data",:key="index")
                 .weui-cell(@click="showDetail(item)")
                  .weui-cell__hd(v-if="num==0")
                   i.fa.fa-star.icon-important-color.fa-3x
                  .weui-cell__hd(v-if="num==1")
                   i.fa.fa-file-picture-o.fa-3x
                  .weui-cell__hd(v-if="num==2")
                   i.fa.fa-handshake-o.fa-3x
                  .weui-cell__hd(v-if="num==3")
                   i.fa.fa-star.icon-important-color.fa-3x
                  .weui-cell__bd
                    p {{item.ProjectName}}
                    p.desc-text 项目地址:{{item.Address?item.Address:'暂无地址'}}
                    p.desc-text 项目类型: {{item.Classification}}
                  .weui-cell__ft
                    p.fa.fa-angle-right.fa-2x
              div(v-show="allLoaded")
                span 已经加载全部数据

</template>

<script>
import { Loadmore } from 'mint-ui'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import axios from 'axios'
import { ListUtil } from '../../static/js/util'

export default {
   middleware: 'wechat-auth',
   head(){
     return {
       title:'项目列表页面'
     }
   },
   created(){
   },
   mounted(){//模板编译之前\
     this.loadOne()
   },
   data(){
     return {
       tabs:[{
         name:'全部',
         isActive:true
       },{
         name:'设计项目',
         isActive:false
       },{
         name:'商务项目',
         isActive:false
       },{
         name:'重点项目',
         isActive:false
       }],
       num:0,
       selectBox:false,
       searchText:"",
       isActive:false,
       Data:[],
       allLoaded:false,
       pgaeIndex:1,
       oneLoad:false
     }
   },
   computed:{
     ...mapState([
       'user'
     ])
   },
   methods:{
     loadOne(){
      Indicator.open('加载中');
      let params ={
        page:1,
        rows:10,
        code:0
      }
      const res =axios.get(`/api/ProjectList?page=${params.page}&typeCode=${params.code}`)
      res.then((data)=>{
         Indicator.close()
          if(data.status==200){
            console.log(data.data.data)
            if(data.data.data.rows.length>0){
              this.oneLoad =true
              ListUtil(data.data.data.rows,this.Data)
              console.log(this.Data)
            }else {
              //error
            }
         }
        },()=>{
          Indicator.close()
          Toast({
              message: '网络异常',
						  iconClass: 'fa fa-times',
						  duration: 2000
          })
      })
     },
     loadTop(){
       this.pgaeIndex=1
       this.update(0,'top',this.num)
     },
     loadBottom(){
       this.pgaeIndex+=1
       let offset =this.pgaeIndex*10
       this.update(offset,'bottom',this.num)
     },
     update(offset,type,code){
       let page =this.pgaeIndex
      const res =axios.get(`/api/ProjectList?page=${page}&typeCode=${code}`)
       //请求后端数据
       res.then((data)=>{
         if(offset===0){//下拉刷新
            //清空列表
            this.allLoaded =false
            this.Data =[]
            if(data.data.data.rows.length>0){
              ListUtil(data.data.data.rows,this.Data)
            }
         }else {
           if(data.data.data.rows.length>0){
             ListUtil(data.data.data.rows,this.Data)
           }else {
             this.allLoaded =true
           }
         }

         //通过第二个参数判断上拉加载和下拉刷新
         if(type==='top'){
            this.$refs.loadmore.onTopLoaded()
          }else if(type==='bottom') {
            this.$refs.loadmore.onBottomLoaded()
          }else {
             console.log('自动触发')
          }
       })
     },
     textClick(){
       this.$router.push({
         path:'/search'
       })
     },
     showTab(index){
       this.num =index
       //切换数据
       this.Data =[]
       this.pgaeIndex =1
       let page =this.pgaeIndex
       const res =axios.get(`/api/ProjectList?page=${page}&typeCode=${this.num}`)
      // this.$store.dispatch('getProjectList',index)
       res.then((data)=>{
           console.log(data)
          if(data.data.data.rows.length>0){
             ListUtil(data.data.data.rows,this.Data)
          }else {
             //切换项目查找,提示当前无项目
              Toast({
              message: "无对应类型的项目",
              position: "middle",
              duration: 800
              })
          }
       })
     },
     showDetail(item){
       this.$router.push({
          path:'/detail',
          query:{
            ID:item.ID,
            Classification:item.Classification
          }
       })
     }
   },
   components:{
     "mt-loadmore":Loadmore
   }
}
</script>

<style scoped>
.icon-important-color {
  color:#e0db13
}
.search-bar{
  margin-top:27px;
}
.desc-text {
    color: #666;
    font-size: 14px;
    line-height:25px;
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
.weui-cell-desc__text{
    color:#666;
    font-weight:bold;
}
.weui-cell-desc__sign{
    color:#39a0ff;
    font-weight:bold;
}
.weui-cell-desc__emphasis{
    background:#39a0ff;
    color:#fff;
    padding:3px;
    border-radius: 4px;
}
.weui-cell-from {
    height:28px;
}
.list{
  overflow:scroll
}
.icon-danger-color {
  color: red;
}
.weui-cell-icon {
    width: 78px;
    height: 63px;
    margin-right: 5px;
    display: block;
}
.weui-cell__bd {
  margin-left: 10px;
}
</style>


