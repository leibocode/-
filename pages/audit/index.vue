<template lang="pug">
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          // 项目列表页
          .list(v-if="projectData.success")
            .weui-cells(@click="detail")
              .weui-cell
                .weui-cell__bd
                  p
                    | 项目名称 : 
                    span.weui-cell-desc__text {{projectData.data.rows[0].ProjectName}}
                  p
                    | 项目编号 : 
                    span.weui-cell-desc__text {{projectData.data.rows[0].ProjectNum}}
                  p
                    | 项目类别 : 
                    span.weui-cell-desc__text {{ projectData.data.rows[0].Classification}}
                  p 
                    | 项目类型:
                    span.weui-cell-desc__text {{projectData.data.rows[0].ProjectType}}
                  p 
                    | 商务负责人:
                    span.weui-cell-desc__text {{projectData.data.rows[0].BusinessManager?projectData.data.rows[0].BusinessManager:'暂无商务负责人'}}
                  p 
                    | 技术负责人:
                    span.weui-cell-desc__text {{projectData.data.rows[0].TechnicalManager?projectData.data.rows[0].TechnicalManager:'暂无技术负责人'}}
                  p
                    | 项目地址 : 
                    span.weui-cell-desc__text {{projectData.data.rows[0].Address?projectData.data.rows[0].Address:'暂无地址' }}
                  p 
                    | 勘测设计单位:
                    span.weui-cell-desc__text {{projectData.data.rows[0].DesignUnit?projectData.data.rows[0].DesignUnit:'暂无单位'}}
                  p
                    | 项目申请时间 : 
                    span.weui-cell-desc__text {{projectData.data.rows[0].ApplyDate}}
                  p(v-if='projectData.BusinessData.total>0')
                    | 当前项目阶段 : 
                    span.weui-cell-desc__sign {{ projectData.BusinessData.rows[0].PhaseName }}
                  p(v-else="")
                    | 当前项目阶段:
                    span.weui-cell-desc__sign 暂无
                  p
                    | 当前项目状态 : 
                    span.weui-cell-desc__sign {{auditMessage}}
                  // p(v-if='projectData.data.rows[0].HandleStatus===code')
                  //   | 项目审核结果 : 
                  //   span.weui-cell-desc__sign {{stateMessage}}
        // tabbar
        .weui-tabbar.weui-tabbar--bg
          a.weui-tabbar__item(href='#',@click="ProjectAudit(id)",v-show="projectState")
            span(style='display: inline-block;position: relative;')
              p.weui-tabbar__label.weui-tabbar-cell-text 提交
          a.weui-tabbar__item(href='#',@click="ProjectAudit(id)",v-show="!projectState")
            span(style='display: inline-block;position: relative;')
              p.weui-tabbar__label.weui-tabbar-cell-text 
                i.fa.fa-user.fa-3x
              p.weui-tabbar__label.weui-tabbar-cell-text 审核
          a.weui-tabbar__item(href='#',@click="ProjectRevocation(id)",v-show="!projectState")
            span(style='display: inline-block;position: relative;')
              p.weui-tabbar__label.weui-tabbar-cell-text 
                i.fa.fa-ban.fa-3x
              p.weui-tabbar__label.weui-tabbar-cell-text 撤销审核
          a.weui-tabbar__item(href='#',@click="ProjectAllocation(id)")
            span(style='display: inline-block;position: relative;')
              p.weui-tabbar__label.weui-tabbar-cell-text 
                i.fa.fa-handshake-o.fa-3x
              p.weui-tabbar__label.weui-tabbar-cell-text 商务人员分配
          a.weui-tabbar__item(href='#',@click="ProjectArtisan(id)")
            span(style='display: inline-block;position: relative;')
              p.weui-tabbar__label.weui-tabbar-cell-text 
                i.fa.fa-american-sign-language-interpreting.fa-3x
              p.weui-tabbar__label.weui-tabbar-cell-text 技术人员分配
    div(class='loading-container',v-show="loading")
     Loading
</template>

<script>
import { mapState } from "vuex";
import { MessageBox,Toast } from 'mint-ui'
import config from '../../static/js/config'
import jurisdiction from '../../static/js/jurisdiction'
import Loading from '../../components/loading/loading'
import axios from 'axios'

