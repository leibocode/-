<template lang="pug">
#container.container(style="height:110%",ref="container")
 .page__bd
   .weui-cells__title 项目收款登记
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目名称:
      .weui-cell__bd
        p {{data.ProjectName}}
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目编号:
      .weui-cell__bd
        p {{data.ProjectNum}}
     .weui-cell.weui-cell_access
      .weui-cell__bd
       p 客户名称
      .weui-cell__ft {{data.CustomerUnit}}
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 收款金额
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:38%",type="number",placeholder="请输入金额",v-model="projectData.momey")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 联系人
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:38%",type="text",placeholder="请输入联系人",v-model="projectData.contact")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 联系人带电话
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:38%",type="text",placeholder="请输入联系人",v-model="projectData.phone")
     .weui-cell.weui-cell_access(@click="estimatedStartDate")
      .weui-cell__bd
       p 收款时间
      .weui-cell__ft {{projectData.date}}
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 凭证号码
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:38%",type="number",placeholder="请输入联系人",v-model="projectData.number")
     .weui-cell.weui-cell_access(@click="selectPayWay")
      .weui-cell__bd
       p 付款方式
      .weui-cell__ft {{projectData.payWay}}
     .weui-cell.weui-cell_access(@click="selectPayType")
      .weui-cell__bd
       p 收款 类别
      .weui-cell__ft {{projectData.payType}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="备注",rows="2",v-model="projectData.remark")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
    .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
 mt-datetime-picker(ref='datePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='dateConfirm',:startDate='startDate')
 mt-popup.mint-popup(v-model="isPicker",position="bottom",ref='Popup',popup-transition="popup-fade")
  mt-picker(class="mint-datetime-picker",ref="picker",:slots="slots",:show-toolbar="true",valueKey="text",@change="onValuesChange")
    span(class="mint-datetime-action mint-datetime-cancel",@click="closePopup") 取消
    span(class='mint-datetime-action mint-datetime-text') {{pickerText}}
    span(class="mint-datetime-action mint-datetime-confirm",@click="pickerSave") 确定

</template>

<script>
import {  Popup, Picker } from "mint-ui"
import { Toast } from 'mint-ui'
import axios from "axios"
import { DatetimePicker } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { mapState } from 'vuex';
const sd = require('silly-datetime');
const manba  =require('manba')
export default {
    middleware: 'wechat-auth',
    head(){
        return {
            title:'收款登记'
        }
    },
    data(){
        return {
             isPicker:false,
             slots:[],
             projectData:{
                 momey:'',
                 phone:'',
                 contact:'',
                 number:'',
                 remark:'',
                 payType:'',
                 payWay:'',
                 date:''
             },
             Id:0,
            data:{},
            load:false,
            selected:{},
            pickerText:'标题',
            startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
        }
    },
    created(){
        const { Id } = this.$route.query;
        console.log(Id)
        if(!Id){
          this.$router.push({
            path:'/'
          })
           return false
        }
        this.Id =Id
        this.checkReceive(Id)
    },
    beforeMount(){
       //let viewmodel =this.
    },

    methods:{
      selectPayType(){
           this.slots =[
         {
           flex:1,
           values:[{
              text:'预付款',
              key:'payType',
           },{
             text:'其他',
             key:'payType'
           }],
           textAlign:'center'
         }
        ]
        this.isPicker =true
      },
      closePopup(){
       this.isPicker =false
     },
      //付款方式
       selectPayWay(){
           this.slots =[
         {
           flex:1,
           values:[{
              text:'个人',
              key:'payWay',
           },{
             text:'对公账户',
             key:'payWay'
           }],
           textAlign:'center'
         }
        ]
        this.isPicker =true
       },
        //时间Picker 
        estimatedStartDate(){
          this.$refs.datePicker.open()
        },
        dateConfirm(value){
          this.projectData.date =manba(value).format()
        },
        //bug
        onValuesChange(picker, values) {
          this.selected ={}
          if(values.length>0){
              this.selected =values     
          }else {
            alert("没有值");
          }
        },
        pickerSave(){
          console.log(this.selected[0])
          let key =this.selected[0].key
          let value =this.selected[0].text
          console.log(this.selected[0].text)
          switch(key){
            case 'payWay':
              this.projectData.payWay =value
              break
            case 'payType':
              this.projectData.payType =value
              break;
          }
          this.isPicker =false
         },
        getData(Id){
            const res =axios.get(`/api/ReceiveGroup?Id=${Id}`)
            res.then((data)=>{
                console.log(data.data.data)
            })
        },
        checkReceive(Id){
           const res = axios.get(`/api/checkReceive?Id=${Id}`)
            res.then((data)=>{
              if(!data.data.flag){
                  MessageBox.confirm('当前项目没有合同,前往添加?').then(action=>{
                         this.$router.push({
                            path:'/project/contract',
                            query:{
                              Id:this.Id
                            }
                          })
                    },()=>{
                        this.$router.go(-1)
                  })
               }else {
                  this.load =true
                  this.data =data.data.data
               }
            })
        },
        commit(){
          let data ={
            form:{
              CustomerUnitID:"",
              HandleStatus:1,
              ID:"",
              PayType:this.projectData.payWay,
              ProjectID:this.Id,
              ProjectNum:this.data.ProjectNum,
              ReceiveAmount:this.projectData.momey,
              ReceiveType:this.projectData.payType,
              Remarks:this.projectData.remarks,
              ReceiveDate:this.projectData.date,
              ReceiveNum:this.projectData.number,
              Phone:this.projectData.phone,
              ContactName:this.projectData.contact
            },
            _changed:true,
            _isNew:true
          }
          let result =this.verifyData(this.projectData)
          if(!result){
            Toast({
                message: "请填写完整",
                position: "middle",
                duration: 1000
            })
          }else {
            //提交后端
            const res = axios.post('/api/CommitReceive',data)
            res.then((data)=>{
              console.log(data);
               if(data.data.success){
                  Toast({
                     message: "已提交",
                     position: "middle",
                     duration: 1000
                  })
                  this.$router.go(-1)
               }
            })
          }
        },
        verifyData(projectData){
          if(!projectData.momey){
            return false
          }
          if(!projectData.payType){
            return false
          }
          if(!projectData.payWay){
            return false
          }
          return true
        }
    },
    components:{
        "mt-popup":Popup,
        "mt-picker":Picker,
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