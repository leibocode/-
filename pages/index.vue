<template lang="pug">
#container.container.flex
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          // 首页搜索
          #searchBar.weui-search-bar.search-bg(ref="searchBar")
            form.weui-search-bar__form()
              .weui-search-bar__box
                i.weui-icon-search
                input#searchInput.weui-search-bar__input(type='search',  v-model="ProjectName", placeholder='搜索', required='')
                a#searchClear.weui-icon-clear(href='javascript:')
              label#searchText.weui-search-bar__label(@click="toSearch",style='transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);')
                i.weui-icon-search
                span 搜索
            a#searchCancel.weui-search-bar__cancel-btn.nav-text-color(href='javascript:') 取消
          // nav导航
          .nav
            a.weui-tabbar__item.weui-bar__item_on(href='javascript:;')
              span(style='display: inline-block;position: relative;')
                // <img src="/icon/myproject.png" alt="" class="weui-tabbar__icon nav-icon">
                p.weui-tabbar__label.nav-text-color(style='color:#fff;',@click='showProjectList')
                  span.fa-stack.fa-2x
                    i.fa.fa-circle-thin.fa-stack-2x
                    i.fa.fa-bars
                p.weui-tabbar__label.nav-text-color(style='color:#fff;',@click='showProjectList')
                  | 我的项目
            a.weui-tabbar__item.weui-bar__item_on(href='javascript:;')
              span(style='display: inline-block;position: relative;')
                // <img src="/icon/put.png" alt="" class="weui-tabbar__icon nav-icon">
                p.weui-tabbar__label.nav-text-color(style='color:#fff;',@click='addProject')
                  span.fa-stack.fa-2x
                    i.fa.fa-circle-thin.fa-stack-2x
                    i.fa.fa-arrow-up
                p.weui-tabbar__label.nav-text-color(style='color:#fff;',@click="addProject")  项目申请
            a.weui-tabbar__item.weui-bar__item_on(href='javascript:;')
              span(style='display: inline-block;position: relative;')
                span.weui-badge(style='position: absolute;top: -2px;right: -13px;',v-show="roleCheck",v-text="applyNum")
                p.weui-tabbar__label.nav-text-color(style='color: #fff;',@click="pending")
                  span.fa-stack.fa-2x
                    i.fa.fa-circle-thin.fa-stack-2x
                    i.fa.fa-bell-o
                p.weui-tabbar__label.nav-text-color(style='color: #fff;') 待处理
            a.weui-tabbar__item.weui-bar__item_on(href='javascript:;')
              span(style='display: inline-block;position: relative;')
                p.weui-tabbar__label.nav-text-color(style='color: #fff;')
                  span.fa-stack.fa-2x
                    i.fa.fa-circle-thin.fa-stack-2x
                    i.fa.fa-check
                p.weui-tabbar__label.nav-text-color(style='color: #fff;',@click="processed") 最近处理
          // 项目列表页
          mt-loadmore(:top-method="loadTop",:bottom-method="loadBottom",:bottom-all-loaded="allLoaded",ref="loadmore")
           ul.list(id="ul-box",class="ul-box starth" v-show="oneLoad")
            li.weui-cells(v-for="(item,index) in Data",:key="'list'+index")
             .weui-cell(@click="showProjectAudit(item)")
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
    div(class='loading-container',v-show="loading")
     Loading
</template>

