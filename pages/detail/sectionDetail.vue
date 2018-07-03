<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          .list(v-show="load")
           div(v-if="dataType=='BusinessPhase'")
            .weui-cells(v-for="(item,index) in list",:key="'list'+index")
              .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:
                    span.weui-cell-desc__text {{item.ProjectName}} 
                    label
                     input(ref="checkInput",type="checkbox",@click="checkItem(item,$event)")
                     i ✓
                  p.desc-text
                    | 项目编号:
                    span.weui-cell-desc__text {{item.ProjectNum}}
                  p.desc-text
                    | 当前商务阶段:
                    span.weui-cell-desc__text {{item.PhaseName}}
                  p.desc-text
                    | 商务负责人:
                    span.weui-cell-desc__text {{item.BusinessManager}}
                  p.desc-text
                    | 技术负责人:
                    span.weui-cell-desc__text {{item.TechnicalManager}}
                  p.desc-text(v-if="item.HandleStatus=='2'")
                    | 状态:
                    span.weui-cell-desc__sign 已审阅
                  p.desc-text(v-if="item.HandleStatus=='1'")
                    | 状态:
                    span.weui-cell-desc__sign 已提交
                  p.desc-text(v-if="item.HandleStatus=='0'")
                    | 状态:
                    span.weui-cell-desc__sign 待提交
                  p.desc-text
                    | 备注:
                    span.weui-cell-desc__text {{item.Remarks?item.Remarks:"无备注"}}
           div(v-if="dataType=='BusinessPhaseGroup'")
             .weui-cells(v-for="(item,index) in list",:key="'list'+index")
               .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:
                    span.weui-cell-desc__text {{item.ProjectName}}
                    label
                      input(ref="checkInput",type="checkbox",@click="checkItem(item,$event)")
                      i ✓
                  p.desc-text
                    | 项目编号:
                    span.weui-cell-desc__text {{item.ProjectNum}}
                  p.desc-text
                    | 负责人:
                    span.weui-cell-desc__text {{TechnicalManager}}
                  p.desc-text
                    | 商务负责人:
                    span.weui-cell-desc__text {{BusinessManager}}
                  p.desc-text
                    | 完成时间:
                    span.weui-cell-desc__text 
                  p.desc-text
                    | 落实情况
                    span.weui-cell-desc__text {{item.Content}}
                  p.desc-text
                    | 说明:
                    span.weui-cell-desc__text {{item.Remarks?item.Remarks:"无备注"}}
                  p.desc-text(v-if="item.HandleStatus=='2'")
                    | 状态:
                    span.weui-cell-desc__sign 已审阅
                  p.desc-text(v-if="item.HandleStatus=='1'")
                    | 状态:
                    span.weui-cell-desc__sign 已提交
                  p.desc-text(v-if="item.HandleStatus=='0'")
                    | 状态:
                    span.weui-cell-desc__sign 待提交
           div(v-if="dataType=='QuotedPrice'")
            .weui-cells(v-for="(item,index) in list",:key="'list'+index")
             .weui-cell
              .weui-cell__bd
                p.desc-text
                  | 项目名称:
                  span.weui-cell-desc__text {{item.ProjectName}}
                  label
                    input(ref="checkInput",type="checkbox",@click="checkItem(item,$event)")
                    i ✓
                p.desc-text
                  | 项目编号:
                  span.weui-cell-desc__text {{item.ProjectNum}}
                p.desc-text
                  | 项目类型:
                  span.weui-cell-desc__text {{item.ProjectType}}
                p.desc-text
                  | 工程地点:
                  span.weui-cell-desc__text {{item.Address?item.Address:"无地址"}}
                p.desc-text
                  | 技术负责人:
                  span.weui-cell-desc__text {{item.TechnicalManager}}
                p.desc-text
                  | 商务负责人:
                  span.weui-cell-desc__text {{item.BusinessManager}}
                p.desc-text(v-if="item.HandleStatus=='2'")
                  | 状态:
                  span.weui-cell-desc__sign 已审阅
                p.desc-text(v-if="item.HandleStatus=='1'")
                  | 状态:
                  span.weui-cell-desc__sign 已提交
                p.desc-text(v-if="item.HandleStatus=='0'")
                  | 状态:
                  span.weui-cell-desc__sign 待提交
                p.desc-text
                  | 报价单位:
                  span.weui-cell-desc__sign  {{item.QuotedPriceUnit}}
                p.desc-text
                   | 申请时间
                   span.weui-cell-desc__text 
                p.desc-text
                  | 备注:
                  span.weui-cell-desc__text {{item.Remarks}}
           div(v-if="dataType=='Biding'")
            .weui-cells(v-for="(item,index) in list",:key="'list'+index")
              .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:
                    span.weui-cell-desc__text {{item.ProjectName}}
                    label
                      input(ref="checkInput",type="checkbox",@click="checkItem(item,$event)")
                      i ✓
                  p.desc-text
                    | 项目编号:
                    span.weui-cell-desc__text {{item.ProjectNum}}
                  p.desc-text
                    | 产品类型:
                    span.weui-cell-desc__text {{item.ProductType}}
                  p.desc-text
                    | 投标地点:
                    span.weui-cell-desc__text {{item.Address}}
                  p.desc-text
                    | 投标时间:
                    span.weui-cell-desc__text {{item.ApplyDate}}
                  p.desc-text
                    | 被授权人:
                    span.weui-cell-desc__text {{item.AuthorizedPerson}}
                  p.desc-text
                    | 商务负责人
                    span.weui-cell-desc__text {{item.BusinessManager}}
                  p.desc-text
                    | 技术负责人
                    span.weui-cell-desc__text {{item.TechnicalManager}}
                  p.desc-text
                    | 投标公司
                    span.weui-cell-desc__sign {{item.BidUnit}}
                  p.desc-text(v-if="item.HandleStatus=='2'")
                    | 状态:
                    span.weui-cell-desc__sign 已审阅
                  p.desc-text(v-if="item.HandleStatus=='1'")
                    | 状态:
                    span.weui-cell-desc__sign 已提交
                  p.desc-text(v-if="item.HandleStatus=='0'")
                    | 状态:
                    span.weui-cell-desc__sign 待提交
                  p.desc-text
                    | 备注:
                    span.weui-cell-desc__text {{item.Remarks?item.Remarks:"无备注"}}
           div(v-if="dataType=='Contract'")
            .weui-cells(v-for="(item,index) in list",:key="'list'+index")
              .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:{{item.ProjectName}}
                    span.weui-cell-desc__text
                    label
                      input(ref="checkInput",type="checkbox",@click="checkItem(item,$event)")
                      i ✓
                  p.desc-text
                    | 项目编号 {{item.ProjectNum}}
                    span.weui-cell-desc__text
                  p.desc-text
                    | 客户名称:
                    span.weui-cell-desc__text {{item.CustomerUnit}}
                  p.desc-text
                    | 付款方式: 
                    span.weui-cell-desc__sign {{item.PayType}}
                  p.desc-text
                    | 合同金额:
                    span.weui-cell-desc__sign {{item.ContractAmount}}
                  p.desc-text
                    | 对方签约人:
                    span.weui-cell-desc__text {{item.CustomerContractor}}
                  p.desc-text
                    | 我方签约人:
                    span.weui-cell-desc__text {{item.OurContractor}}
                  p.desc-text
                    | 开始时间:
                    span.weui-cell-desc__text {{item.StartDate}}
                  p.desc-text(v-if="item.HandleStatus=='2'")
                    | 状态:
                    span.weui-cell-desc__sign 已审阅
                  p.desc-text(v-if="item.HandleStatus=='1'")
                    | 状态:
                    span.weui-cell-desc__sign 已提交
                  p.desc-text(v-if="item.HandleStatus=='0'")
                    | 状态:
                    span.weui-cell-desc__sign 待提交
           div(v-if="dataType=='Receive'")
            .weui-cells(v-for="(item,index) in list",:key="'list'+index")
              .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:
                    span.weui-cell-desc__text {{item.ProjectNum}}
                    label
                      input(ref="checkInput",type="checkbox",@click="checkItem(item,$event,index)")
                      i ✓
                  p.desc-text
                    | 项目编号:
                    span.weui-cell-desc__text {{item.ProjectNum}}
                  p.desc-text
                    | 收款金额:
                    span.weui-cell-desc__text {{item.ReceiveAmount}}
                  p.desc-text
                    | 付款方式:
                    span.weui-cell-desc__text {{item.ReceiveType}}
                  p.desc-text
                    | 收款类别:
                    span.weui-cell-desc__text {{item.PayType}}
                  p.desc-text
                    | 凭证号码:
                    span.weui-cell-desc__sign 
                  p.desc-text
                    | 收款时间:
                    span.weui-cell-desc__sign 
                  p.desc-text(v-if="item.HandleStatus=='2'")
                    | 状态:
                    span.weui-cell-desc__sign 已审阅
                  p.desc-text(v-if="item.HandleStatus=='1'")
                    | 状态:
                    span.weui-cell-desc__sign 已提交
                  p.desc-text(v-if="item.HandleStatus=='0'")
                    | 状态:
                    span.weui-cell-desc__sign 待提交
        .weui-tabbar.tabbar-class(v-show="isTabbar")
            a.weui-tabbar__item(href='#',v-for="(item,index) in tabbar",@click="swichState(item)",v-show="item.isShow")
              span(style='display: inline-block;position: relative;')
                p.weui-tabbar__label
                 i(:class="item.icon") 
                p.weui-tabbar__label {{item.value}}
