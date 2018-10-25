import Router from 'koa-router'
import { resolve } from 'path'
import api from '../api'
  
import config from '../config'
import { reply,send } from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'
import { readdirSync, readFileSync } from 'fs'
import sha1 from 'sha1'

import { getAllUsers,createDep  } from '../node-script/staff'

const sd = require('silly-datetime');

const uuid = require('uuid')

const manba = require('manba')

const transliteration = require('transliteration');


export const router = app => {
  const router = new Router()

  /**
   * wechat router
   */

  router.get('/wx', async (ctx, next) => {
    console.log('/wx来了')
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  })



  router.get('/createDep',async(ctx,next)=>{
     const dep =await createDep()
     console.log(dep)
  })

  router.get('/createSatff',async(ctx,next)=>{
    getAllUsers()
  })

  router.post('/wx', async (ctx, next) => {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  })

  router.get('/WW_verify_j4MyzAjMcHIQbgYm.txt', async (ctx, next) => {
    const data = readFileSync(__dirname + './../../WW_verify_j4MyzAjMcHIQbgYm.txt')
    return data
  })

  router.post('/wechat-pay', async (ctx, next) => {

  })

  router.get('/wechat-signature', async (ctx, next) => {
    await signature(ctx, next)
  })

  router.get('/wechat-redirect',async(ctx,next)=>{
    await redirect(ctx, next)
  })

  router.get('/wechat-oauth',async(ctx,next)=>{
    await oauth(ctx, next)
  })


  /**
   * cms router 
   */
   router.post('/api/send',async(ctx,next)=>{
    let body = ctx.request.body
    if(!body || !body.type || !body.username){
      ctx.body = {
        success:false,
        msg:'参数不合法'
      }
    }
    await send(body)
  }) 

  router.get('/api/send',async(ctx,next)=>{
    let query = ctx.query
    if(!query.type){
       ctx.body ={
         success:false,
         msg:'参数不合法'
       }
    }
    console.log(query)
    await send(query)
    ctx.body ={
      success:true
    }
  })




  /**
   * project router
   * 
   */

  router.get('/api/EmphasisProject',async (ctx, next) => {
  //  if(!ctx.session.user || !ctx.session.user.name){
  //     console.log('error')
  //     ctx.body ={
  //       success:false,
  //       msg:'拿不到用户信息'
  //     }
  //   }

    let { page } = ctx.query
    let query = {
      page: page,
      rows: 10
    }
    //let user = ctx.session.user.name
    let user ='super'
    //  console.log(user)
    const data = await api.project.EmphasisProject(user, query)

    data.rows.forEach((item, index) => {
      if (item.ProjectName && item.ProjectName.length > 10) {
        item.ProjectName = item.ProjectName.substr(0, 10) + '...'
      }
    })

    return (ctx.body = {
      data: data,
      success: true
    })
  })


  router.get('/api/ProjectList',async (ctx, next) => {
    if(!ctx.session.user || !ctx.session.user.name){
      console.log('error')
      ctx.body ={
        success:false,
        msg:'拿不到用户信息'
      }
    }
    const { typeCode, page } = ctx.query
    let query = {
      typeCode: typeCode,
      page: page,
      rows: 10
    }
    if (typeCode === '1') {
      query['Classification'] = '设计项目'
    } else if (typeCode === '2') {
      query['Classification'] = '商务项目'
    } else if (typeCode === '3') {
      query['HasMark'] = true
    }
   // let user = ctx.session.user.name
   let user ='super'
   // console.log(user)
   // let username ='super'
    const data = await api.project.ProjectList(user, query)
    //const data =await api.project.ProjectList('super',query)
    return (ctx.body = {
      data: data,
      success: true
    })
  })


  router.get('/api/apply',async(ctx,next)=>{
    if(!ctx.session.user || !ctx.session.user.name){
       console.log('error')
       ctx.body ={
        success:false,
        msg:'拿不到用户信息'
       }
    }
    let user = ctx.session.user.name
    //let user ='super'
    let form = {}
    try{
      const data =await api.project.GetApply(user,form)
      // if(data.rows.length>0){
      //   data.rows.forEach((item)=>{
      //     item.ApplyDate = manba(item.ApplyDate).format()
      //   })
      // }
      ctx.body ={
        success:true,
        data:data
      }
    }catch(e){

    }
  })

  router.get('/api/GetRoles',async(ctx,next)=>{
     //let user =ctx.session.user
     console.log('111 roles')
     let user ='super'
     try{
        const data =await api.project.GetRoles(user,user)
        ctx.body ={
          success:true,
          data:data.OrgBasic.RoleCode
       }
     }catch(e){

     }
     
  })

  router.get('/api/ProjectDateil',async (ctx, next) => {
    const { Id, Classification } = ctx.query
    let user =ctx.session.user.name
    //const user = 'super'
    const query = {
      Id: Id,
      Classification: Classification
    }
    if (Id) {
      const data = await api.project.ProjectAuditById(user, query)
      console.log(data)
      data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format()
      ctx.body = {
        success: true,
        data: data
      }
    } else {
      ctx.body = {
        success: false,
        msg: 'Id不存在'
      }
    }
  })

  router.get('/api/AuditProject/:_id',async (ctx, next) => {
    const { _id } = ctx.params
    let query = {
      Id: _id
    }
    //let username = `super`
    let user =ctx.session.user.name
    const data = await api.project.ProjectAuditById(user, query)
    // data.rows[0].CreateDate =manba(data.rows[0].CreateDate).format()
    data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format()
    const BusinessData = await api.project.ProjectStage(user, _id)
    return (ctx.body = {
      data: data,
      BusinessData: BusinessData,
      success: true
    })
  })

  //指派联系人
  router.get('/api/GetContact', async (ctx, next) => {
    if(ctx.session.user.name){
    }else {
      return ctx.body ={
         success:false,
         msg:'拿不到用户信息'
       }
    }
    //const user = `super`
    let user =ctx.session.user.name
    
    const { id } = ctx.query
    try {
      const data = await api.project.getContact(user, id)
      data.forEach(item => {
        item.value = transliteration.slugify(item.UserCode).slice(0, 1)
      })
      ctx.body = {
        data: data,
        success: true
      }
    } catch (e) {
      ctx.body = {
        err: '网络请求出问题啦!',
        success: false
      }
    }
  })

  //撤销项目
  router.get('/api/RemoveAction',async (ctx, next) => {
    const { HandleStatus, NextSetp, PreStep, id } = ctx.query
    let requestData = {
      HandleStatus: 2,
      ID: id,
      NextSetp: false,
      PreSetp: true
    }
    const username =ctx.session.user.name
    //const user = 'super'
    try {
      const data = await api.project.RemoveAction(username, requestData)
      //console.log(data)
      ctx.body = {
        success: true,
        data: data
      }
    } catch (e) {
      ctx.body = {
        success: false,
        msg: '请联系开发者',
        err: e
      }
    }
  })

  //审核项目
  router.get('/api/SubmitAudit', async (ctx, next) => {
    const { HandleStatus, NextSetp,PreStep,id,Remark } = ctx.query
    let requestData = {
      HandleStatus: 1,
      ID: id,
      NextSetp: true,
      PreSetp: false,
      Remark: Remark,
      State:"passed"
    }
    const username =ctx.session.user.name
    //let user =ctx.session.user.name
    console.log('审核数据')
    console.log(requestData)
    try {
      const data =await api.project.RemoveAction(username, requestData)
      ctx.body = {
        success: true,
        data: data
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  })

  //获取单位
  router.get('/api/getOptions',async (ctx, next) => {
    let user =ctx.session.user
    const { OrgProperty, CompanyType, page, rows } = ctx.query

    let data = {
      OrgProperty: OrgProperty,
      CompanyType: CompanyType,
      page: page,
      rows: rows
    }
    const res = await api.project.GetOptions(user.name, data)
    return (ctx.body = {
      success: true,
      data: res
    })
  })

  //
  router.get('/api/getClientUnit',async (ctx, next) => {
    const { OrgProperty, page, rows } = ctx.query
    let data = {
      OrgProperty: OrgProperty,
      page: page,
      rows: rows
    }
    let user =ctx.session.user.name
    let username ='super'
    const res = await api.project.GetClientUnit(user, data)
    ctx.body = {
      success: true,
      data: res
    }
  })

  //项目提交
  router.post('/api/commitProject',async (ctx, next) => {
    let projectInfo = ctx.request.body
    //let user = 'super'
    let user =ctx.session.user.name
    //console.log(projectInfo)
    projectInfo.form.ID = uuid.v4()
    projectInfo.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD')
    projectInfo.form.ApplyPerson =user.name
    //  projectInfo.form.StartTime =sd.format(new Date(),'YYYY-MM-DD')
    projectInfo.form.CreateDate = sd.format(new Date(), 'YYYY-MM-DD')
    console.log(projectInfo)
    try {
      const data = await api.project.CommitProject(user, projectInfo)
      console.log(data)
      ctx.body = {
        success: true,
        data: data
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  })

  //搜索项目
  router.get('/api/search',async (ctx, next) => {
    let { searchText, page } = ctx.query
    let user = ctx.session.user.name
    let query = {
      searchText: searchText,
      page: page,
      rows: 10
    }
   
    try {
      const data = await api.project.Search(user, query)
      data.rows.forEach((item, index) => {
        if (item.ProjectName.length > 10) {
          item.ProjectName = item.ProjectName.substr(0, 10) + '...'
        }
      })

      ctx.body = {
        success: true,
        data: data
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  })

  //查询每个阶段的项目详情
  router.get('/api/getSectionDetail',async (ctx,next) => {
    const { type, Id } = ctx.query
    let data = null
    let user =ctx.session.user.name
    switch (type) {
      case "BusinessPhase":
        data = await api.project.BusinessPhase(user, Id)
        break;
      case "BusinessPhaseGroup":
        data = await api.project.BusinessPhaseGroup(user, Id)
        break;
      case "QuotedPrice":
        data = await api.project.QuotedPrice(user, Id)
        break;
      case "Biding":
        data = await api.project.Biding(user, Id)
        break;
      case "Contract":
        data = await api.project.Contract(user, Id)
        break;
      case "Receive":
        data = await api.project.Receive(user, Id)
        break;
    }
    console.log(data)
    if(data.rows.length>0){
      data.rows.forEach((item,index)=>{
        item.ApplyDate =manba(item.ApplyDate).format()
      })
    }
    //data.rows[0].ApplyDate = manba(data.rows[0].ApplyDate).format()

    ctx.body = {
      success: true,
      data: data
    }
  })

  router.post('/api/ProjecyUpdate/:_id',async (ctx, next) => {
    let data = ctx.request.body
    let id = ctx.params._id
    let user  =ctx.session.user.name
    let result = null
    console.log(data)
    if (data[0].Type === 1) {
      await api.project.EditBusinessManager(user,id,data)
    } else if (data[0].Type === 2) {
      await api.project.EditTechnicalManager(user,id,data)
    }
    // const result =await api.project.ProjectUpdtae(user,id,data)
    console.log(result)
    ctx.body = {
      success: true,
      data: result
    }
  })

  router.get('/api/ProjectBusiness',async (ctx, next) => {
    const { Id } = ctx.query
    let user =ctx.session.user.name
    let query = {
      HasApprove: true,
      value: Id,
      _valueFeild: 'value'
    }
    const data = await api.project.ProjectBusiness(user, query)
    ctx.body = {
      data: data,
      success: true
    }
  })

  //提交商务阶段
  router.post('/api/BusinessCommit',async (ctx, next) => {
    let data = ctx.request.body
    let user =ctx.session.user.name
    data.form.ID = uuid.v4()
    data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD')
    data.form.StartTime = sd.format(new Date(), 'YYYY-MM-DD')
    console.log(data)
    const result = api.project.BusinessCommit(user, data)
    ctx.body = {
      success: true,
      data: result
    }
  })

  //商务阶段跟踪反馈
  router.post('/api/PhaseFeedback',async (ctx, next) => {
    let data = ctx.request.body
    let username =ctx.session.user.name
    data.form.ApplyPerson = username
      data.form.ChargePerson =username
    data.form.FinishTime = sd.format(new Date(), 'YYYY-MM-DD')
    data.form.ID = uuid.v4()
    console.log('商务阶段跟踪反馈')
    console.log(data)
    const result = await api.project.PhaseFeedback(username, data)
    ctx.body = {
      success: true,
      data: result
    }
  })


  //收款登记
  router.get('/api/ReceiveGroup',async (ctx, next) => {
    const { Id } = ctx.query
    let username =ctx.session.user.name
    let query = {
      value: Id
    }
    const result = await api.project.ReceiveGroup(username, query)
    console.log(result)
    ctx.body = {
      success: true,
      data: result
    }
  })

  //收款登记提交
  router.post('/api/ReceiveCommit',async (ctx, next) => {
    const { Id } = ctx.query
    let username =ctx.session.user.name
    let query = {
      value: Id
    }
    const result = await api.project.ReceiveGroup(username, query)
    ctx.body = {
      success: true,
      data: result
    }
  })

  router.get('/api/GetBiding',async (ctx, next) => {
    const { Id } = ctx.query
    let query = {
      hasApprove: 'True',
      value: Id
    }
    let username =ctx.session.user.name
    //这里是跨服务调用的接口恨薄的一层，后面 最好加上一些服务熔断
    const result = await api.project.GetBiding(username, query)

    ctx.body = {
      success: true,
      data: result
    }
  })

  router.get('/api/QuotedPrice',async (ctx, next) => {
    const { Id } = ctx.query
    const query = {
      hasApprove: 'True',
      value: Id
    }
    const result = await api.project.GetQuotedPrice(user, query)
    ctx.body = {
      success: true,
      data: result
    }
  })

  router.post('/api/CommitQuoted',async (ctx, next) => {
    let data = ctx.request.body
    let user =ctx.session.user.name
    data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD')
    data.form.ApplyPerson = user
    data.form.ID = uuid.v4()
    console.log(data)
    const result = await api.project.CommitQutoedPrice(user, data)
    //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,

    ctx.body = {
      success: true,
      data: result
    }
  })

  router.post('/api/CommitBiding',async (ctx, next) => {
    let data = ctx.request.body
    data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD')
    data.form.ApplyPerson = '超级管理员'
    data.form.ID = uuid.v4()
    console.log(data)
    //这个地方可以加一些融错,不然恨单薄的一层
    const result = await api.project.CommitBiding(user, data)
    ctx.body = {
      success: true,
      data: result
    }
  })

  router.post('/api/AuditItem',async (ctx, next) => {
    let form = ctx.request.body
    let data = null
    if (!form.dataType) {
      ctx.body = {
        success: false,
        message: "缺少参数"
      }
    }
    switch (form.dataType) {
      case 'BusinessPhase':
        data = api.project.SetBusinessState(user, form)
        break
      case "QuotedPrice":
        data = api.project.RemoveQuotedPrice(user, form)
        break;
      case "Biding":
        data =api.project.RemoveBiding(user,form)
        break;
      case "BusinessPhaseGroup":
        data =api.project.RemoveBusinessPhaseGroup(user,form)
        break
      case "Contract":
        data =api.project.RemoveContact(user,form)
        break
      case "Receive":
         data =api.project.RemoveReceive(user,form)
         break
    }
    ctx.body = {
      success: true,
      data: data
    }
  })

  router.post('/api/RevocationItem',async (ctx, next) => {
    let form = ctx.request.body
    let data = null
    if (!form.dataType) {
      ctx.body = {
        success: false,
        message: "缺少参数"
      }
    }
    switch (form.dataType) {
      case 'BusinessPhase':
        data = api.project.RemoveBusiness(user, form)
        break;
      case "BusinessPhaseGroup":
        data = api.project.RemoveBusinessPhaseGroup(user, form)
        break
      case 'QuotedPrice':
        data = api.project.RemoveQuotedPrice(user, form)
        break
      case "Biding":
          data =api.project.RemoveBiding(user,form)
        break
      case "Contract":
          data =api.project.RemoveContact(user,form)
        break
      case "Receive":
           data =api.project.RemoveReceive(user,form)
        break
    }
    ctx.body = {
      success: true,
      data: data
    }
  })


  router.get('/api/BusinessStage',async (ctx, next) => {
    const { Id } = ctx.query
    const data = await api.project.BusinessStage(user, Id)

    console.log(data)
    if (data.total > 0) {
      let map = []
      data.rows.forEach((item, index) => {
        if (map.length > 0) {
        } else {
          map.push({
            Id: item.ID
          })
        }
      })
      console.log(map);
      let phaseId = map[0].Id
      ctx.body = {
        success: true,
        flag: true,
        phaseId: phaseId
      }
    } else {
      ctx.body = {
        success: true,
        flag: false
      }
    }
  })

  router.get('/api/GetDetailByBusiness',async (ctx, next) => {
    const { Id } = ctx.query
    let user =ctx.session.user.name
    const data = await api.project.BusinessStage(user, Id)
    if (data.total > 0) {
      let map = []
      data.rows.forEach((item, index) => {
        if (item.HandleStatus == 2) {
          if (map.length > 0) {
          } else {
            map.push({
              Id: item.ID
            })
          }
        }
      })
      let phaseId = map[0].Id
      let query = {
        HasApprove: true,
        value: phaseId,
        _valueFeild: 'value'
      }
      let result = await api.project.ProjectBusiness(user, query)
      console.log('reusk')
      console.log(result)
      ctx.body = {
        success: true,
        data: result
      }
    } else {
      ctx.body = {
        success: true,
        data: []
      }
    }
  })

  router.post('/api/SetDateilCommitState',async (ctx, next) => {
    let form = ctx.request.body
    let data = null
    let user =ctx.session.user.name
    if (!form.dataType) {
      ctx.body = {
        success: false,
        message: "缺少参数"
      }
    }
    switch (form.dataType) {
      case 'BusinessPhase':
        data = api.project.RemoveBusiness(user, form)
        break;
      case "BusinessPhaseGroup":
        data = api.project.RemoveBusinessPhaseGroup(user, form)
        break;
      case "QuotedPrice":
        data = api.project.RemoveQuotedPrice(user, form)
        break;
      case "Biding":
        data =api.project.RemoveBiding(user,form) 
        break;
      case "Contract":
        data =api.project.RemoveContact(user,form)
        break;
      case "Receive":
         data =api.project.RemoveReceive(user,form)
        break;
    }
    ctx.body = {
      success: true,
      data: data
    }
  })


  router.get('/api/CheckReceive',async (ctx, next) => {
    if(ctx.session.user.name){
    }else {
      return ctx.body ={
        success:false,
        msg:"拿不到用户的信息"
      }
    }
    const { Id } = ctx.query
   let user =ctx.session.user.name
    let query = {
      ProjectID: Id,
      page: 1,
      rows: 20
    }
    
    const data = await api.project.CheckReceive(user, query)
    if (data.total > 0) {
      // let phaseId =data.rows[0].ID
      // console.log(phaseId)
      ctx.body = {
        success: true,
        flag: true,
        data: data.rows[0]
        //     phaseId:phaseId
      }
    } else {
      ctx.body = {
        success: true,
        flag: false
      }
    }
  })

  router.post('/api/CommitContract',async (ctx, next) => {
    let data = ctx.request.body
    let user =ctx.session.user.name
    data.form.ApplyDate = sd.format(new Date(), 'YYYY-MM-DD')
    data.form.ApplyPerson =user
    if (data.form.ID.length > 0) {
    } else {
      data.form.ID = uuid.v4()
    }
    // console.log(data)
    const result = await api.project.CommitContract(user, data)
    //跨进程的通信,可以加一些调用之间融错,不然恨单薄的一层,

    ctx.body = {
      success: true,
      data: result
    }
  })

  //检查用户的权限
  router.get('checkUser', async (ctx, next) => {

  })

  router.post('/api/CommitReceive',async (ctx, next) => {
    let data = ctx.request.body
   let user =ctx.session.user.name
    data.form.ID = uuid.v4()
    console.log(data)
    const result = await api.project.CommitReceive(user, data)
    ctx.body = {
      data: result,
      success: true
    }
  })


  app
    .use(router.routes())
    .use(router.allowedMethods())
}