export default {
  //middleware: 'wechat-auth',
  head() {
    return {
      title:"审核页面"
    };
  },
  data() {
    return {
      id: 0,
      projectData:{},
      requestData:{
        NextSetp:false,
        PreStep:false,
        Remark:"",
        State:'passed',
        HandleStatus:0
      },
      auditMessage:'',
      stateMessage:'',
      code:2,
      projectState:0,
      loading:true,
      isClick:false
    }
  },
  methods: {
    ProjectAudit(id) {
      MessageBox.prompt('提交项目审核?').then(({value,action}) => {
             this.requestData.HandleStatus =1
             this.requestData.NextSetp =true
              const res =axios.get(`/api/SubmitAudit?HandleStatus=${this.requestData.HandleStatus}&NextSetp=${this.requestData.NextSetp}&PreStep=${this.requestData.PreStep}&id=${this.id}&Remark=${value}&State=${this.requestData.State}`)
            res.then((data)=>{
                  if(data.status==200) {
                      this.auditMessage ='已审核'
                      Toast({
                        message: "审核成功",
                        position: "middle",
                        duration: 800
                      })
                 }
            })
        })
    },
   
    ProjectRevocation(id) {
      if(this.projectData.data.rows[0].HandleStatus===config.checked){
        MessageBox.confirm('撤销项目审核?').then(action => {
              this.requestData.HandleStatus =2
              this.requestData.NextSetp =false
              this.requestData.PreStep =true
              const res =axios.get(`/api/RemoveAction?HandleStatus=${this.requestData.HandleStatus}&NextSetp
              =${this.requestData.NextSetp}&PreStep=${this.requestData.PreStep}&id=${this.id}`)
              res.then((data)=>{

                 if(data.status==200) {
                    this.auditMessage ='已提交'
                    Toast({
                      message: "撤销成功",
                      position: "middle",
                      duration: 800
                    })
                 }
              })
         })
      }else {
        Toast({
           message:'当前项目未审核',
           position: "middle",
           duration: 800
        })
      }
    },
    ProjectAllocation(id){//商务 1
       this.$router.push({
          path:'/contact',
          query:{
            id:id,
            code:1
          }
       })
    },
    ProjectArtisan(id){//技术 2
      this.$router.push({
         path:'/contact',
         query:{
           id:id,
           code:2
         }
      })
    },
    detail(){
       this.$router.push({
          path:'/detail',
          query:{
            ID:this.id
          }
       })
    },
    getData(){
       const res =axios.get(`/api/AuditProject/${this.id}`)
       res.then((res)=>{
         this.loading =false
          this.projectData =res.data
           console.log(res.data)
          if(this.projectData.data.rows[0].HandleStatus===config.ToSubmit){//0
             this.auditMessage ='待审核'
              this.projectState =true
          }else if(this.projectData.data.rows[0].HandleStatus===config.Submitted){//1
            this.auditMessage ='已提交'
          }else if(this.projectData.data.rows[0].HandleStatus===config.checked){//2
             this.auditMessage ='已审核'
          }
          console.log(this.projectData.data.rows[0].ApproveState)
          if(this.projectData.data.rows[0].ApproveState===config.pass){
            this.stateMessage ='审核成功'
          }else {
            this.stateMessage ='审核失败'
          }
          
       },(err)=>{
          //服务器挂掉了
       })
    }

  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    let Id = this.$route.query.Id
    if(!Id){
        Toast({
            message: "参数缺失",
            position: "middle",
            duration: 800
        })
        this.$router.push({
           path:'/'
        })
    }
    this.id = Id;
    
    setTimeout(()=>{
      this.getData()
    },20)
  },
  components:{
    Loading
  },
  deactivated(){
    clearTimeout(this.timer)
  },
  beforeDestroy(){
    clearTimeout(this.timer)
  }
};
</script>

<style scoped>
.desc-text {
  color: #666;
  font-size: 14px;
  line-height: 25px;
}
.search-bg {
  background: #39a0ff;
  border-bottom: 0px;
}
.weui-cell-desc__text {
  color: #666;
  font-weight: 400;
}
.weui-cell-desc__sign {
  color: #39a0ff;
  font-weight: 400;
}
.weui-cell-desc__emphasis {
  background: #39a0ff;
  color: #fff;
  padding: 3px;
  border-radius: 4px;
}
.weui-cell-icon {
  background: url("/icon/down.png");
  width: 18px;
  height: 14px;
  display: inline-block;
  background-size: cover;
}
.weui-tabbar--bg {
  background-color: #39a0ff;
}
.weui-tabbar-cell-text {
  color: #fff;
}
.weui-dialog-title-height {
  height: 9px;
  background-color: #1e69c6;
  border-radius: 3px;
}
.weui-border {
  border-radius: 3px;
  border: 1px solid #8a8a8a;
}
.weui-dialog-p-text {
  color: #666;
  font-weight: 400;
  text-align: left;
}
.weui-dialog-head-p {
  text-align: left;
  margin-top: -14px;
}
.loading-container{
     position: absolute;
     width: 100%;
     top: 50%;
     transform: translateY(-50%)
}
</style>

