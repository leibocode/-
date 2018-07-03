/**
 * 说明:废弃文件
 * 
 */
import api from '../api'
import  { controller,get,post,del  } from '../decorator/router'
import { requestCode } from '../api/config'

const sd = require('silly-datetime');

const uuid =require('uuid')

const manba =require('manba')

const transliteration = require('transliteration');

/**
 * project控制器
 * @export
 * @class ProjectController
 */
@controller('/api')
export class ProjectController {
    /**
     * 查询重点项目
     * @param {any} ctx Koa上下文 
     * @param {any} next 交换中间件的控制权
     * @returns  返回List列表和消息
     * @memberof ProjectController 
     */
    @get('/EmphasisProject')
    async EmphasisProject(ctx,next){
       // const user =ctx.session.user
       let user ='super'
    //    if(ctx.session.user){
    //        console.log(ctx.session.user);
    //    }
       let { page } =ctx.query
       let query ={
           page:page,
           rows:10,
           HasMark:true
       }
      //  console.log(user)
        const data =await api.project.EmphasisProject(user,query)

        data.rows.forEach((item,index)=>{
             if(item.ProjectName&&item.ProjectName.length>10){
                item.ProjectName = item.ProjectName.substr(0,10) +'...'
             }
        })

        return (ctx.body ={
            data:data,
            success:true
        })
    }

    /**
     * 查询项目列表
     * @param {any} ctx Koa上下文
     * @param {any} next  交换中间件的控制权
     * @returns 返回各种类型的项目列表
     * @memberof ProjectController
     */
    @get('/ProjectList/')
    async ProjectList(ctx,next){
        const {  typeCode,page  } =ctx.query
        let query={
            typeCode:typeCode,
            page:page,
            rows:10
        }
        if(typeCode==='1'){
            query['Classification'] ='设计项目'
        }else if(typeCode==='2'){
            query['Classification'] ='商务项目'
        }else if(typeCode==='3'){
           query['HasMark'] =true
        }
        let user ='super'
        const data =await api.project.ProjectList(user,query)
        if(data.rows.length>0){
            data.rows.forEach((item,index)=>{
                if(item.ProjectName&&item.ProjectName.length>10){
                    item.ProjectName = item.ProjectName.substr(0,10) +'...'
                 }
            })
        }
        return (ctx.body={
            data:data,
            success:true
        })
    }

    /**
     * 查询项目详情
     * @param {any} ctx Koa上下文
     * @param {any} next 交换中间件的控制权
     * @memberof ProjectController
     */
    @get('/ProjectDateil')
    async PorjectDetail(ctx,next) {
        const { Id,Classification } =ctx.query
        const user ='super'
        const query ={
            Id:Id,
            Classification:Classification
        }
        if(Id){
            const data = await api.project.ProjectAuditById(user,query)
            data.rows[0].ApplyDate  =manba(data.rows[0].ApplyDate).format()
            ctx.body ={
                success:true,
                data:data
            }
        }else {
            ctx.body ={
                success:false,
                msg:'Id不存在'
            }
        }
    }

    /**
     * 审核项目
     * @param {any} ctx Koa的上下文
     * @param {any} next 交换中间件的控制权
     * @returns 返回项目
     * @memberof ProjectController
     */
    @get('AuditProject/:_id')
    async AuditProject(ctx,next){
        const { _id } =ctx.params
        let query ={
            Id:_id
        }
        let user = `super`
        const data =await api.project.ProjectAuditById(user,query)
       // data.rows[0].CreateDate =manba(data.rows[0].CreateDate).format()
        data.rows[0].ApplyDate  =manba(data.rows[0].ApplyDate).format()
        const BusinessData =await api.project.ProjectStage(user,_id)
        return (ctx.body={
            data:data,
            BusinessData:BusinessData,
            success:true
        })
    }

    /**
     * 获取指派人列表
     * @param {any} ctx 
     * @param {any} next 
     * @returns 
     * @memberof ProjectController
     */
    @get('/GetContact')
    async getContact(ctx,next){
        const user ='super'
        const { id } =ctx.query
        try {
            const data =await api.project.getContact(user,id)
            data.forEach(item => {
                item.value =transliteration.slugify(item.UserCode).slice(0,1)
             });
            return (ctx.body={
                data:data,
                success:true
            })
        }catch(e){
            return (ctx.body={
                err:'网络请求出问题啦!',
                success:false
            })
        }
    }

