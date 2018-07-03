<template lang="pug">
#container.container(style="height:110%",ref="container")
 .page__bd
   .weui-cells__title 项目投标申请
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label 项目名称:
      .weui-cell__bd(style="padding-left:10px")
        p {{data.rows[0].text}}
     .weui-cell
      .weui-cell__hd
        label 项目编号:
      .weui-cell__bd(style="padding-left:10px")
        p {{data.rows[0].ProjectNum}}
     .weui-cell.weui-cell_access(@click="product")
      .weui-cell__bd
       p 产品类型
      .weui-cell__ft {{projectData.product}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 所在省市区
      .weui-cell__ft 
     .weui-cell
      .weui-cell__hd
        label 投标地点
      .weui-cell__bd
        input.weui-input.text-ui(type="text",placeholder="请输入投标地点",v-model="projectData.bidingAddress")
     .weui-cell.weui-cell_access(@click="estimatedStartDate")
      .weui-cell__bd
       p 投标时间
      .weui-cell__ft {{projectData.bidingDate}}
     .weui-cell.weui-cell_access(@click="bidingLint")
      .weui-cell__bd
       p 投标公司
      .weui-cell__ft {{shock}}
     .weui-cell
      .weui-cell__hd
        label 被授权人
      .weui-cell__bd
        input.weui-input.text-ui(type="text",placeholder="请输入被授权人",v-model="projectData.certigier")
     .weui-cell.weui-cell
      .weui-cell__bd
       p 商务负责人
      .weui-cell__ft {{data.rows[0].BusinessManager}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 技术负责人
      .weui-cell__ft {{data.rows[0].TechnicalManager}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="备注",rows="2",v-model="projectData.remarks")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
       .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
 mt-datetime-picker(ref='datePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='dateConfirm',:startDate='startDate')
 mt-popup(v-model="isPicker",position="bottom",ref='Popup',popup-transition="popup-fade",class="poput")
    mt-picker(class="mint-datetime-picker",ref="picker",:slots="slots",:show-toolbar="true",valueKey="text",@change="onValuesChange")
        span(class="mint-datetime-action mint-datetime-cancel",@click="closePopup") 取消
        span(class='mint-datetime-action mint-datetime-text') {{pickerText}}
        span(class="mint-datetime-action mint-datetime-confirm",@click="pickerSave") 确定
</template>

<script>
import { mapState } from 'vuex'
import { Toast ,Popup,Picker } from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
import axios from 'axios'
const manba  =require('manba')
const sd = require('silly-datetime');
export default {
    middleware: 'wechat-auth',
    head(){
        return {
            title:'项目投标申请'
        }
    },
    data(){
        return {
            isPicker:false,
            slots:[],
            projectData:{
                remarks:'',
                product:'',
                bidingAddress:'',
                bidingDate:'',
                certigier :''
            },
            Id:0,
            data:{},
            shock:'',
            shockId:'',
            selected:{},
            pickerText:'标题',
            load:false,
            startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
            pickerType:'key',
            isClick:false
        }
    },
    created(){
        const { Id } =this.$route.query
        if(!Id){
            this.$router.push({
                path:'/'
            })
            return false
        }
        this.Id =Id
    },
    beforeMount(){
        let viewmodel =this.biding
        if(viewmodel[this.Id]){
            this.data =viewmodel[this.Id].data
            this.projectData  =viewmodel[this.Id].projectData
            this.shock =viewmodel[this.Id].shock
            this.shockId =viewmodel[this.Id].shockId
            if(viewmodel[this.Id].shockId){
                if(viewmodel[this.Id].shockId.length>10){
                    this.shock =viewmodel[this.Id].shock.substr(0,10)+"..."
                }else {
                     this.shock =viewmodel[this.Id].shock
                }
            }
           
            this.load =true
        }else {
           this.getData(this.Id)
        }
    },
    computed:mapState([
        'biding'
    ]),
    methods:{
        product(){
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
        bidingLint(){
            let item ={}
            item.Id =this.Id
            item.data =this.data
            item.projectData =this.projectData
            this.data.Id =this.Id
            this.$store.dispatch('updateBiding',item)
            this.$router.push({
                path:'/project/unitList',
                query:{
                   str:'减隔震厂商',
                   Id:this.Id
                }
            })
        },
        closePopup(){
            this.isPicker =false
        },
        estimatedStartDate(){
          this.$refs.datePicker.open()
       },
        dateConfirm(value){
             console.log(manba(value).format('l'))
            this.projectData.bidingDate =manba(value).format('l')
        },
         onValuesChange(picker, values) {
            this.selected ={}
            this.selected =values
       },
        pickerSave(){
            if(!this.selected[0]){
                switch(this.pickerType){
                    case "product":
                     this.projectData.product ='天然橡胶支架'
                    break;
                }
                this.isPicker =false
                return
            }
            let key =this.selected[0].key
            let value =this.selected[0].text
            switch(key){
                case 'product':
                  this.projectData.product =value
                  break
            }
            this.isPicker  =false
        },
        onValuesChange(picker,values){
            this.selected = {};
            this.selected = values;
            console.log(values)
        },
        getData(Id){
            const res =axios.get(`/api/GetBiding?Id=${Id}`)
            res.then((data)=>{
          
                this.data =data.data.data
                console.log(this.data)
                this.load =true
            })
        },
        commit(){
            let data  ={
                form:{
                    Address:this.projectData.bidingAddress,
                    ApplyDate:"",
                    ApplyPerson:"",
                    AuthorizedPerson:this.projectData.certigier,
                    BidDate:this.BidDate,
                    BidUnitID:this.shockId,
                    BusinessManager:this.data.rows[0].BusinessManager,
                    HandleStatus:1,
                    ID:"",
                    ProductType:this.projectData.product,
                    ProjectID:this.Id,
                    ProjectNum:this.data.rows[0].ProjectNum,
                    ProjectName:this.data.rows[0].ProjectName,
                    RegionCode:"",
                    Remarks:this.projectData.Remarks,
                    TechnicalManager:this.data.rows[0].TechnicalManager
              },
             _changed:true,
             _isNew:true

            }
            let result = this.verifyData(this.projectData)
            if(!result){
                Toast({
                    message: "请填写完整",
                    position: "middle",
                    duration: 1000
                })
            }else{
                 if(this.isClick){
                    Toast({
                        message: "不要重复点击",
                        position: "middle",
                        duration: 600
                    })
                    setTimeout(()=>{
                        this.$router.go(- 1)
                },1000)
                    return
                }
                const res =axios.post('/api/CommitBiding',data)
                res.then((data)=>{
                      if(data.statusText=='OK'){
                        this.isClick =true
                        Toast({
                                message: "提交成功",
                                position: "middle",
                                duration: 800
                            });
                             this.$store.dispatch('clearBiding',this.Id)
                            //回到上一级
                            setTimeout(()=>{
                              this.$router.go(-1)
                            },1000)
                        }
                })
            }
        },
        verifyData(projectData){
            if(!projectData.product){
                return false 
            }
            if(!projectData.certigier){
                return false
            }
            if(!projectData.bidingAddress){
                return false
            }
            return true
        },
    },
    components:{
        "mt-datetime-picker":DatetimePicker,
        "mt-picker":Picker,
        "mt-popup":Popup
    },
    deactivated() {
      clearTimeout(this.timer);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
   },
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
  color: #26a2ff;
  text-align: center;
}
</style>