<script>
import { Loadmore } from 'mint-ui'
import { Indicator } from 'mint-ui';
import { MessageBox  } from 'mint-ui'
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import axios from 'axios'
import { ListUtil } from '../static/js/util'
import Loading from '../components/loading/loading'
import just from '../static/js/jurisdiction'
import ajax from '../static/js/ajax'
import config from '../static/js/config'
export default {
  //middleware: 'wechat-auth',
  head () {
    return {
      title: '建顾基于微信的项目管理移动客户端软件'
    }
  },
  created(){
    //查看 代办理项

  },
  mounted(){
    console.log('加载权限')
    const apply = this.checkRole()
    console.log(this.roleCheck)
    if(this.roleCheck){
      console.log('有apply权限')
      this.getApply()
    }
    this.loadOne()
  },
  data () {
    return {
       ProjectName:null,
       num:0,
       tabbar:[
         {
           value:'首页',
           router:'/',
           icon:'fas fa-home'
       },{
         value:'搜索',
         router:'/search',
         icon:'far fa-search'
       }],
       Data:[],//每次加载累加后的数据
       allLoaded:false,//若为真，则bottomMethod不会触发
       pageIndex:1,
       griddata:[],//每次加载出来的新数据
       oneLoad:false,//第一次加载
       error:false,
       loading:true,
       num:0,
       roleCheck:false,
       applyNum:0
    }
  },
  computed: {
    ...mapState([
      'authUser'
    ])
  },
  methods: {
    pending(){
      if(!this.roleCheck){
         MessageBox.alert('您当前没有待处理的项目')
      }else {
        this.$router.push({
           path:'/apply',
           query:{
             Id:config.applyState
           }
        })
      }
    },
    processed(){

    },
    checkRole(){
          const res =axios.get('/api/GetRoles')
          res.then((data)=>{
             console.log(res)
             let roles = data.data.data
             console.log(roles)
             let rolesMap =[]
             for(let i=0;i<roles.length;i++){
                rolesMap.push(just[roles[i]])
             }
             console.log(rolesMap)
             let middleArrs =[rolesMap[0]]
             console.log(middleArrs)
             rolesMap.forEach((item,index)=>{
               console.log(item)
               if(item.Project>middleArrs[0].Project){
                  middleArrs[0].Project =item.Project
               }

               if(item.Biding>middleArrs[0].Biding){
                 middleArrs[0].Biding =item.Biding
               }

               if(item.Apply>middleArrs[0].Apply){
                 middleArrs[0].Apply =item.Apply
               }

             })
             
             let isApply =middleArrs[0].Apply>0?true:false
             //console.log(isApply)
             //this.roleCheck =true
             if(isApply){
                console.log('请求后端')
                axios.get('/api/apply').then((data)=>{
                   console.log('====================================');
                   let result = (JSON.parse(data.data.data)).total

                   if(result>0){
                     this.applyNum = result
                     this.roleCheck =isApply
                   }
                   console.log('====================================');
                })
             }
           })
    },
    loadOne(){
      let param ={
        offset:0,
        number:10,
        page:1,
        code:0
      }
     //请求后端
      const res =axios.get(`/api/ProjectList?page=${param.page}&typeCode=${param.code}`)
      res.then((data)=>{
         if(data.data.success){
              if(data.data.data.rows.length>0){
                 this.oneLoad =true
                 this.loading =false
              }
              ListUtil(data.data.data.rows,this.Data)
          }else {
            this.$router.push({
               path:'/error/401'
            })
          }
      },(error)=>{

          Indicator.close()
          this.oneLoad =true
          this.loading =false
          Toast({
              message: '网络异常',
						  iconClass: 'fa fa-times',
						  duration: 2000
          })
          this.error =true
      })
    },
    getApply(){
       ajax.get('/api/apply').then((data)=>{
          console.log('apply')
          console.log(data)
       })
    },
    loadTop(){//下拉刷新
      this.pageIndex =1
      this.update(0,'top',this.num)
    },
    loadBottom(){//上拉加载
      this.pageIndex+=1
      let offset =this.pageIndex*10//每次十条
      console.log(this.pageIndex)
      this.update(offset,'bottom',this.num)
    },
    update(offset,type,code){//每次触发上拉加载或者下拉刷新时触发的数据接口
      let page =this.pageIndex
      //请求数据
      const res =axios.get(`/api/ProjectList?page=${page}&typeCode=${code}`)
      res.then((data)=>{
          if(offset===0){//下拉刷新
            //清空列表
            this.allLoaded =false
            this.Data =[]
            if(data.data.data.rows.length>0){
              ListUtil(data.data.data.rows,this.Data)
            }
          }else {//下拉加载
             if(data.data.data.rows.length>0){
                ListUtil(data.data.data.rows,this.Data)
             }else {
                this.allLoaded =true
             }
          }
          //通过传过来不同的值分辨上拉加载和下拉刷新
          if(type==='top'){
            this.$refs.loadmore.onTopLoaded()
          }else {
            this.$refs.loadmore.onBottomLoaded()
          }
      })
    },
    swichTabbar(item){//切换tabbar
      this.$router.push({
         path:item.router
      })
    },
    toSearch(){//跳转search页面
      this.$router.push({
        path:'/search'
      })
    },
    showProjectList(item){//跳转项目列表页
        this.$router.push({
           path:'/list',
           query:{
             ID:item.ID
           }
        })
    },
    showProjectAudit(item){//审核页面
      this.$router.push({
         path:'/detail',
         query:{
           ID:item.ID
         }
      })
    },
    addProject(){//跳转到项目提交页面
      this.$router.push({
         path:'/project/commit'
      })
    }
  },
  components:{
    "mt-loadmore":Loadmore,
    Loading
  }
}
</script>

<style scoped>
.icon-important-color {
  color:#e0db13
 
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
    width: 78px;
    height: 63px;
    margin-right: 5px;
    display: block;
}

.nav {
    width: 100%;
    height: 70px;
    background: #39a0ff;
    display:flex;
    color:#fff;
}
.nav-text-color{
    color:#fff;
}
.nav-icon{
    width:35px;
    height:35px;
}
.weui-tabbar__item {
  height: 40px;
}
.loading-container{
     position: absolute;
     width: 100%;
     top: 50%;
     transform: translateY(-50%)
}
.icon-danger-color {
  color: red;
}
.icon-default-color {
    color: #000;
}
.weui-cell-ptetx{
   margin-left:35%;
   font-size:16px;
   color:#666;
}
.flex {
  display:flex;
}
</style>