    /**
     * 撤销项目
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('/RemoveAction')
    async RemoveAction(ctx,next){
        console.log(ctx.query)
        const {  HandleStatus,NextSetp,PreStep,id  } =ctx.query
        let requestData ={
            HandleStatus:2,
            ID:id,
            NextSetp:false,
            PreSetp:true
        }
        const user ='黄河'
        try {
            const data =api.project.RemoveAction(user,requestData)
            console.log(data)
            ctx.body ={
                success:true,
                data:data
            }
        }catch(e){
            ctx.body ={
                success:false,
                msg:'请联系开发者',
                err:e
            }
        }
    }

    /**
     * 审核项目
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('/api/SubmitAudit')
    async SubmitAudi(ctx,next){
        const {  HandleStatus,NextSetp,PreStep,id,Remark } =ctx.query
         let requestData = {
            HandleStatus:1,
            ID:id,
            NextSetp:true,
            PreSetp:false,
            Remark:Remark,
            State:"passed"
         }
         console.log(requestData)
         const user ='super'
         try {
            const data =api.project.RemoveAction(user,requestData)
            ctx.body ={
                success:true,
                data:data
            }
         }catch(e){
             ctx.body ={
                 success:false,
                 err:e
             }
         }
    }

    /**
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @returns 
     * @memberof ProjectController
     */
    @get('/getOptions')
    async GetOptions(ctx,next){
        console.log(ctx.query)
        let  username= `super`
        const {OrgProperty,CompanyType,page,rows} =ctx.query

        let data ={
             OrgProperty:OrgProperty,
             CompanyType:CompanyType,
             page:page,
             rows:rows
        }
        const res =await api.project.GetOptions(username,data)
        return (ctx.body={
            success:true,
            data:res
        })
    }

    @get('/getClientUnit')
    async GetClientUnit(ctx,next){
        let username =`super`
        const{ OrgProperty,page, rows} =ctx.query
        let data ={
            OrgProperty:OrgProperty,
            page:page,
            rows:rows
        }
        const res  =await api.project.GetClientUnit(username,data)
        ctx.body ={
            success:true,
            data:res
        }
    }

    /**
     * 项目提交
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('/commitProject')
    async CommitProject(ctx,next){
        let projectInfo =ctx.request.body
        let user ='super'
        console.log(projectInfo)
        projectInfo.form.ID =uuid.v4()
        projectInfo.form.ApplyDate =sd.format(new Date(), 'YYYY-MM-DD')
        projectInfo.form.StartTime =sd.format(new Date(),'YYYY-MM-DD')
        
        try{
            const data = await api.project.CommitProject(user,projectInfo)
            console.log(data)
            ctx.body ={
                success:true,
                data:data
            }
        }catch(e){
            ctx.body ={
                success:false,
                err:e
            }
        }
    }
    
    /**
     * 搜索项目
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('/search')
    async Search(ctx,next){
        let { searchText,page } =ctx.query
        let user =`super`
        let query ={
            searchText:searchText,
            page:page,
            rows:10
        }
      
       console.log(query)
       try{
           const data =await api.project.Search(user,query)
           data.rows.forEach((item,index)=>{
              if(item.ProjectName.length>10){
                  item.ProjectName = item.ProjectName.substr(0,10) +'...'
               }
           })

           ctx.body ={
               success:true,
               data:data
           }
       }catch(e){
           ctx.body ={
               success:false,
               err:e
           }
       }
    }

    /**
     * 查询各个项目阶段的详情
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('/getSectionDetail')
    async getSectionDetail(ctx,next){
        const  { type,Id } =ctx.query
        let data =null
        const user =`super`
        switch(type){
            case "BusinessPhase":
               data =await api.project.BusinessPhase(user,Id)
               break;
            case "BusinessPhaseGroup":
               data =await api.project.BusinessPhaseGroup(user,Id)
               break;
            case "QuotedPrice":
               data =await api.project.QuotedPrice(user,Id)
              break;
            case "Biding":
               data =await api.project.Biding(user,Id)
              break;
            case "Contract":
                data =await api.project.Contract(user,Id)
              break;
            case "Receive":
                data =await api.project.Receive(user,Id)
              break;
        }

        ctx.body ={
            success:true,
            data:data
        }
    }

    /**
     * 修改项目--目前没有实现
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('/ProjecyUpdate/:_id')
    async ProjecyUpdate(ctx,next){
        let data =ctx.request.body
        let id =ctx.params._id
        let user ='super'
        let result =null
        if(data[0].TYpe===1){
            await api.project.EditBusinessManager(user,id,data)
        }else if(data[0].TYpe===2){
            await api.project.EditTechnicalManager(user,id,data)
        }
      // const result =await api.project.ProjectUpdtae(user,id,data)
       console.log(result)
       ctx.body ={
           success:true,
           data:result
       }
    }
   /**
    * 
    * 
    * @param {any} ctx 
    * @param {any} next 
    * @memberof ProjectController
    */
   @get('/ProjectBusiness')
    async ProjectBusiness(ctx,next){
        const { Id } =ctx.query
        const user ='super'
        let query ={
            HasApprove:true,
            value:Id,
            _valueFeild:'value'
        }
        const data =await api.project.ProjectBusiness(user,query)
        ctx.body ={
            data:data,
            success:true
        }
    }

