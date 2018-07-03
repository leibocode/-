<template lang="pug">
#container.container(style="height:110%",ref="container")
 .page__bd
   .weui-cells__title 项目收款登记
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目名称:
      .weui-cell__bd
        p xxx
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目编号:
      .weui-cell__bd
        p xxxx
     .weui-cell.weui-cell_access(@click="selectUnit")
      .weui-cell__bd
       p 终止时间
      .weui-cell__ft
     .weui-cell.weui-cell_access(@click="selectUnit")
      .weui-cell__bd
       p 终止原因
      .weui-cell__ft
     .weui-cell.weui-cell_access(@click="selectUnit")
      .weui-cell__bd
       p 中标单位
      .weui-cell__ft
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 中标金额
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left:38%",type="text",placeholder="请输入金额",v-model="projectData.number")
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="=说明",rows="2",v-model="projectData.remark")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
    .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
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
export default {
    middleware: 'wechat-auth',
    head(){
        return {
            title:'项目终止'
        }
    },
    data(){
        return {
             isPicker:false,
             slots:[],
             projectData:{
             },
             Id:0,
            data:{},
            load:true,
            selected:{},
            pickerText:'标题'
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
        this.getData(Id)
    },
    methods:{
        getData(Id){
            // const res =axios.get(`/api/ReceiveGroup?Id=${Id}`)
            // res.then((data)=>{
            //     console.log(data.data.data)
            // })
        },
        closePopup() {
         this.isPicker = false;
       },
        pickerSave(){

        },
        onValuesChange(picker, values) {
           this.selected = {};
           this.selected = values;
        },
        commit(){
          let data ={
            form:{
              CustomerUnitID:"FE4678D6-79E4-4F7A-9C34-1017956FBB9A",
              HandleStatus:1,
              ID:"7732B369-4E79-46AC-8298-B91295C0EADB",
              PayType:"个人",
              ProjectID:"6FBF0658-81F3-45CC-AE16-85E9F608E287",
              ProjectNum:"2170827",
              ReceiveAmount:"100.00",
              ReceiveType:"预付款",
              Remarks:"测试"
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
            
          }
        },
        verifyData(projectData){
          if(!projectData.momey){
            return false
          }
          return true
        }
    },
    components:{
        Popup,
        Picker,
        DatetimePicker
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