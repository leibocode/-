<template lang="pug">
#apply-container
  .page.tabbar.js_show
    .page__bd
      .weui-tab
        .weui-tab__panel
           mt-cell(title="待处理项目")
             span.weui-badge(v-text='total')
           ul.list(id="ul-box",class="ul-box starth" v-show="oneLoad")
            li.weui-cells(v-for="(item,index) in apply",:key="'list'+index")
             .weui-cell(@click="showProjectAudit(item)")
              .weui-cell__hd
                p.weui-cell-icon
                   i.fa.fa-star.icon-important-color.fa-3x
              .weui-cell__bd
                p {{item.ProjectName}}
                p.desc-text 项目地址:{{item.Address?item.Address:'暂无地址'}}
                p.desc-text 项目类型: {{item.Classification}}
                p.desc-text 提交人:{{item.CreatePerson}}
                p.desc-text 提交时间:{{item.ApplyDate}}
              .weui-cell__ft
                p.fa.fa-angle-right.fa-2x
            li
             span.weui-cell-ptetx 已经加载全部数据
    div(class='loading-container',v-show="loading")
     Loading
</template>

<script>
import { loadmore,Indicator,Cell } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
import Loading from '../../components/loading/loading'
const manba = require('manba')
export default {
    head(){
        return {
            title:'待处理'
        }
    },
    data(){
       return {
            apply:[],
            allLoaded:false,//若为真，则bottomMethod不会触发
            pageIndex:1,
            griddata:[],//每次加载出来的新数据,
            oneLoad:false,//第一次加载,
            loading:true,
            total:0
       }
    },
    created(){
        let { Id } = this.$route.query
        if(!Id){
            //跳转到错误页
        }
    },
    mounted() {
        this.loadData()
    },
    methods:{
        loadData(){
            axios.get('/api/apply').then((data)=>{
                let result = JSON.parse(data.data.data)
               
                result.rows.forEach(item => {
                     item.ApplyDate = manba(item.ApplyDate).format()
                });
                this.apply =result.rows
                this.oneLoad =true
                this.total = result.total
                //this.loading =false
                console.log(this.apply)
                console.log(this.total)
            })
        },
        loadTop(){

        },
        loadButtom(){

        },
        update(){

        },
        showProjectAudit(item){//审核页面
            this.$router.push({
            path:'/detail',
            query:{
                ID:item.ID
            }
        })
    },
    },
    components:{
        "mt-cell":Cell
    }
}
</script>

<style scoped>
.icon-important-color {
  color:#e0db13
}
.weui-cell-ptetx{
   margin-left:35%;
   font-size:16px;
   color:#666;
}
.weui-cell-icon {
    width: 78px;
    height: 63px;
    margin-right: 5px;
    display: block;
}
#apply-container {
    display:flex;
}
</style>


