<template lang="pug">
#container.container(style="height:160%",ref="container")
 .page__bd
   .weui-cells__title.weui-head-text
      //mt-button(size="small",type="primary",@click='addTask') 返回
      span(style="padding-right:60px") 项目合同登记
      mt-button(style="margin-left:100px",size="small",type="primary",@click='addProduct') 产品信息
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目名称:
      .weui-cell__bd(style="padding-left:10px")
        p  {{data.rows[0].text}}
     .weui-cell
      .weui-cell__hd  
        label 项目编号:
      .weui-cell__bd(style="padding-left:10px")
        p  {{data.rows[0].ProjectNum}}
     .weui-cell.weui-cell_access(@click="selectClientele")
      .weui-cell__bd
       p 客户名称
      .weui-cell__ft {{clientName}}
     .weui-cell.weui-cell_access(@click="selectPaymethod")
      .weui-cell__bd
       p 付款方式
      .weui-cell__ft {{projectData.payType}}
     .weui-cell
      .weui-cell__hd
        label 合同编号
      .weui-cell__bd
     .weui-cell
      .weui-cell__hd
        label 合同金额
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:40%",type="number",placeholder="请输入合同金额",v-model="projectData.contractAmount")
     .weui-cell.weui-cell_access(@click='selectShock')
      .weui-cell__bd
       p 减震单位
      .weui-cell__ft {{conShock}}
     .weui-cell
      .weui-cell__hd
        label 对方签约人
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:37%",type="text",placeholder="请输入对方签约人")
     .weui-cell
      .weui-cell__hd
        label 我方签约人名字
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:29%",type="text",placeholder="请输入对方签约人",v-model="projectData.ourContractor")
     .weui-cell
      .weui-cell__hd
        label 我方签约人部门
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:29%",type="text",placeholder="请输入我方签约人部分",v-model="projectData.customerContractor")
     .weui-cell.weui-cell_access(@click='sleectStartDate')
      .weui-cell__bd
       p 开始时间
      .weui-cell__ft {{projectData.startDate}}
     .weui-cell.weui-cell_access(@click='selectEndDate')
      .weui-cell__bd
       p 预交付时间
      .weui-cell__ft {{projectData.endDate}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="主要条款",rows="2",v-model="projectData.mainContent")
       .weui-textarea-counter
        span 0/100
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="原内容被修改",rows="2",v-model="projectData.modifyContent")
       .weui-textarea-counter
        span 0/100
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="说明",rows="2",v-model="projectData.remarks")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
       .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
 mt-popup(v-model="isPicker",position="bottom",ref='Popup',popup-transition="popup-fade")
  mt-picker(class="mint-datetime-picker",ref="picker",:slots="slots",:show-toolbar="true",valueKey="text",@change="onValuesChange")
    span(class="mint-datetime-action mint-datetime-cancel",@click="closePopup") 取消
    span(class="mint-datetime-action mint-datetime-confirm",@click="pickerSave") 确定
 mt-datetime-picker(ref='endDatePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='startEndDateConfirm',:startDate='startDate')
 mt-datetime-picker(ref='startDatePicker',type='date',year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='startDateConfirm',:startDate='startDate')
</template>

<script>
import { mapState } from 'vuex'
import { Toast,Popup,Picker } from 'mint-ui'
import { Button } from 'mint-ui'
import axios from 'axios'
import { DatetimePicker } from 'mint-ui'
const manba =require('manba')
const uuid =require('uuid')
const sd = require('silly-datetime');
export default {
    middleware: 'wechat-auth',
    head(){
      return {
         title:'项目合同登记'
      }
    },
    data(){
      return {
        isPicker:false,
        slots:[],
        projectData:{
          advanceAmount:"",
          advanceRatio:"",
          approveState:0,
          contractAmount:"",
          customerContractor:"",//对方签约人
          startDate:'',
          endDate:'',
          paymethod:'',//付款类型
          remarks:'',
          mainContent:"",//主要条款
          modifyContent:"",//元内容
          payType:"",
          ourContractor:""
        },
        conShock:'', //减震单位
        conShockId:0,
        clientName:'',
        clientNameId:0,//客户Id
        Id:0,
        data:{},
        selected:{},
        load:false,
        startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
        clinetText:'',
        clientId:0,
        productList:[],
        conId:'',
        pickerType:'key',
        isClick:false
      }
    },
    created(){
      const { Id } =this.$route.query
      console.log(Id)
      if(!Id){
        this.$router.push({
           path:'/'
        })
        return false
      }
      this.Id =Id
    },
    beforeMount(){
      let viewmodel =this.contract
      if(viewmodel[this.Id]){
         this.data =viewmodel[this.Id].data
         this.projectData =viewmodel[this.Id].projectData
         this.productList =viewmodel[this.Id].productList
         if(viewmodel[this.Id].conShock.length>10){
             this.conShock =viewmodel[this.Id].conShock.substr(0,10)+"..."
         }else {
              this.conShock =viewmodel[this.Id].conShock
         }

         if(viewmodel[this.Id].clientName.length>10){
            this.clientName =viewmodel[this.Id].clientName.substr(0,10)+".."
         }else {
             this.clientName =viewmodel[this.Id].clientName
         }
         this.conShockId =viewmodel[this.Id].conShockId
         this.clientNameId =viewmodel[this.Id].clientNameId
         this.load =true
         console.log(viewmodel[this.Id])
      }else {
        this.getData(this.Id)
      }
    },
    computed:mapState([
       'contract'
    ]),
    methods:{
        startEndDateConfirm(value){
            this.projectData.endDate =manba(value).format('l')
        },
        startDateConfirm(value){
          this.projectData.startDate =manba(value).format('l')
        },
        sleectStartDate(){
           this.$refs.startDatePicker.open()
        },
        selectEndDate(){
          this.$refs.endDatePicker.open()
        },

        pickerSave(){
           if(!this.selected[0]){
             switch(this.pickerType){
               case "payment":
                 this.projectData.payType ="有预付款"
                break;
             }
             this.isPicker =false
             return
           }
           let key =this.selected[0].key
           let value =this.selected[0].text
           switch(key){
             case 'payment':
               this.projectData.payType =value
              break
           }
           this.isPicker =false
        },
        closePopup(){
              this.isPicker =false
        },
        selectPaymethod(){
          this.slots =[
            {
              flex:1,
              values:[{
                text:'有预付款',
                 key:'payment'
              },{
                text:'无预付款',
                key:'payment'
              }],
              defaultIndex:1
            }
          ]
          this.pickerType ='payment'
          this.isPicker =true
        },
        selectClientele(){
          let item ={}
          item.data =this.data
          item.projectData =this.projectData
          item.Id =this.Id
          item.productList =this.productList
          item.conShock =this.conShock
          item.conShockId =this.conShockId
          item.clientName =this.clientName
          item.clientNameId =this.clientNameId
          this.$store.dispatch('updateContract',item)
          this.$router.push({
             path:'/project/unitList',
             query:{
               Id:this.Id,
               str:'客户名称'
             }
          })
        },
        selectShock(){
          let item ={}
          item.data =this.data
          item.projectData =this.projectData
          item.Id =this.Id
          item.productList =this.productList
          item.conShock =this.conShock
          item.conShockId =this.conShockId
          item.clientName =this.clientName
          item.clientNameId =this.clientNameId
          this.$store.dispatch('updateContract',item)
          this.$router.push({
             path:'/project/unitList',
             query:{
               Id:this.Id,
               str:'减隔震厂商合同'
             }
          })
        },
        onValuesChange(picker,values){
          this.selected ={}
          console.log(values)
          if(values.length>0){
              this.selected =values
          }else {
            alert('111')
          }
        },
        getData(Id){
          const res =axios.get(`/api/ProjectBusiness?Id=${Id}`)
          res.then((data)=>{
            if(data.status==200){
              this.data = JSON.parse(data.data.data)
              this.load =true
              console.log(this.data)
            }
          },()=>{
            // server 500

          })
        },
        normalizeProduct(list){
            let map =[]
            list.forEach((item,index)=>{
                map.push({
                    No:uuid.v4(),
                    ConnectionForm:item.productsForm,
                    Amount:item.productNums,
                    ProductName:item.productName
                })
            })
            return map
        },
        commit(){
          let data ={
            form:{
              AdvanceAmount:"0.00",//预付款金额
              AdvanceRatio:"0.00",//预付款比例
              ApplyDate:"",//审批状态
              ApplyPerson:"",
              ApproveState:0,
              ContractAmount:this.projectData.contractAmount,
              CooperateUnitID:this.conShockId,//建隔震配合单位
              CustomerContractor:this.projectData.customerContractor,
              CustomerUnitID:this.clientNameId,//客户
              EstimateDeliveryDate:this.projectData.endDate,
              HandleStatus:1,
              ID:this.conId,
              MainContent:this.projectData.mainContent,
              ModifyContent:this.projectData.modifyContent,
              OurContractor:this.projectData.ourContractor,
              PayType:this.projectData.payType,
              ProjectID:this.Id,
              ProjectNum:this.data.rows[0].ProjectNum,
              Remarks:this.projectData.remarks,
              StartDate:this.projectData.startDate
            },
              _changed:true,
              _isNew:true
          }
         console.log(this.data) 
          let result = this.verifyData(this.projectData)
          if(result){
             Toast({
                 message: "数据填写不完整",
                 position: "middle",
                duration: 800
             })
          }else {
            if(this.isClick){
                Toast({
                    message: "不要重复点击",
                    position: "middle",
                    duration: 600
                })
                setTimeout(()=>{
                        this.$router.go(-1)
                  },1000)
                  return 
              }
             const res = axios.post('/api/CommitContract',data)
             res.then((data)=>{
          
              if(data.statusText==='OK'){
                  this.isClick =true
                  Toast({
                    message: "已提交",
                    position: "middle",
                    duration: 800
                  })
                  this.$store.dispatch('clearContract',this.Id)
                  setTimeout(()=>{
                    this.$router.go(-1)
                  },800)
              }
            })
          }
        },
        addProduct(){
            let item ={}
            this.conId =uuid.v4()
            item.data =this.data
            item.projectData =this.projectData
            item.Id =this.Id
            item.productList =this.productList
            item.conShock =this.conShock
            item.conShockId =this.conShockId
            item.clientName =this.clientName
            item.clientNameId =this.clientNameId
            this.$store.dispatch('updateContract',item)
            this.$router.push({
                path:'/project/contractList',
                query:{
                  Id:this.Id,
                  conId:this.conId
                }
            })
        },
        verifyData(projectData){
           return false
        }
    },
    components:{
        "mt-picker":Picker,
        "mt-popup":Popup,
        "mt-button":Button,
        "mt-datetime-picker":DatetimePicker
    }
}
</script>

<style scoped>
.require {
  color: red;
}
.project-name {
  margin-left: 13%;
}
.tabbar-class {
  position: fixed;
}
.text-ui {
  margin-left: 24%;
  font-size: 14px;
}
.mint-datetime {
  width: 100%;
}
.mint-datetime .picker-slot-wrapper,
.mint-datetime .picker-item {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.mint-datetime .picker-toolbar {
  border-bottom: solid 1px #eaeaea;
}
.mint-popup {
  z-index: 2003;
  width: 100%;
  height: 46%;
}
.mint-datetime-action {
  display: inline-block;
  width: 33%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #26a2ff;
}
.mint-datetime-cancel {
  float: left;
  color: #666;
}
.mint-datetime-confirm {
  float: right;
}
.weui-btn-tz {
  width: 90%;
  height: 40px;
}
.mint-datetime-text {
  color: black;
  text-align: center;
}
.picker-item {
  font-size: 0.32rem;
}
</style>
