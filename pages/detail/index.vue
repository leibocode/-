<template lang='pug'>
#container.container
  .page.tabbar.js_show
    .page__bd(style='height:100%;')
      .weui-tab
        .weui-tab__panel
          .list(v-show="load")
            .weui-cells
              .weui-cell
                .weui-cell__bd
                  p.desc-text
                    | 项目名称:
                    span.weui-cell-desc__text {{project.ProjectName}}
                  p.desc-text
                    | 项目类型:
                    span.weui-cell-desc__text {{project.ProjectType}}
                  p.desc-text
                    | 项目类别 : 
                    span.weui-cell-desc__text {{ project.Classification}}
                  p.desc-text
                    | 商务负责人:
                    span.weui-cell-desc__text {{project.BusinessManager}}
                  p.desc-text
                    | 技术负责人:
                    span.weui-cell-desc__text {{project.TechnicalManager}}
                  p.desc-text
                    | 项目地址 : 
                    span.weui-cell-desc__text {{project.Address?project.Address:'暂无地址' }}
                  p.desc-text
                    | 勘测设计单位:
                    span.weui-cell-desc__text {{project.DesignUnit?project.DesignUnit:'暂无单位'}}
                  p.desc-text 
                     | 项目状态:
                     span.weui-cell-desc__text {{project.FormatHandleStatus}}
                  p.desc-text
                    | 项目申请时间:
                    span.weui-cell-desc__text {{project.ApplyDate}}
                  p.desc-text
                    | 减隔震产品应用意向:
                    span.weui-cell-desc__text {{project.Intention?project.Intention:'暂无意见'}}
                  p.desc-text
                    | 建筑高度(米):
                    span.weui-cell-desc__text {{project.Area?project.Area : "暂无"}}
                  p.desc-text
                    | 建筑总高度(米):
                    span.weui-cell-desc__text {{project.Height?project.Height:"暂无"}}
              .weui-cell.weui-cell_access(@click="BusinessPhase")
                .weui-cell__bd
                    p 项目商务阶段更新
                .weui-cell__ft 
              .weui-cell.weui-cell_access(@click="BusinessPhaseGroup")
                .weui-cell__bd
                    p 项目商务阶段进度跟踪反馈
                .weui-cell__ft 
              .weui-cell.weui-cell_access(@click="QuotedPrice")
                .weui-cell__bd
                    p 项目报价申请
                .weui-cell__ft 
              .weui-cell.weui-cell_access(@click="Biding")
                .weui-cell__bd
                    p 项目投标申请
                .weui-cell__ft 
              .weui-cell.weui-cell_access(@click="Contract")
                .weui-cell__bd
                    p 项目合同管理
                .weui-cell__ft 
              .weui-cell.weui-cell_access(@click="Receive")
                .weui-cell__bd
                    p 项目收款登记
                .weui-cell__ft 
        // tabbar
        .weui-tabbar
          div.weui-btn.weui-btn_primary.weui-tanbar-btn(@click="hanleList") 操作
    div(class='loading-container',v-show="loading")
     Loading
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { Toast } from 'mint-ui'
import Loading from '../../components/loading/loading'
export default {
  middleware: 'wechat-auth',
  head(){
     return {
         title:'项目详情'
     }
  },
  data(){
    return {
      project:{},
      load:false,
      Design:'设计项目',
      Business:'商务项目',
      Classification:'',
      Id:0,
      loading:true
    }
  },
  created(){
    console.log( this.$route.query)
     let {ID,Classification }=this.$route.query
     if(!ID){
        Toast({
            message: "缺少参数",
            position: "middle",
            duration: 1000
        })
        setTimeout(()=>{
            this.$router.push({
              path:'/list'
            })
        },1000)
     }
     this.Classification =Classification
     this.Id =ID
     this._getDetail(ID)
  },
  methods:{
     hanleList(){
       this.$router.push({
         path:'/handle',
         query:{
           Id:this.Id
         }
       })
     },
     BusinessPhaseGroup(){
       this.$router.push({
          path:'/detail/sectionDetail',
          query:{
            type:'BusinessPhaseGroup',
            Id:this.Id
          }
       })
     },
     BusinessPhase(){
        this.$router.push({
          path:'/detail/sectionDetail',
          query:{
            type:'BusinessPhase',
            Id:this.Id
          }
        })
     },
     QuotedPrice(){
       this.$router.push({
          path:'/detail/sectionDetail',
          query:{
            type:'QuotedPrice',
            Id:this.Id
          }
       })
     },
     Biding(){
       this.$router.push({
         path:'/detail/sectionDetail',
         query:{
           type:'Biding',
           Id:this.Id
         }
       })
     },
    Receive(){
       this.$router.push({
         path:'/detail/sectionDetail',
         query:{
           type:'Receive',
           Id:this.Id
         }
       })
     },
    Contract(){
      this.$router.push({
         path:'/detail/sectionDetail',
         query:{
           type:'Contract',
           Id:this.Id
         }
      })
    },
    _getDetail(Id,Classification){
        const res =axios.get(`/api/ProjectDateil?Id=${Id}&Classification=${Classification}`)
        res.then((data)=>{
            this.loading =false
            if(data.data.success&&data.data.data.total>0){
              this.project =data.data.data.rows[0]
              this.load =true
            }
        })
    }
  },
  computed:{

  },
  components:{
    Loading
  }

}
</script>

<style scoped>
.desc-text {
    color: #666;
    font-size: 14px;
    line-height:25px;
}
.search-bg{
    background:#39a0ff;
    border-bottom:0px;
}

.weui-cell-desc__text{
    color:#666;
    font-weight:bold;
}
.weui-cell-desc__sign{
    color:#39a0ff;
    font-weight:bold;
}
.weui-cell-desc__emphasis{
    background:#39a0ff;
    color:#fff;
    padding:3px;
    border-radius: 4px;
}
.weui-tanbar-btn{
    width:100%;
    margin-left:5%;
    margin-right:5%;
    margin-bottom:7px;
    background:#39a0ff;
    line-height: 2;
}
/*扩展weui*/
.weui-cell-icon{
    background:url('/icon/down.png');
    width:18px;
    height:14px;
    display:inline-block;
    background-size:cover;
}

.loading-container{
     position: absolute;
     width: 100%;
     top: 50%;
     transform: translateY(-50%)
}
</style>