    /**
     * 提交商务阶段
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('/BusinessCommit')
    async BusinessCommit(ctx,next){
       let data =ctx.request.body
       let user  ='super'
       data.form.ID =uuid.v4()
      data.form.ApplyDate =sd.format(new Date(), 'YYYY-MM-DD')
     data.form.StartTime =sd.format(new Date(),'YYYY-MM-DD')
       console.log(data)
       const result =api.project.BusinessCommit(user,data)
       ctx.body ={
           success:true,
           data:result
        }
    }

    /**
     * 商务阶段跟踪反馈
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('/PhaseFeedback')
    async PhaseFeedback(ctx,next) {
        let data =ctx.request.body
        let user =`super`
        data.form.ApplyPerson ='超级管理员',
        data.form.ChargePerson ='超级管理员'
        data.form.FinishTime =sd.format(new Date(), 'YYYY-MM-DD')
        data.form.ID =uuid.v4()
        console.log(data)
        const result =await api.project.PhaseFeedback(user,data)
        ctx.body ={
            success:true,
            data:result
        }
    }


    /**
     * 收款登记
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('/ReceiveGroup')
    async ReceiveGroup(ctx,next){
        const { Id } =ctx.query
        let user ='super'
        let query ={
            value:Id
        }
        const result =await api.project.ReceiveGroup(user,query)
        console.log(result)
        ctx.body ={
            success:true,
            data:result
        }
    }
    @post('/ReceiveCommit')
    async ReceiveCommit(){
        let data =ctx.request.body
    }

    @get('/GetBiding')
    async GetBiding(ctx,next){
        const { Id } =ctx.query
        let query ={
            hasApprove:'True',
            value:Id
        }
        let user =`super`
        //这里是跨服务调用的接口恨薄的一层，后面 最好加上一些服务熔断
        const result = await api.project.GetBiding(user,query)

        ctx.body ={
            success:true,
            data:result
        }
    }

    @get('/api/QuotedPrice')
    async QuotedPrice(ctx,next){
        const { Id }  =ctx.query
        const query ={
            hasApprove:'True',
            value:Id
        }
        const user ='super'
        const result =await api.project.GetQuotedPrice(user,query)
        ctx.body ={
            success:true,
            data:result
        }
    }

   /**
    * 
    * 
    * @param {any} ctx 
    * @param {any} next 
    * @memberof ProjectController
    */
   @post('CommitQuoted')
    async CommitQuoted(ctx,next){
        let data =ctx.request.body
        let user ='super'
        data.form.ApplyDate =sd.format(new Date(), 'YYYY-MM-DD')
        data.form.ApplyPerson ='超级管理员'
        data.form.ID =uuid.v4()
        console.log(data)
        const result =await api.project.CommitQutoedPrice(user,data)
        //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,

        ctx.body ={
            success:true,
            data:result
        }
     }

     

