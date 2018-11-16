<template lang="pug">
#container.containers(ref="container")
 .page__bd
   .weui-cells__title 项目申请表
   .weui-cells
     .weui-cell
      .weui-cell__hd
        label 项目名称
      .weui-cell__bd
        input.weui-input.text-ui(type="text",placeholder="请输入项目名称",v-model="projectData.projectName")
     .weui-cell.weui-cell_access(@click="pickerProjectType",)
      .weui-cell__hd(style="width:68.76%")
       label(@click="pickerProjectType") 项目类别
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入项目类别",v-model="projectData.projectType")
      .weui-cell__ft
     .weui-cell.weui-cell_access(@click="pickerProjectKind")
      .weui-cell__hd(style="width:68.76%")
       label(@click="pickerProjectKind") 项目分类
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入项目分类",v-model="projectData.classification")
      .weui-cell__ft

   .weui-cells
     .weui-cell.weui-cell_access(@click="areaPicker")
      .weui-cell__hd(style="width:68.76%")
       label(@click="areaPicker") 项目地a址
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入项目地a址",v-model="projectData.regionCode")
      .weui-cell__ft
     .weui-cell
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left: 0.3%;",type="text",placeholder="请输入详细地址",v-model="projectCommit.address")
   .weui-cells
     .weui-cell.weui-cell_access(@click="surveyUnit")
      .weui-cell__hd(style="width:68.76%")
       label(@click="surveyUnit") 勘测设计单位
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入勘测设计单位",v-model="projectData.surveyUnit")
      .weui-cell__ft
     .weui-cell
      .weui-cell__bd
        input.weui-input.text-ui(style="margin-left: 0.3%;",type="text",placeholder="请输入勘测设计地址",v-model="projectCommit.designUnitAddress")
   .weui-cells
     .weui-cell.weui-cell_access(@click="developmentPicker")
      .weui-cell__hd(style="width:68.76%")
       label(@click="developmentPicker") 建设单位
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入建设单位",v-model="projectData.clientUnit")
      .weui-cell__ft
     .weui-cell
      .weui-cell__hd
        label (建设)联系人
      .weui-cell__bd
        input.weui-input.text-ui(type="text",placeholder="请输入建设人姓名",v-model="projectData.clientContacts")
     .weui-cell
      .weui-cell__hd
        label (建设)联系人电话
      .weui-cell__bd
        input.weui-input.text-ui(type="number",placeholder="请输入建设人电话",v-model="projectData.clientPhone")
   .weui-cells
     .weui-cell.weui-cell_access(@click="roadWorkPicker")
      .weui-cell__hd(style="width:68.76%")
       label(@click="roadWorkPicker") 施工单位
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入施工单位",v-model="projectData.constructUnit")
      .weui-cell__ft
     .weui-cell
      .weui-cell__hd
       label (施工)联系人
      .weui-cell__bd
       input.weui-input.text-ui(type="text",placeholder="请输入施工联系姓名",v-model="projectData.constructContacts")
     .weui-cell
      .weui-cell__hd
       label (施工)联系人电话
      .weui-cell__bd
       input.weui-input.text-ui(type="number",placeholder="请输入施工联系电话",v-model="projectData.constructtPhone")
   .weui-cells    
     .weui-cell.weui-cell_access(@click="selectShock")
      .weui-cell__hd(style="width:68.76%")
       label(@click="selectShock") 减震配合单位
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入减震配合单位",v-model="projectData.shock")
      .weui-cell__ft
     .weui-cell.weui-cell_access(@click="projectSource")
      .weui-cell__hd(style="width:68.76%")
       label(@click="projectSource") 项目信息来源
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入项目信息来源",v-model="projectData.informationSource")
      .weui-cell__ft
   .weui-cells
     .weui-cell
      .weui-cell__hd
       label 建筑面积(平方米)
      .weui-cell__bd
       input.weui-input.text-ui(type="number",placeholder="请输入建筑面积",v-model="projectData.area")
     .weui-cell
      .weui-cell__hd
       label 建筑总高度(米)
      .weui-cell__bd
       input.weui-input.text-ui(type="number",placeholder="请输入建筑高度",v-model="projectData.height")
   .weui-cells(style="margin-bottom:70px;")
     .weui-cell.weui-cell_access(@click="constructionPicker")
      .weui-cell__hd(style="width:68.76%")
       label(@click="constructionPicker") 结构类型
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入项目信息来源",v-model="projectData.structureType")
      .weui-cell__ft
     .weui-cell.weui-cell_access(@click="estimatedStartDate")
      .weui-cell__hd(style="width:68.76%")
       label(@click="estimatedStartDate") 预计开工时间
       .weui-cell__bd
      input.weui-input.text-ui(style="margin-left:7.2%;",type="text",placeholder="请输入预计开工时间",v-model="projectData.date")
      .weui-cell__ft
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(v-model='projectData.generalSituation',placeholder="工程概况",rows="2")
       .weui-textarea-counter
        span 0/100
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(v-model='projectData.intention',placeholder="减隔震产品应用意向",rows="2")
       .weui-textarea-counter
        span 0/100
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(v-model='projectData.remarks',placeholder="报备意见",rows="2")
       .weui-textarea-counter
        span 0/100
      .weui-cells
 .weui-tabbar.tabbar-class
       .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz.weui-btn-commit(@click="projectCommits") 提交
 mt-popup(v-model="isPicker",position="bottom",ref='Popup',popup-transition="popup-fade",class="poput")
  mt-picker(class="mint-datetime-picker",ref="picker",:slots="slots",:show-toolbar="true",valueKey="text",@change="onValuesChange")
    span(class="mint-datetime-action mint-datetime-cancel",@click="closePopup") 取消
    span(class="mint-datetime-action mint-datetime-confirm",@click="pickerSave") 确定
 address-picker(@confirm="handle", v-model="isAreaPicker")
 units-picker(@confirm="unitHandle", v-model="isUnitPicker",:showAddressPicker="isUnitPicker")
 mt-datetime-picker(ref='datePicker',type='date', year-format="{value} 年",month-format="{value} 月"
  ,date-format="{value} 日",@confirm='dateConfirm',:startDate='startDate')
