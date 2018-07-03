<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-cells__title
        span 项目商务阶段项目跟踪反馈
        mt-button(size="small",type="primary",@click='commit') 提交
      .weui-tab
        .weui-tab__panel
          mt-loadmore(:bottom-all-loaded="allLoaded",ref="loadmore")
           ul.list(id="ul-box",class="ul-box starth")
            li.weui-cells(v-for="(item,index) in businListData",:key="index",@touchstart='showActionSheet'
   ,@touchend='clearLoop')
              .weui-cell
                .weui-cell__hd
                label 配合人
                .weui-cell__bd
                 input.weui-input(type='text',placeholder='',v-model='item.cooperate')
              .weui-cell.weui-cell_access(@click="taskEndDate(index)")
                .weui-cell__bd
                   p 完成时间
                .weui-cell__ft {{item.date}}
              .weui-cell
                .weui-cell__bd
                textarea.weui-textarea(placeholder="配合内容",rows="2",v-model='item.content')
                .weui-textarea-counter
                    span 0/100
    mt-datetime-picker(ref='datePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='dateConfirm',:startDate='startDate')
</template>

<script>
import { mapState } from 'vuex'
import { Button } from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
const sd = require('silly-datetime');
const manba  =require('manba')

export default {
    middleware: 'wechat-auth',
    data(){
        return {
            businListData:[{
                cooperate:'',
                date:'',
                content:''
            }],
            Id:0,
            loop:null,
            isShow:false,
            startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
            allLoaded:false,
            index:0,
            isClick:false
        }
    },
    created(){
         const { Id } =this.$route.query
         if(!Id){
            alert('id不在');
         }
         this.Id =Id
    },
    methods:{
        commit(){
            if(this.isClick){
                Toast({
                    message: "不要重复点击",
                    position: "middle",
                    duration: 1000
                })
                
                return
            }
            let flag =this.verifyData(this.businListData)
            if(!flag){
                Toast({
                        message: "请填写完整",
                        position: "middle",
                        duration: 1000
                });
            }else {
               let item ={}
               item.Id =this.Id
               item.list =this.businListData
               this.$store.dispatch('updateTask',item)
               this.$router.go(-1)
            }
           console.log(this.businListData)

        },
        taskEndDate(index){
            this.index =index
            this.$refs.datePicker.open()
        },
        addTask(){
            this.businListData.push({
                cooperate:'',
                date:'',
                content:''
            })
        },
        dateConfirm(value){
            console.log(manba(value).format('l'))
            this.businListData[this.index].date =manba(value).format('l')
       },
        showActionSheet(){
            clearInterval(this.loop)
            this.loop =setTimeout(()=>{
                this.isShow=true
                alert('长安')
            },500)
        },
        verifyData(list){
            list.forEach((item,index)=>{
                if(!item.cooperate){
                    return false
                }

                if(!item.content){
                    return false
                }

                if(!item.date){
                    return false
                }
            })
            return true
        },
        clearLoop(){
            clearInterval(this.loop)
        }
    },
    components:{
         "mt-button":Button,
         "mt-datetime-picker":DatetimePicker
    }
}
</script>


