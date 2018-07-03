<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          mt-loadmore(:bottom-method="loadBottom",:bottom-all-loaded="allLoaded",ref="loadmore")
           ul.list(id="ul-box",class="ul-box starth" v-show="oneLoad")
            li.weui-cells(v-for="(item,index) in Data",:key="'list'+index")
             .weui-cell(@click="selectItem(item)")
              .weui-cell__bd
                p {{item.text}}
</template>

<script>
//页面待美化 做成字母列表
import { Loadmore,Indicator  } from 'mint-ui'
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import axios from 'axios'
import { ListUtil } from '../../static/js/util'
export default {
  head(){
      return {
          title:'单位选择'
      }  
  },
  data(){
      return {
          Data:[],
          allLoaded:false,
          pageIndex:1,
          oneLoad:false,//第一次加载
          url:'',
          str:''
      } 
  },
  created(){
      let { str,Id } = this.$route.query;
      if(!str){
          this.$router.push({
              path:'/'
          })
          return false
      }
      this.str =str
      this.Id =Id
      if(str.search('报价') !=-1){
         str ='减隔震厂商'
      }
      if(str.search('合同') !=-1){
        str ='减隔震厂商'
      }

      if(str.search('项目') !=-1){
          str ='减隔震厂商'
      }
     
      let queryData ={
         OrgProperty:'单位',
         CompanyType:str,
         page:1,
         rows:20
      }

      if(str==='客户名称'){
          queryData ={
               OrgProperty:'单位',
               page:1,
               rows:20
          }
          console.log(queryData)
      }
      this._getOptions(queryData)
  },
  mounted(){
      console.log('模板编译中')
  },
  methods:{
      loadBottom(){//下拉刷新
         this.pageIndex+=1
         let offset =this.pageIndex*10
         this.update(offset,'bottom')
      },
      update(offset,type){
           let page =this.pageIndex
           let str =this.str
           let queryData ={
                OrgProperty:'单位',
                CompanyType:str,
                page:page,
                rows:20
          }
          if(this.str==='客户名称'){
              queryData ={
                  OrgProperty:'单位',
                  page:page,
                  rows:20
              }
           const res =axios.get(`/api/getClientUnit?OrgProperty=${queryData.OrgProperty}&page=${queryData.page}&rows=${queryData.rows}`)
           res.then((data)=>{
                 if(offset !==0){
                    if(data.data.data.rows.length>0){
                        ListUtil(data.data.data.rows,this.Data)
                    }else {
                        this.allLoaded =true
                    }
                }
                if(type==='top'){
                        this.$refs.loadmore.onTopLoaded()
                }else {
                        this.$refs.loadmore.onBottomLoaded()
                }
           })
          }else {
            if(this.str=='减隔震厂商报价'){
                str ='减隔震厂商'
            }
            if(this.str =='减隔震厂商合同'){
                str ='减隔震厂商'
            }
            if(this.str =='减隔震厂商项目'){
               str ='减隔震厂商'
            }
            const res =axios.get(`/api/getOptions?OrgProperty=${queryData.OrgProperty}&CompanyType=${queryData.CompanyType}&page=${queryData.page}&rows=${queryData.rows}`)
            res.then((data)=>{
                if(offset !==0){
                    if(data.data.data.rows.length>0){
                        ListUtil(data.data.data.rows,this.Data)
                    }else {
                        this.allLoaded =true
                    }
                }
                if(type==='top'){
                        this.$refs.loadmore.onTopLoaded()
                }else {
                        this.$refs.loadmore.onBottomLoaded()
                }
            })
          }
         
      
      },
      selectItem(item){
          let unit =this.str
          let route = '/project/commit'
          switch(unit) {
              case '勘察设计单位':
                item.unit ='survey'
              break;
              case '建设单位':
                item.unit ='client'
              break;
              case '施工单位':
                item.unit ='construct'
             break;
             case '减隔震厂商':
                item.unit ="shock"
                item.Id =this.Id
             break;
             case '减隔震厂商报价':
                item.Id =this.Id,
                item.unit ='quShock'
            break;
            case '客户名称':
                item.Id =this.Id
                item.unit ='clientName'
            break;
            case '减隔震厂商合同':
                item.Id =this.Id,
                item.unit ='conShock'
            break
            case '减隔震厂商项目':
               item.Id =this.Id
               item.unit ='pShock'
          }
          if(unit==='减隔震厂商'){
              this.$store.dispatch('updateStore',item)
              this.$router.go(-1);//返回上一层
          }
          if(unit==='减隔震厂商报价'){
              this.$store.dispatch('updateStore',item)
              this.$router.go(-1)
          }
          if(unit==='减隔震厂商合同'){
              this.$store.dispatch('updateStore',item)
              this.$router.go(-1)
          }
          if(unit==='客户名称'){
              this.$store.dispatch('updateStore',item)
              this.$router.go(-1)
          }
         this.$store.dispatch('updateStore',item)
         this.$router.push({
             path:route
         })
      },
      _getOptions(queryData){
        let res =null
        if(queryData.CompanyType){
             res =axios.get(`/api/getOptions?OrgProperty=${queryData.OrgProperty}&CompanyType=${queryData.CompanyType}&page=${queryData.page}&rows=${queryData.rows}`)
            console.log("111");
        }else {
            console.log("hha");
            res =axios.get(`/api/getClientUnit?OrgProperty=${queryData.OrgProperty}&page=${queryData.page}&rows=${queryData.rows}`)
        }
      
        res.then((data)=>{
               this.oneLoad =true
               ListUtil(data.data.data.rows,this.Data)
        },(err)=>{
            Toast({
                message: '网络异常',
                iconClass: 'fa fa-times',
                duration: 2000
          })
        })
    },
  },
  components:{
      "mt-loadmore":Loadmore
  }
}
</script>

<style scoped>
.weui-cells {
    margin-top: 10px;
    font-size: 14px;
}
</style>




