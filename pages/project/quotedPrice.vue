<template lang="pug">
#container.container(style="height:100%",ref="container")
 .page__bd
   .weui-cells__title
     span(style="padding-right:180px")  项目报价申请
     mt-button(size='small',type='primary',@click='addItem') 添加产品
   .weui-cells(v-if="load")
     .weui-cell
      .weui-cell__hd
        label(ref="projectname") 项目名称: 
      .weui-cell__bd(style="padding-left:10px")
        p {{ data.rows[0].text}}
     .weui-cell
      .weui-cell__hd
        label 项目编号: 
      .weui-cell__bd(style="padding-left:10px")
        span {{data.rows[0].ProjectNum}}
     .weui-cell
      .weui-cell__bd
       p 项目类型
      .weui-cell__ft {{data.rows[0].ProjectType?'暂无':data.rows[0].ProjectType}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 工程地点
      .weui-cell__ft 
     .weui-cell.weui-cell
      .weui-cell__bd
       p 商务负责人
      .weui-cell__ft {{data.rows[0].TechnicalManager}}
     .weui-cell.weui-cell
      .weui-cell__bd
       p 技术负责人
      .weui-cell__ft {{data.rows[0].BusinessManager}}
     .weui-cell.weui-cell_access(@click='selectUnit')
      .weui-cell__bd
       p 报价单位
      .weui-cell__ft {{shock}}
     .weui-cell
      .weui-cell__bd
       textarea.weui-textarea(placeholder="备注",rows="2",v-model="projectData.remarks")
       .weui-textarea-counter
        span 0/100
 .weui-tabbar.tabbar-class
       .weui-btn.weui-btn_primary.weui-tanbar-btn.weui-btn-tz(@click="commit") 提交
</template>


<script>
import { Toast } from 'mint-ui'
import { Button } from 'mint-ui'
import axios from 'axios'
import { mapState } from 'vuex';

const uuid =require('uuid')
export default {
    middleware: 'wechat-auth',
    head(){
        return {
            title:'项目报价申请'
        }
    },
    data(){
        return {
            isPicker:false,
            slots:[],
            Id:0,
            data:{},
            projectData:{
                remarks:''
            },
            products:[],
            shock:'',
            shockId:'',
            selected:{},
            load:false
        }
    },
    created(){
        const { Id } = this.$route.query
        this.Id =Id
    },
    beforeMount(){
        let viewmodel =this.quoted
        console.log(viewmodel[this.Id])
        if(viewmodel[this.Id]){
             this.data =viewmodel[this.Id].data
             this.projectData =viewmodel[this.Id].projectData
          
             if(viewmodel[this.Id].shock.length>10){
                this.shock =viewmodel[this.Id].shock.substr(0,10)+"..."
             }else {
                  this.shock =viewmodel[this.Id].shock
             }
             this.shockId =viewmodel[this.Id].shockId
             this.products =viewmodel[this.Id].products
            this.load =true
        }else {
           this.getData(this.Id)
        }
    },
    computed:mapState([
        'quoted'
    ]),
    methods:{
        // quoted(){
        //     this.$router({
        //          path:'/project/quotedList',
        //          query:{
        //              Id:this.id
        //          }
        //     })
        // },
        selectUnit(){
            let item ={}
            item.data =this.data
            item.projectData =this.projectData
            item.Id =this.Id
            item.shock =this.shock
            item.products =this.products
            item.shockId =this.shockId
            this.$store.dispatch('updateQuotoed',item)
            this.$router.push({
                path:'/project/unitList',
                query:{
                    Id:this.Id,
                    str:'减隔震厂商报价'
                }
            })
        },
        addItem(){
            this.$router.push({
                path:'/project/quotedList',
                query:{
                  Id:this.Id
                }
            })
        },
        normalizeProduct(list){
            let map =[]
            list.forEach((item,index)=>{
                map.push({
                    No:uuid.v4(),
                    ConnectionForm:item.productsForm,
                    Amount:item.productNums,
                    ProductName:item.productName
                })
            })
            return map
        },
        commit(){
            let map =this.normalizeProduct(this.products)
            let data ={
                 form:{
                        ApplyDate:"",
                        ApplyPerson:"",
                        BusinessManager:this.data.rows[0].BusinessManager,
                        HandleStatus:1,
                        ID:"",
                        Products:map,
                        ProjectID:this.Id,
                        ProjectNum:this.data.rows[0].ProjectNum,
                        ProjectType:this.data.rows[0].ProjectType,
                        QuotedPriceUnitID:this.shockId,
                        RegionCode:this.data.rows[0].RegionCode,
                        Remarks:this.projectData.remarks,
                        TechnicalManager:this.data.rows[0].TechnicalManager
                 },
                _changed:true,
                _isNew:true
            }
            let flag = this.verifyData(this.projectData)
            if(!flag){
                Toast({
                    message: "请填写完整",
                    position: "middle",
                    duration: 1000
                })
            }else {
                const res =axios.post(`/api/CommitQuoted`,data)
                res.then((data)=>{
                    console.log(data)
                    if(data.statusText==='OK'){
                         Toast({
                            message: "提交成功",
                            position: "middle",
                            duration: 800
                         })
                       this.$store.dispatch('clearQuoted',this.Id)
                         setTimeout(()=>{
                             this.$router.go(-1)
                         },800)
                    }else {
                        //失败这个地方做的还是不怎么好,只是很粗糙的跑通了整个逻辑
                    }
                })
            }
        },
        verifyData(){
             if(!this.shock){
                 return false
             }
             return true
        },
        getData(Id) {
            const res =axios.get(`/api/QuotedPrice?Id=${Id}`)
            res.then((data)=>{
                this.data =data.data.data
                console.log(data)
                this.load =true
            })
        }
    },
    components:{
      "mt-button":Button
    },
    beforeDestroy(){
        clearInterval(this.timer)
    },
    deactivated(){
        clearInterval(this.timer)
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
</style>