</template>

<script>
import { mapState } from 'vuex'
import { Popup,Picker,InfiniteScroll} from 'mint-ui'
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
import addressPicker from '../../components/addressPicker/addressPicker.vue'
import unitsPicker from '../../components/unitsPicker/unitsPicker.vue'
const manba  =require('manba')
const sd = require('silly-datetime');

export default {
  // middleware: 'wechat-auth',
  head(){
      return {
          title:'项目提交'
      }
  },
  data(){
      return {
          isPicker:false,//普通选择器
          isDatePicker:false,//时间选择器选择器
          isAreaPicker:false,//地区选择器
          isUnitPicker:false,//建设单位选择器
          slots:[],
          projectData:{
              projectName:'',//项目名称
              projectType:'',//项目类型
              classification:'',//商务项目
              address:'',//项目地址
              regionCode:'',//
              designUnit:'',//勘察设计单位
              designUnitID:'',//单位ID
              designUnitAddress:'',//单位地址
              date:null,//开工时间
              clientUnit:'',//建设单位
              clientUnitID:'',
              clientContacts:'',//建设联系人
              clientPhone:'',//建设人手机号
              constructUnit:'',//施工单位
              constructUnitID:'',
              constructContacts:'',//
              constructtPhone:'',//机构类型
              shock:'',
              shockId:'',//减震单位
              structureType:'',//结构类型
             informationSource:"",//项目来源
             childDesignUnitID: "",
             cooperateUnitID:"",
             DepartmentID:"",
             buildingHeight:"", 
             generalSituation:"",//工程概况
             intention:"",//建隔震产品应用意向
             remarks:'',//备注,
             area:"",//建筑面积
             height:""//建筑总高度
          },
          startDate:new Date(sd.format(new Date(), 'YYYY-MM-DD')),
          selected:{},
          pickerText:'标题',
          pickerType:"key",
          isClick:false
      }
  },
  computed:mapState([
    'projectCommit'
  ]),
  mounted(){
     let viewModel =this.projectCommit 
     console.log(viewModel)
     if(viewModel.projectName){
       console.log(viewModel.projectName)
        this.projectData.projectName =viewModel.projectName
     }
     
     if(viewModel.projectType){
        this.projectData.projectType =viewModel.projectType
     }

     if(viewModel.classification){
        this.projectData.classification =viewModel.classification
     }

     if(viewModel.designUnit){
        if(viewModel.designUnit.length>10){
            this.projectData.designUnit =viewModel.designUnit.substr(0,10)+"..."
        }else {
           this.projectData.designUnit =viewModel.designUnit
        }
     }

     if(viewModel.designUnitID){
       this.projectData.designUnitID =viewModel.designUnitID
     }

     if(viewModel.designUnitAddress){
       if(viewModel.designUnitAddress.length>10){
          this.projectData.designUnitAddress =viewModel.designUnitAddress.substr(0,10)+"..."
       }else {
          this.projectData.designUnitAddress =viewModel.designUnitAddress
       }
     }

     if(viewModel.address){
        this.projectData.address =viewModel.address
     }

     if(viewModel.regionCode){
       this.projectData.regionCode =viewModel.regionCode
     }
     
     if(viewModel.date){
        this.projectData.date =viewModel.date
     }

     if(viewModel.clientUnit){
        if(viewModel.clientUnit.length>10){
          this.projectData.clientUnit =viewModel.clientUnit.substr(0,10)+"..."
        }else {
           this.projectData.clientUnit =viewModel.clientUnit
        }
     }

     if(viewModel.clientUnitID){
        this.projectData.clientUnitID =viewModel.clientUnitID
     }

     if(viewModel.clientContacts){
       this.projectData.clientContacts =viewModel.clientContacts
     }
     if(viewModel.clientPhone){
        console.log(viewModel.clientPhone)
       this.projectData.clientPhone =viewModel.clientPhone
     }

     if(viewModel.constructUnit){
         if(viewModel.constructUnit.length>10){
           this.projectData.constructUnit =viewModel.constructUnit.substr(0,10)+"..."
         }else {
            this.projectData.constructUnit =viewModel.constructUnit
         }
     }

     if(viewModel.constructUnitID){
         this.projectData.constructUnitID =viewModel.constructUnitID
     }

     if(viewModel.constructContacts){
         this.projectData.constructContacts =viewModel.constructContacts
     }

     if(viewModel.constructtPhone){
       this.projectData.constructtPhone =viewModel.constructtPhone
     }

     if(viewModel.structureType){
       this.projectData.structureType =viewModel.structureType
     }

     if(viewModel.informationSource){
       this.projectData.informationSource =viewModel.informationSource
     }

     if(viewModel.generalSituation){
       this.projectData.generalSituation =viewModel.generalSituation
     }

     if(viewModel.intention){
       this.projectData.intention =viewModel.intention
     }
     
     if(viewModel.remarks){
       this.projectData.remarks =viewModel.remarks
     }

     if(viewModel.shock){
         if(viewModel.shock.length>10){
            this.projectData.shock =viewModel.shock.substr(0,10)+"..."
         }else {
            this.projectData.shock =viewModel.shock
         }
        
     }

     if(viewModel.shockId){
         this.projectData.shockId =viewModel.shockId
     }

  },
  methods:{

    pickerProjectType(){
      this.slots =[
        {
          flex:1,
          values:[{
            text:'学校',
            key:'projectType'
          },{
            text:'医院',
            key:'projectType'
          },{
            text:'公共建筑',
            key:'projectType'
          },{
            text:'商业',
            key:'projectType'
          },{
            text:'住宅',
            key:'projectType'
          },{
            text:'保密项目',
            key:'projectType'
          },{
            text:'工业建筑',
            key:'projectType'
          }],
          textAlign:'center'
        }
      ]
      this.isPicker =true
      this.pickerType ='projectType'
      this.pickerText ='项目类别'
    },
    pickerProjectKind(){
        this.slots =[
                {
                flex:1,
                values:[{
                  text:'设计项目',
                  key:'classification'
                  //'学校','医院','公共建筑','商业','住宅','保密项目','工业建筑'
                },{
                  text:'商务项目',
                  key:'classification'
                }],
                textAlign:'center'
              }
         ]
      this.pickerText ='classification'
      this.isPicker =true
    },
    //picker 取消
    closePopup(){
      this.isPicker =false
    },
    constructionPicker(){
        this.slots =[
            {
            flex:1,
            values:[{
              text:'钢结构',
              key:'structureType'
              //'学校','医院','公共建筑','商业','住宅','保密项目','工业建筑'
            },{
              text:'框架剪力墙',
              key:'structureType'
            },{
              text:'剪力墙',
              key:'structureType'
            },{
              text:'核心强',
              key:'structureType'
            }],
            textAlign:'center'
          }
      ]
      this.pickerType ='structureType'
      this.isPicker =true
    },
    //项目来源 picker
    projectSource(){
       this.slots =[
         {
           flex:1,
           values:[{
              text:'客户询价',
              key:'informationSource',
           },{
             text:'设计院推荐',
             key:'informationSource'
           },{
             text:'已有客户询价',
             key:'informationSource'
           },{
             text:'网络推广',
             key:'informationSource'
           },{
             text:'直接拜访',
             key:'informationSource'
           },{
             text:'朋友推荐',
             key:'informationSource'
           },{
             text:'代理商',
             key:'informationSource'
           }],
           textAlign:'center'
         }
       ]
      this.pickerType ='informationSource'
       this.isPicker =true
      
    },
    //地区
    areaPicker(val){
       // 从子组件接受返回所选值 val
      // this.projectData.regionCode = val
      // this.showAddressPicker = !this.showAddressPicker

      this.isAreaPicker =true
    },
  
    //勘察设计单位
    surveyUnit(){
      this.$store.dispatch('updateProject',this.projectData)
      this.$router.push({
         path:'/project/unitList',
         query:{
           str:'勘察设计单位'
         }
      })
    },
    //建设单位
    developmentPicker(){
      console.log('1213123');
      this.isUnitPicker =true
      //  this.$store.dispatch('updateProject',this.projectData)
      //  this.$router.push({
      //     path:'/project/unitList',
      //     query:{
      //        str:'建设单位'
      //     }
      //  })
    },
    //施工单位
    roadWorkPicker(){
       this.$store.dispatch('updateProject',this.projectData)
       this.$router.push({
          path:'/project/unitList',
          query:{
             str:'施工单位'
          }
       })
    },
    //减震单位
    selectShock(){
      this.$store.dispatch('updateProject',this.projectData)
      this.$router.push({
         path:'/project/unitList',
         query:{
            str:'减隔震厂商项目'
         }
      })
    },
    //时间Picker 
    estimatedStartDate(){
      this.$refs.datePicker.open()
    },
    dateConfirm(value){
      console.log(manba(value).format('l'))
      this.projectData.date =manba(value).format('l')
    },
    //bug
    onValuesChange(picker, values) {
       this.selected ={}
       if(values[0]){
          this.selected =values     
       }else {
         alert("没有值");
       }
       console.log(values[0].key=='')
       
    },
    pickerSave(){
      if(!this.selected[0]){
         console.log(this.pickerType)
         switch(this.pickerType) {
           case "projectType":
              this.projectData.projectType ='公共建筑'
              break
           case "informationSource":
              this.projectData.informationSource ='已有客户询价'
             break
           case 'structureType':
              this.projectData.structureType ='剪力墙'
              break
            case 'classification':
              this.projectData.classification ='设计项目'
              break
         }

          this.isPicker =false
         return 
      }
      console.log(this.selected[0])
      let key =this.selected[0].key
      let value =this.selected[0].text
      console.log(this.selected[0].text)
      switch(key){
        case 'projectType':
           this.projectData.projectType =value
           break
        case 'classification':
          this.projectData.classification =value
          break;
        case 'informationSource':
          this.projectData.informationSource =value
          break;
        case 'structureType':
          this.projectData.structureType =value
         break;

      }
      this.isPicker =false
    },
    handle(value){
     // this.projectData.Address =`${value.province.name}-${value.city.name}-${value.district.name}`
      //this.RegionCode=value.district.name
      console.log('2'+value.split('-')[1]+'2') 
      if(value.split('-')[1]==''){
         this.projectData.regionCode =''
      }
      else{
        this.projectData.regionCode = value
      }
      
      this.showAddressPicker = !this.showAddressPicker
      this.isAreaPicker =false
    },
    unitHandle(value){
      this.projectData.clientUnit=value
      this.isUnitPicker =false
    },
    projectCommits(){
       let result  =this.verifyData(this.projectData)
       if(!result){
         Toast({
            message: "请填写完整",
            position: "middle",
            duration: 1000
        });
      }else {
        if(this.isClick){
          Toast({
              message:'不要重复点击',
              position:'middle',
              duration:600
          })
         setTimeout(()=>{
              this.$router.push({
                 path:'/'
              })
           },800)
          return
         }
          this._commit()
      }
    },
    verifyData(projectData){
      if(!projectData.projectName){
         //this.$refs.projectname.
         return false
      }
      if(!projectData.projectType){
         return false
      }
      if(!projectData.classification){
        return false
      }
      return true
    },
    _getOptions(data){
      const res =axios.get(`/api/getOptions?OrgProperty=${data.OrgProperty}&CompanyType=${data.CompanyType}&page=${data.page}&rows=${data.rows}`)

      return res
    },
    autoMapper(){
      let  data ={
          form:{}, 
          changed:true,
          _isNew:true
        }
        data.form.Address =this.projectData.Address
        data.form.ApplyDate =""
        data.form.ApplyPerson =""
        data.form.ChildDesignUnitID =this.projectData.childDesignUnitID
        data.form.Classification = this.projectData.classification 
        data.form.ClientUnitID =this.projectData.clientUnitID
        data.form.ClientContacts =this.projectData.clientContacts
        data.form.ClientPhone =this.projectData.ClientPhone
        data.form.ConstructUnitID =this.projectData.ConstructUnitID
        data.form.ConstructContacts =this.projectData.constructContacts
        data.form.ConstructtPhone =this.projectData.ConstructtPhone
        data.form.CooperateUnitID =this.projectData.shockId
        data.form.CreateDate =""
        data.form.CreatePerson ="",
        data.form.DepartmentID =""
        data.form.DesignUnitID = this.projectData.designUnitID
        data.form.DesignUnitAddress =this.projectData.designUnitAddress
        data.form.HandleStatus =1
        data.form.StructureType =this.projectData.structureType
        data.form.EstimatedStartDate =this.projectData.date
        data.form.GeneralSituation = this.projectData.generalSituation
        data.form.InformationSource =this.projectData.informationSource
        data.form.Intention =this.projectData.intention
        data.form.Remarks =this.projectData.remarks
        data.form.ID =""
        data.form.ProjectName =this.projectData.projectName
        data.form.ProjectType =this.projectData.projectType
        data.form.RegionCode =this.projectData.regionCode,
        data.form.Area =this.projectData.area,
        data.form.height =this.projectData.height
        return data
    },
    _commit(){
      console.log('commit提交')
      let mapper =this.autoMapper()
      console.log(mapper)
      this.isClick= true
      const res =  axios.post('/api/commitProject',mapper)
      res.then((data)=>{
           this.$store.dispatch('clearProject',this.Id)
              Toast({
                message:'已提交项目',
                position:'middle',
                duration:600
             })
            console.log('代码走到这里了')
            setTimeout(()=>{
              this.$router.push({
                 path:'/'
               })
            },800)
      },()=>{
         Toast({
            message:"服务器出错误",
            position:"middle",
            duration:1000
         })

      })
    }
  },
  components:{
    "mt-popup":Popup,
    "mt-picker":Picker,
    'address-picker':addressPicker,
    "mt-datetime-picker":DatetimePicker,
    "units-picker":unitsPicker
  },
  deactivated() {
      clearTimeout(this.timer)
  },
  beforeDestroy() {
      clearTimeout(this.timer);
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
    }.mint-datetime .picker-slot-wrapper, .mint-datetime .picker-item {
         -webkit-backface-visibility: hidden;
         backface-visibility: hidden;
     }
    .mint-datetime .picker-toolbar {
        border-bottom: solid 1px #eaeaea;
    }
    .mint-datetime-action {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
    }
    .mint-datetime-cancel {
        float: left;
    }
    .mint-datetime-confirm {
        float: right;
    }
    .picker-item{
        font-size: .32rem;
    }
    .poput{
      height: 43%;
      width:100%;
    }
    .weui-btn-commit{
       width:80%;
    }
    .weui-cell__hd{
      width:38%;
      
    }
  
    /* .weui-cell__bd>label{
       width:39.49%;
    } */
    .containers{
      display:flex;
      justify-content:space-between;
      flex-direction:column;
    }
    .page__bd{
      flex: 1;
      flex-direction:column 
    }
  .tabbar-class{
    position:fixed;
    bottom:0px;
    overflow: hidden;
    }
    .text-ui{
      margin-left:9%;
    }
</style>