    /**
     * 
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('CommitBiding')
    async CommitBiding(ctx,next){
        let data = ctx.request.body
        data.form.ApplyDate =sd.format(new Date(), 'YYYY-MM-DD')
        data.form.ApplyPerson ='超级管理员'
        data.form.ID =uuid.v4()
        let user ='super'
        console.log(data)
         //这个地方可以加一些融错,不然恨单薄的一层
        const result =await api.project.CommitBiding(user,data)
        ctx.body ={
            success:true,
            data:result
        }
    }

    /**
     * 
     * 审阅
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('AuditItem')
    async AuditItem(ctx,next){
        let form =ctx.request.body
        let data =null
        let user ='super'
        if(!form.dataType){
            ctx.body ={
                success:false,
                message:"缺少参数"
            }
        }
        switch(form.dataType){
            case 'BusinessPhase':
               data = api.project.SetBusinessState(user,form)
            break
            case "QuotedPrice":
               data =api.project.RemoveQuotedPrice(user,form)
            break;
            case "Biding":
              //data =api.project.B
            break
        }
        ctx.body ={
            success:true,
            data:data
        }
    }


    /**请求类型-get
     * 撤销每个项目详情阶段的数据
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('RevocationItem')
    async  RevocationItem(ctx,next){
        let form =ctx.request.body
        let data =null
        let user ='super'
        if(!form.dataType){
            ctx.body ={
                success:false,
                message:"缺少参数"
            }
        }
        switch(form.dataType){
            case 'BusinessPhase':
               data =api.project.RemoveBusiness(user,form)
            break;
            case "BusinessPhaseGroup":
                data =api.project.RemoveBusinessPhaseGroup(user,form)
            break
            case 'QuotedPrice':
               data =api.project.RemoveQuotedPrice(user,form)
            break
            break;
            case "Biding":
            break;
            case "Contract":
            break;
            case "Receive":
            break;
        }
        ctx.body ={
            success:true,
            data:data
        }
    }

    /**
     * 求类型--get
     * 获取当前最新的商务阶段
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('BusinessStage')
    async BusinessStage(ctx,next){
        const { Id } =ctx.query
        let user ='super'
        const data =await api.project.BusinessStage(user,Id)

        console.log(data)
        if(data.total>0){
            let map =[]
            data.rows.forEach((item,index)=>{
                    if(map.length>0){
                    }else {
                        map.push({
                            Id:item.ID
                        })
                    }
            })
            console.log(map);
            let phaseId =map[0].Id
            ctx.body ={
                success:true,
                flag:true,
                phaseId:phaseId
            }
        }else {
            ctx.body ={
                success:true,
                flag:false
            }
        }
    }

    /**
     * 请求类型--get
     * 获取商务阶段任务详情
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('GetDetailByBusiness')
    async GetDetailByBusiness(ctx,next){
        const{ Id } =ctx.query
        let user ='super'
        const data =await api.project.BusinessStage(user,Id)
        if(data.total>0){
            let map =[]
            data.rows.forEach((item,index)=>{
                if(item.HandleStatus==2){
                    if(map.length>0){
                    }else {
                        map.push({
                            Id:item.ID
                        })
                    }
                }
            })
            let phaseId =map[0].Id
            let query ={
                HasApprove:true,
                value:phaseId,
                _valueFeild:'value'
            }
            let result =await api.project.ProjectBusiness(user,query)
            console.log('reusk')
            console.log(result)
            ctx.body ={
                success:true,
                data:result
            }
        }else {
            ctx.body ={
                success:true,
                data:[]
            }
        }
    }


    /**
     * 获取项目详情各个阶段的详细
     * 
     * @param {any} ctx  上下文
     * @param {any} next 交换控制权
     * @memberof ProjectController
     */
    @post('SetDateilCommitState')
    async SetDateilCommitState(ctx,next){
        let form =ctx.request.body
        let data =null
        let user ='super'
        if(!form.dataType){
            ctx.body ={
                success:false,
                message:"缺少参数"
            }
        }
        switch(form.dataType){
            case 'BusinessPhase':
               data =api.project.RemoveBusiness(user,form)
            break;
            case "BusinessPhaseGroup":
               data =api.project.RemoveBusinessPhaseGroup(user,form)
            break;
            case "QuotedPrice":
               data =api.project.RemoveQuotedPrice(user,form)
            break;
            case "Biding":
            break;
            case "Contract":
            break;
            case "Receive":
            break;
        }
        ctx.body ={
            success:true,
            data:data
        }
    }

    /**
     *  查询当前Id有没有合同
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
    */
    @get('CheckReceive')
    async CheckReceive(ctx,next){
        const { Id } =ctx.query
        let user ='super'
        let query ={
            ProjectID:Id,
            page:1,
            rows:20
        }
        const data =await api.project.CheckReceive(user,query)
        console.log(data)
        if(data.total>0){
            // let phaseId =data.rows[0].ID
            // console.log(phaseId)
            ctx.body ={
                success:true,
                flag:true,
                data:data.rows[0]
           //     phaseId:phaseId
            }
        }else {
            ctx.body ={
                success:true,
                flag:false
            }
        }
    }
    
    /**
     * 提交商务阶段代码
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @post('CommitContract')
    async CommitContract(ctx,next){
        let data =ctx.request.body
        let user ='super'
        data.form.ApplyDate =sd.format(new Date(), 'YYYY-MM-DD')
        data.form.ApplyPerson ='超级管理员'
        if(data.form.ID.length>0){
        }else {
            data.form.ID =uuid.v4()
        }
        console.log(data)
       const result =await api.project.CommitContract(user,data)
        //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,
        ctx.body ={
            success:true,
            data:result
        }
    }

    /**
     * 请求格式 get
     * 检查用户的权限 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof ProjectController
     */
    @get('CheckUser')
    async CheckUser(ctx,next){
        
    }

    @post('CommitReceive')
    async CommitReceive (ctx,next) {
        let data =ctx.request.body
        let user ='super'
        data.form.ID =uuid.v4()
        console.log(data)
        const result =await api.project.CommitReceive(user,data)
        ctx.body ={
            data:result,
            success:true
        }
    }
}