</template>

<script>

import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import config from '../../static/js/config'
import just from '../../static/js/jurisdiction'
export default {
    middleware: 'wechat-auth',
    created(){
       const type =this.$route.query.type
       const Id =this.$route.query.Id
       this.dataType =type
       this.Id =Id
       if(!Id||!type){
         this.$router.push({
            path:'/'
         })
          return false;
       }
       switch(type){
         case "BusinessPhase" :
           this.title ="商务阶段更新"
           break;
          case "BusinessPhaseGroup":
           this.title ="商务阶段跟踪反馈"
           break;
          case "QuotedPrice":
            this.title ="报价申请"
           break;
          case "Biding":
            this.title ='投标申请'
            break;
          case "Contract":
             this.title ="合同管理"
           break;
          case "Receive":
             this.title ="收款登记"
           break;
       }
       
      //  if(type==="BusinessPhaseGroup"){
      //     this.checkbusinessData(Id)
      //  }else{
      //     this._getData(type,Id)  
      //  }
      this._getData(type,Id)  
       
    },
    beforeMount(){
      this.checkRole()
    },
    head(){
        return {
            title:this.title
        }
    },
    data(){
       return {
           title:'',
           list:[],
           Id:0,
           load:false,
           dataType:'',
           tabbar: [
              {
                value: "审核",
                router: "/",
                icon:'fa fa-user fa-3x',
                click:'auditItem',
                isShow:false
              },
              {
                value:'提交',
                router:'',
                icon:'fa fa-check-square-o fa-3x',
                click:'commit',
                isShow:true
              },
               {
                value: "撤销",
                router: "/search",
                icon:'fa fa-ban fa-3x',
                click:'revocation',
                isShow:true
              }
          ],
          selected:"",
          hanleStatus:4,
          Remark:"",
          index:100,
          loading:true,
          phaseId:0,
          IsJust:null,
          isTabbar:false,
          checkIdList:[]
       }
    },
    methods:{
        checkRole(){
           const res =axios.get('/api/GetRoles')
           res.then((data)=>{
             console.log('我是角色数据')
             let roles = data.data.data
             console.log(roles)
             let rolesMap =[]
             for(let i=0;i<roles.length;i++){
                console.log('权限信息')
                console.log(just[roles[i]])
                rolesMap.push(just[roles[i]])
             }
             console.log(rolesMap)
             console.log('数组去重复')
             let middleArrs =[rolesMap[0]]
             rolesMap.forEach((item,index)=>{
               if(item.project>middleArrs[0].project){
                  middleArrs[0].project =item.project
               }

               if(item.biding>middleArrs[0].biding){
                 middleArrs[0].biding =item.biding
               }
             })
             console.log(middleArrs[0][this.dataType]);
             this.IsJust =middleArrs[0][this.dataType]>0?true:false
             console.log(this.IsJust)
             this.tabbar[0].isShow =this.IsJust

             this.isTabbar =true
           })
        },
        checkItem(item,event,index){
          if(this.selected.length>0){
            if(!event.target.checked){
              this.selected ="";
               this.hanleStatus =4
            }else{
              let allCheckBox =this.$refs.checkInput
              event.target.checked =false
              Toast({
                message:'只能选择一条数据',
                position:"middle",
                duration:800
              })
            }
          }else {
            if(!item.ID){
              Toast({
                 message:"数据不完整,选中的ID不存在",
                 position:'middle',
                 duration:800
              })
              event.target.checked =false
              return ;
              
            }
            this.selected =item.ID
            //项目状态
            this.hanleStatus =item.HandleStatus
            this.index =index
            console.log(this.selected);
          }
        },
        auditItem(dataType){
           if(this.selected.length>0){
               let data ={
                  HandleStatus:1,
                  ID:this.selected,
                  NextSetp:true,
                  PreSetp:false,
                  Remark:"",
                  State:"passed"
              }
              data.dataType =this.dataType
              if(this.hanleStatus===config.Submitted){
                
                MessageBox.confirm('审核项目信息').then(action=>{
                     data.dataType =this.dataType
                     const res =axios.post('/api/AuditItem',data)
                      res.then((data)=>{
                        console.log(data)
                        if(data.statusText=='OK'&&data.status===200){
                              Toast({
                                  message: "审核成功",
                                  position: "middle",
                                  duration: 800
                              })
                              this.$router.push({
                                  path:'/detail',
                                  query:{
                                    ID:this.Id
                                }
                            })
                        }
                      })
                },()=>{
                   Toast({
                      message: "取消审核",
                      position: "middle",
                      duration: 800
                  })
                })
              }else {
                Toast({
                   message:"当前项目状态不是已提交",
                   position:"middle",
                   duration:800
                })
              }

           }else {
               Toast({
                 message: "没有选中数据",
                 position: "middle",
                 duration: 1000
              })
           }
        },
        commit(dataType){
          if(this.selected.length>0){
              let data ={
                HandleStatus:0,
                ID:this.selected,
                NextSetp:true,
                PreSetp:false
              }
              data.dataType =this.dataType
              if(this.hanleStatus===config.ToSubmit){
                  MessageBox.confirm('提交数据?').then(action=>{
                     const res =axios.post(`/api/SetDateilCommitState`,data)
                     res.then((data)=>{
                         if(data.statusText=='OK'&&data.status===200){
                             Toast({
                                message:"已提交",
                                position:"middle",
                                duration:800
                             })
                            // this.$router.go(-1)
                            //  this.$router.push({
                            //      path:'/middle',
                            //      query:{
                            //        path:'/detail/sectionDetail',
                            //        type:this.dataType,
                            //        Id:this.Id
                            //      }
                            //   })
                              this.$router.push({
                                path:'/detail',
                                query:{
                                  ID:this.Id
                                }
                            })
                         }
                     })
                  },()=>{
                     Toast({
                        message: "取消操作",
                        position: "middle",
                        duration: 800
                    })
                  })
              }else {
                 Toast({
                    message:"数据状态不是待提交",
                    position:"middle",
                    duration:800
                 })
              }
          }else {
            Toast({
                message: "没有选中数据",
                position: "middle",
                duration: 800
            })
          }
        },
        revocation(dataType){
          if(this.selected.length>0){
              let data ={
                HandleStatus:1,
                ID:this.selected,
                NextSetp:false,
                PreSetp:true
             }
           if(this.hanleStatus===config.checked){
              MessageBox.alert('无法撤销已审阅的数据');
            }else if(this.hanleStatus===config.Submitted){
               data.dataType =this.dataType
              MessageBox.confirm('撤销提交?').then(action=>{
                      const res =axios.post('/api/RevocationItem',data)
                      res.then((data)=>{
                          console.log(data)
                          if(data.statusText=='OK'&&data.status===200){
                              Toast({
                                 message: "撤销成功",
                                 position: "middle",
                                 duration: 1000
                              })
                              console.log('撤销成功')
                              this.$router.push({
                                 path:'/detail',
                                 query:{
                                   ID:this.Id
                                 }
                              })
                          }else {
                            //失败
                          }
                      })
              },()=>{
                Toast({
                  message: "取消操作",
                  position: "middle",
                  duration: 800
                })
              })
           }else {
             Toast({
                 message: "当前数据未提交",
                 position: "middle",
                 duration: 800
               })
              return
          }
       
         }else {
           Toast({
                 message: "没有选中数据",
                 position: "middle",
                 duration: 800
              })
          }
        },
        swichState(item){
           switch(item.click){
             case 'auditItem':
                this.auditItem()
             break;
             case 'revocation':
                this.revocation()
              break;
              case 'commit':
                this.commit()
             break;
           }
        },
        checkbusinessData(Id){
          const res =axios.get(`/api/GetDetailByBusiness?Id=${Id}`)
          res.then((data)=>{
              if(data.data.data.rows>0){
                  this.list =data.data.data.rows;
                  this.load=true
                  this.loading =false
              }else {
                   Toast({
                      message: "没有数据",
                      position: "middle",
                      duration: 1000
                  })
                
              }
          })
        },
        _getData(type,Id){
           const res = axios.get(`/api/getSectionDetail?type=${type}&Id=${Id}`)
           res.then((data)=>{
               if(data.data.success===true&&data.data.data.total>0){ 
                  this.list =data.data.data.rows;
                  console.log(this.list)
                  this.load=true
                  this.loading =false

                  //重新刷新页面

               }else {
                    Toast({
                      message: "没有数据",
                      position: "middle",
                      duration: 1000
                    })
                    setTimeout(()=>{
                      this.$router.go(-1)
                    },1000)
               }

           },()=>{
              Toast({
                 message:"服务器错误",
              })
           })  
        }
    }
}
</script>


<style scoped>
.location {
  margin-left: 30px;
}
label {
  font-size: 12px;
  cursor: pointer;
}
.desc-text {
    color: #666;
    font-size: 14px;
    line-height:25px;
}
label i {
  font-size: 15px;
  font-style: normal;
  display: inline-block;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 12px;
  color: #fff;
  vertical-align: middle;
  margin: -2px 2px 1px 0px;
  border: #2489c5 1px solid;
  float:right;
}
.weui-cell-desc__text{
    color:#666;
    font-weight:bold;
}
.weui-cell-desc__sign{
    color:#39a0ff;
    font-weight:bold;
}
input[type="checkbox"],
input[type="radio"] {
  display: none;
}

input[type="radio"] + i {
  border-radius: 7px;
}

input[type="checkbox"]:checked + i,
input[type="radio"]:checked + i {
  background: #2489c5;
}

input[type="checkbox"]:disabled + i,
input[type="radio"]:disabled + i {
  border-color: #ccc;
}

input[type="checkbox"]:checked:disabled + i,
input[type="radio"]:checked:disabled + i {
  background: #ccc;
}

.tabbar-class {
  position: fixed;
}
</style>


