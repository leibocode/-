<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-cells__title
        span 产品信息
        mt-button(size="small",type="primary",@click='commit') 提交
      .weui-tab
        .weui-tab__panel
           ul.list(id="ul-box",class="ul-box starth")
            li.weui-cells(v-for="(item,index) in quotedList",:key="index",@touchstart='showActionSheet'
   ,@touchend='clearLoop')
              .weui-cell.weui-cell_access(@click="selectProductName(index)")
                .weui-cell__bd
                   p 产品名称 
                .weui-cell__ft {{item.productName}}
              .weui-cell
                .weui-cell__hd
                label 产品数量:
                .weui-cell__bd
                 input.weui-input(type='text',placeholder='',v-model='item.productsForm')
              .weui-cell
                .weui-cell__hd
                label 检测数量:
                .weui-cell__bd
                 input.weui-input(type='text',placeholder='',v-model='item.datactionNums')
  mt-popup.mint-popup(v-model="isPicker",position="bottom",ref='Popup')
    mt-picker(class="mint-datetime-picker",ref="picker",:slots="slots",:show-toolbar="true",valueKey="text",@change="onValuesChange")
        span(class="mint-datetime-action mint-datetime-cancel",@click="closePopup") 取消
        span(class="mint-datetime-action mint-datetime-confirm",@click="pickerSave") 确定

</template>
<script>
import { mapState } from 'vuex'
import { Button } from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
import { Picker } from 'mint-ui'
import { Popup } from 'mint-ui'
const manba  =require('manba')
const sd = require('silly-datetime')
export default { 
    middleware: 'wechat-auth',
    data() {
        return {
            quotedList:[{
               productName :'',
                productNums :'',
                datactionNums :''
             }],
            Id:0,
            loop:null,
            isPicker:false,
            slots:[],
            startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
            allLoaded:false,
            index:0,
            selected:{},
            pickerType:'key'
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
            let flag =this.verifyData(this.quotedList)
            if(!flag){
                Toast({
                        message: "请填写完整",
                        position: "middle",
                        duration: 1000
                });
            }else {
               let item ={}
               item.Id =this.Id
               item.list =this.quotedList
               this.$store.dispatch('updateContractProduct',item)
               this.$router.go(-1)
            }
           console.log(this.quotedList)

        },
        
        pickerSave(){
         if(!this.selected[0]){
             switch(this.pickerType){
                 case "product":
                  this.quotedList[this.index].productName ="天然橡胶支座"
                  break;
             }
             this.isPicker =false
             return
          }
           let key =this.selected[0].key
           let value =this.selected[0].text
           console.log(key)
           console.log(value)
            switch(key){
                case 'product':
                this.quotedList[this.index].productName =value
                //console.log(this.quotedList[this.index].productName)
                //this.quotoedList[this.index].productName =value
                break;
            }
            this.isPicker = false;
        },
        selectProductName(index){
            this.index =index
              this.slots =[
                {
                    flex:1,
                    values:[{
                        text:'摩擦阻力器',
                        key:'product'
                    },{
                        text:'屈曲约束支撑BRB/UBB',
                         key:'product'
                    },{
                        text:'天然橡胶支座',
                         key:'product'
                    },{
                        text:'叠层橡胶支座',
                         key:'product'
                    },{
                        text:'铅芯橡胶支座',
                         key:'product'                        
                    },{
                        text:'高阻尼橡胶支座',
                         key:'product'                        
                    },{
                        text:'球形支座',
                         key:'product'                        
                    },{
                        text:'摩擦摆支座',
                         key:'product'                        
                    },{
                        text:'滑板支座',
                         key:'product'                        
                    },{
                        text:'剪切型阻尼器',
                         key:'product'                        
                    },{
                        text:'弯曲型阻尼器',
                         key:'product'                        
                    },{
                        text:'连梁阻尼器',
                         key:'product'                        
                    },{
                        text:'金属耗能减震墙',
                         key:'product'                        
                    },{
                        text:'金属软钢阻尼器',
                         key:'product'                        
                    },{
                        text:'粘滞阻尼器',
                         key:'product'                        
                    },{
                        text:'粘滞阻尼墙',
                         key:'product'                        
                    },{
                        text:'粘弹性阻尼器',
                         key:'product'                        
                    },{
                        text:'粘弹性阻尼墙',
                         key:'product'                        
                    },{
                        text:'调谐质量阻尼器TMD',
                         key:'product'                        
                    },{
                        text:'调频液体阻尼器TLD',
                         key:'product'                        
                    }],
                    textAlign:'center'
                }
            ]
            this.pickerType ='product'
            this.isPicker =true
        },
        onValuesChange(picker,values){
            this.selected = {};
            this.selected = values;
        },
        closePopup(){
            this.isPicker  =false
        },
        taskEndDate(index){
            this.index =index
            this.$refs.datePicker.open()
        },
        addTask(){
            this.quotoedList.push({
                productName:'',
                productsForm:'',
                productNums:'',
                productCentent:''
            })
        },
        showActionSheet(){
            clearInterval(this.loop)
            this.loop =setTimeout(()=>{
                this.isShow=true
                //alert('长安')
                console.log('手指长按')
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
    components: {
         "mt-button":Button,
         "mt-picker":Picker,
         "mt-popup":Popup
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
.weui-head-text{
  text-align:center;
}
.weui-head-rbutton{
  margin-right:20%;
}
</style>

