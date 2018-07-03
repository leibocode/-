<template lang="pug">
#container.container(style="height:100%",ref="container")
 .page__bd
   .weui-cells__title.weui-head-text
      //mt-button(size="small",type="primary",@click='addTask') 返回
      span  项目商务阶段项目跟踪反馈
      mt-button(style="margin-left:90px",size="small",type="primary",@click='addTask') 添加任务
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目名称:
      .weui-cell__bd(style="padding-left:10px")
        p {{data.rows[0].text}}
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目编号:
      .weui-cell__bd(style="padding-left:10px")
        p {{data.rows[0].ProjectNum}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 商务负责人
      .weui-cell__ft {{data.rows[0].BusinessManager}}
     .weui-cell.weui-cell_access(@click='taskEndDate')
      .weui-cell__bd
       p 任务完成时间
      .weui-cell__ft {{projectData.date}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 技术负责人
      .weui-cell__ft {{data.rows[0].TechnicalManager}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="落实情况",rows="2",v-model="projectData.content")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
       .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
 mt-datetime-picker(ref='datePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='dateConfirm',:startDate='startDate')
</template>

<script>
import { mapState } from 'vuex'
import { Toast,Popup,Picker } from 'mint-ui'
import { Button } from 'mint-ui'
import axios from 'axios'
import { DatetimePicker } from 'mint-ui'
import { MessageBox } from 'mint-ui'

const manba  =require('manba')
const uuid =require('uuid')
const sd = require('silly-datetime')

export default {
    middleware: 'wechat-auth',
    head(){
        return {
            title:'商务阶段项目跟踪反馈'
        }
    },
    data(){
        return {
            projectData:{
              date:null,
              remarks:'',
              content:''
            },
            data:{},
            taskList:[],
            Id:0,
            load:false,
            projectNum:0,
            phaseId:0,
            startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
            isClick:false
        }
    },
    beforeCreate(){

    },
    created(){
        const { Id } =this.$route.query
        this.Id =Id
        this.checkbusinessData(Id)
        
    },
    beforeMount(){
      let viewmodel =this.business
      console.log(viewmodel)
      if(viewmodel[this.Id]){
         console.log(viewmodel[this.Id])
         this.data =viewmodel[this.Id].data
         this.projectData =viewmodel[this.Id].projectData
         this.taskList =viewmodel[this.Id].taskList
         this.load =true
      }else {
        console.log("第一次加载数据");
         this.getData(this.Id)
      }
    },
    computed:mapState([
      'business'
    ]),
    methods:{
        pickerSave(){

        },
        closePopup(){
            this.isPicker = false;
        },
        dateConfirm(value){
          this.projectData.date =manba(value).format('l')
        },
        addTask(){
          let  item ={}
          item.data =this.data
          item.projectData =this.projectData
          item.Id =this.Id
          this.$store.dispatch('updateBusiness',item)
          this.$router.push({
             path:'/project/businessList',
             query:{
               Id:this.Id
             }
          })
        },
        taskEndDate(){
           this.$refs.datePicker.open()
        },
        normalizeTask(taskList){
          let map =[]
          taskList.forEach((item,index)=>{
              map.push({
                 No:uuid.v4(),
                 UserName:item.cooperate,
                 Content:item.content,
                 Date:item.Date
              })
          })
          return map
        },
       commit(){
          let taskList =this.normalizeTask(this.taskList)
          console.log(taskList)
          let data ={
            form:{
                ApplyPerson:"",
                ChargePerson:"",
                Completions:taskList,
                Content:this.projectData.content,
                FinishTime:this.projectData.date,
                HandleStatus:1,
                ID:"",
                PhaseID:this.phaseId,
                ProjectID:this.Id,
                ProjectNum:this.data.rows[0].ProjectNum,
                Remarks:this.projectData.remarks
            },
            _changed:true,
            _isNew:true
           }
           this.isClick =true
          let flag =this.verifyData(this.projectData)
          if(!flag){
              Toast({
                message: "请填写完整",
                position: "middle",
                duration: 1000
              });
          }else {
              // if(this.isClick){
              //     Toast({
              //         message: "不要重复点击",
              //         position: "middle",
              //         duration: 1000
              //     })
              //     setTimeout(()=>{
              //           this.$router.go(- 1)
              //     },1000)
              //   return
              // }
             const res =axios.post(`/api/PhaseFeedback`,data)
             res.then((data)=>{
                this.isClick =true
                if(data.statusText==='OK'){
                   Toast({
                       message: "已提交",
                       position: "middle",
                       duration: 800
                   })
                  this.$store.dispatch('clearBusiness',this.Id)
                   setTimeout(()=>{
                     this.$router.go(-1)
                   },800)
                }
             },()=>{
                //网络错误，服务器挂了
             })
          }
        },
        verifyData(projectData){//验证数据
           if(!projectData.date){
             return false
           }
           return true
        },
        checkbusinessData(Id){
          const res =axios.get(`/api/BusinessStage?Id=${Id}`)
          res.then((data)=>{
              console.log(data)
               if(!data.data.flag){
                    MessageBox.confirm('当前没有商务阶段数据,前往添加?').then(action=>{
                         this.$router.push({
                             path:'/project/businessPhase',
                             query:{
                               Id:this.Id
                             }
                         })
                    },()=>{
                        this.$router.go(-1)
                    })
               }else {
                 this.phaseId =data.data.phaseId
                 console.log(this.phaseId);
               }
          })
        },
        getData(Id){
           const res =axios.get(`/api/ProjectBusiness?Id=${Id}`)
           res.then((data)=>{
             if(data.status==200){
                 this.data = JSON.parse(data.data.data)
                 this.load =true
             }
           
           },()=>{
             //网络错误，服务器
           })
        }
    },
    components:{
      "mt-button":Button,
      "mt-datetime-picker":DatetimePicker
    }
}
</script>

<style scoped>
.weui-head-text span {
  float: left;
}
.mt-buttons {
  margin-left: 20px;
}
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
.weui-head-text{
  text-align:center;
}
.weui-head-rbutton{
  margin-right:20%;
}
</style>
