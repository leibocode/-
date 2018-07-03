<template lang="pug">
#container.container(style="height:100%",ref="container")
 .page__bd
   .weui-cells__title 项目商务阶段更新
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
     .weui-cell.weui-cell_access(@click="businessPhase")
      .weui-cell__bd
       p 当前商务阶段
      .weui-cell__ft {{projectData.section}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 商务负责人
      .weui-cell__ft {{data.rows[0].BusinessManager}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 技术负责人
      .weui-cell__ft {{this.data.rows[0].TechnicalManager}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="备注",rows="2",v-model="projectData.remarks")
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
import { Toast, Popup, Picker } from "mint-ui"
import axios from "axios"
import Contact from "../../static/js/contact"
export default {
 middleware: 'wechat-auth',
  head() {
    return {
      title: "商务阶段更新"
    };
  },
  data() {
    return {
      isPicker: false,
      slots: [],
      projectData: {
        section:'',
        remarks:''
      },
      data: {},
      selected: {},
      pickerText: "标题",
      Id:0,
      load:false,
      pickerType:'key',
      isClick:false
    };
  },
  created() {
    const { Id } = this.$route.query;
    if (!Id) {
      this.$router.push({
        path: "/"
      });
      return false;
    }
    this.Id =Id
    //调用后端接口
    this.getData(Id)
  },
  methods: {
    businessPhase() {
      this.slots = [
        {
          flex: 1,
          values: [
            {
              text: "初步设计阶段",
              key: "section"
            },
            {
              text: "减震专审阶段",
              key: "section"
            },
            {
              text: "施工图设计阶段",
              key: "section"
            },
            {
              text: "总包入场",
              key: "section"
            },
            {
              text: "初步洽谈",
              key: "section"
            },
            {
              text: "深入洽谈",
              key: "section"
            },
            {
              text: "项目招标阶段",
              key: "section"
            },
            {
              text: "项目实施阶段",
              key: "section"
            },
            {
              text: "项目暂停",
              key: "section"
            },
            {
              text: "项目结束",
              key: "section"
            }
          ]
        }
      ];
      this.pickerType ='section'
      this.isPicker = true
    },
    closePopup() {
      this.isPicker = false;
    },
    pickerSave() {
      if(!this.selected[0]){
        switch(this.pickerType){
          case "section":
           this.projectData.section ="施工图设计阶段"
        }
        this.isPicker =false
        return
      }
      console.log(this.selected)
      let key =this.selected[0].key
      let value =this.selected[0].text
      switch(key){
        case 'section':
          this.projectData.section =value
         break;
      }
      this.isPicker = false;
    },
    onValuesChange(picker, values) {
      this.selected = {};
      this.selected = values;
    },
    getData(Id) {
      const res = axios.get(`/api/ProjectBusiness?Id=${Id}`)
      res.then((data)=>{
         this.data = JSON.parse(data.data.data)
         this.load =true
         console.log(this.data)
      })
    },
    commit() {
      let data = {
        form:{
          ApplyDate:"",
          ApplyPerson:this.data.rows[0].BusinessManager,
          BusinessManager:"刘涛,刘晓东",
          TechnicalManager:this.data.rows[0].TechnicalManager,
          HandleStatus:0,
          ID:"",//guid
          PhaseName:this.projectData.section,
          Products:[],
          ProjectID:this.Id,
          ProjectNum:this.data.rows[0].ProjectNum,
          Remarks:this.projectData.remarks,
          StartTime:"",
        },
        _changed:true,
        _isNew:true
      };
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
            message: "不要重复点击",
            position: "middle",
            duration: 600
        })
         setTimeout(()=>{
                this.$router.go(-1)
          },1000)
          return 
      }
         //提交给后端
         const res =axios.post(`/api/BusinessCommit`,data)
         res.then((data)=>{
           this.isClick =true
           console.log(data.statusText=='OK')
           console.log(data.statusText)
            if(data.statusText=='OK'){
              Toast({
                    message: "提交成功",
                    position: "middle",
                    duration: 1000
                });
                //回到上一级
                setTimeout(()=>{
                   window.history.go(-1)
                },1000)
            }
         })
      }
     
    },
    verifyData(projectData){
      if(!projectData.section){
         return false
      }
      return true
    }
  },
  deactivated() {
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  components: {
    "mt-popup":Popup,
    "mt-picker":Picker
  }
};
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


