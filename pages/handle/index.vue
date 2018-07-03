<template lang="pug">
#container.container
 .page.grid.js_show
  .page__hd(style="margin-left:-18px")
     .page__title 项目功能控制台
  .weui-grids(style="margin-top:-30px",v-show="isTabbar")
   .weui-grid(v-for="(item,index) in list",@click="Grid(item)",v-show="item.isShow")
    .weui-grid__icon
     p(:class='item.icon')
    .weui-grid__label {{item.lable}}
</template>

<script>
import { Toast } from 'mint-ui'
import { MessageBox  } from 'mint-ui'
import  axios  from 'axios'
import just from '../../static/js/jurisdiction'

export default {
  //middleware: 'wechat-auth',
  head(){
      return {
          title:'功能列表'
      }
  },
  created(){
      const { Id } =this.$route.query
      this.Id =Id
      if(!Id){
        this.$router.push({
            path:'/'
        })
        return false;
      }
  },
  data(){
      return {
          list:[
             {
                  icon:'fa fa-cog fa-3x',
                  lable:'审核',
                  router:'/audit',
                  isShow:false
              },
              {
                  icon:'fa fa-handshake-o fa-3x',
                  lable:'商务阶段跟新',
                  router:'/project/businessPhase',
                  isShow:true
              },
              {
                  icon:'fa fa-circle-o-notch fa-3x',
                  lable:'进度跟踪反馈',
                  router:'/project/businessGroup',
                  isShow:true
              },
              {
                  icon:'fa fa-hand-paper-o fa-3x',
                  lable:'项目报价申请',
                  router:'project/quotedPrice',
                  isShow:true
              },
              {
                  icon:'fa fa-hand-rock-o fa-3x',
                  lable:'项目投标申请',
                  router:'/project/biding',
                 isShow:true
              },
               {
                  icon:'fa fa-user-o fa-3x',
                  lable:'项目合同管理',
                  router:'project/contract',
                  isShow:true
              },
              {
                  icon:'fa fa-refresh fa-3x',
                  lable:'项目收款登记',
                  router:'/project/receive',
                  isShow:true
              },
               {
                  icon:'fa fa-hand-pointer-o fa-3x',
                  lable:'项目设计深化申请',
                  router:'',
                  isShow:true
              },
              {
                  icon:'fa fa-window-close fa-3x',
                  lable:'项目终止申请',
                  //router:'/project/termination',
                  router:"",
                  isShow:true
              }
          ],
          Id:0,
          isTabbar:false
      }
  },
  beforeMount(){
      this.checkRole()
  },
  methods:{
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
             let middleArrs =[rolesMap[0]]
             rolesMap.forEach((item,index)=>{
               if(item.project>middleArrs[0].project){
                  middleArrs[0].project =item.project
               }

               if(item.biding>middleArrs[0].biding){
                 middleArrs[0].biding =item.biding
               }
             })
             
             let isJust =middleArrs[0].Project>0?true:false
             console.log(isJust);
             this.list[0].isShow =isJust
             this.isTabbar =true
           })
      },
      Grid(item){
          if(item.router==''){
               MessageBox.alert('正在开发中...')
          }
          this.$router.push({
              path:item.router,
              query:{
                  Id:this.Id
              }
          })
      }
  }
}
</script>
<style scoped>
.page__title {
    font-size: 16px;
}
.weui-grid__label {
   padding-top: 10px;
   font-size: 16px;
}
</style>

