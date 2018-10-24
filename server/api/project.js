/**
 * project--接口
 * 改造 把token 保存到 Vuex中 写两个方法来获取Get/Set
 */
import request from 'request-promise'
import config from  '../config'
import { requestCode } from './config'
import { exportSpecifier } from 'babel-types';

const requests = async (options) => {
    options = Object.assign({}, options, { json: true })

    try {
        const response = await request(options)
        return response
    } catch (error) {
        console.log(error)
    }
}
//请求api
const base = config.apiUrl
console.log(base)
const api = {
    token: `${base}login/DoActionApp`,
    phoneCode: `${base}/login/GetAppRandomCode?`,
    EmphasisProject: `${base}api/BasicData/Project?`,
    audit: `${base}/api/BasicData/Project/GetPageData?`,
    project:`${base}api/BasicData/Project/Get?`,
    Business:`${base}api/BasicData/BusinessPhase/Get?`,
    Users:`${base}api/BasicData/Project/GetProjectManagersWithCheck/?`,
    GetOptions:`${base}api/BasicData/Organization/GetOptions?`,
    commitProject:`${base}api/BasicData/Project/edit/`,
    RemoveAction:`${base}api/BasicData/Project/EditStateByNode`,
    Action:`${base}api/BasicData/Project/EditStateByNode`,
    Search:`${base}api/BasicData/Project?`,
    Deleagate:`${base}api`,
    DesignTask:`${base}api/BasicData/DesignTask/Get?`,
    BusinessPhase:`${base}api/BasicData/BusinessPhase/Get?`,
    BusinessPhaseGroup:`${base}api/BasicData/PhaseFeedback/Get?`,
    QuotedPrice:`${base}api/BasicData/QuotedPrice?`,
    ProjectUpdtae:`${base}api/BasicData/Project/EditProjectManagersByNode/`,
    Biding:`${base}api/BasicData/Biding?`,
    Contract:`${base}api/BasicData/Contract?`,
    Receive:`${base}api/BasicData/Receive/Get?`,
    DesignDeepen:`${base}api/BasicData/DesignDeepen?`,
    ProjectStop:`${base}`,
    ProjectBusiness:`${base}api/BasicData/Project/GetOptions?`,
    EditTechnicalManager:`${base}api/BasicData/Project/EditTechnicalManager/`,
    EditBusinessManager:`${base}api/BasicData/Project/EditBusinessManager/`,
    BusinessCommit:`${base}api/BasicData/BusinessPhase/edit/`,
    ReceiveGroup:`${base}api/BasicData/Contract/GetOptions?`,
    GetBiding:`${base}api/BasicData/Project/GetOptions?`,
    PhaseFeedback:`${base}api/BasicData/PhaseFeedback/edit/`,
    CommitBiding:`${base}api/BasicData/Biding/edit/`,
    CommitQuotedPrice:`${base}api/BasicData/QuotedPrice/edit/'`,
    BusinessState:`${base}api/BasicData/BusinessPhase/EditStateByNode`,
    QuotedPriceState:`${base}api/BasicData/QuotedPrice/EditStateByNode`,
    BidingState:`${base}api/BasicData//Biding/EditState/`,
    BusinessStage:`${base}api/BasicData/BusinessPhase/Get?`,
    CommitContract:`${base}api/BasicData/Contract/edit`,
    CheckReceive:`${base}api/BasicData/ReceiveGroup/GetReceive?`,
    CommitReceive:`${base}api/BasicData/Receive/Edit/`,
    GetAllUsers :`${base}/api/Sys/Users`,
    ContractState:`${base}/api/BasicData/Contract/EditState/`,
    ReceiveState:`${base}/api/BasicData/Receive/EditState`,
    //PhaseFeedback:`${base}/api/BasicData/PhaseFeedback/EditState/`,
    RoleUsers:`${base}api/Sys/User/GetUserOrgBasic?`,
    Apply:`${base}api/BasicData/Project/GetHasApply?`
}

const apiToken = async (username, code) => {
    const api = {
        usercode: username,
        code: code,
        app: true
    }
    const url = `${base}login/DoActionApp`
    const options = {
        method: 'POST',
        url: url,
        body: api
    }
    let data
    try {
        data = await requests(options)
        return data

    }catch(e) {
        let err  = {
            success:false,
            msg:'后端错误,请联系开发者'
        }
        return err
    }
}

const getPhoneCode = async (username) => {
    const url = `${api.phoneCode}UserCode=${encodeURIComponent(username)}`
    const options = {
        method: 'POST',
        url: url
    }
    try{
        const data = await requests(options)
        return data
    }catch(e){
        let err  = {
            success:false,
            msg:'服务器错误,请联系开发者'
        }
        return err
    }
}



//请求重点项目
export async function EmphasisProject(username,query) {
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.EmphasisProject}page=${query.page}&rows=${query.rows}`
    const options = {
        url: url,
        headers: {
            Authorization: token.token
        }
    }
    try {
        const data = await requests(options)
        return data
        console.log(data)
    }catch(e){
        return ({
            success:false,
            err:e,
            msg:'请求服务端失败'
        })
    }
   
    //  console.log(data)
    return data
}

//项目列表
export async function ProjectList(username, query) {
    console.log(username)
    const code = await getPhoneCode(username)
    console.log(code)
    const token = await apiToken(username, code.RandomCode)
    let url = `${api.EmphasisProject}`
    console.log(query);
    console.log(query.typeCode);
    console.log(query.typeCode==='1');
    
    if (query.typeCode === '1') {//设计项目
        console.log('进来了')
        url = `${api.EmphasisProject}Classification=${encodeURI(query.Classification)}&page=${query.page}&rows=${query.rows}`
    } else if (query.typeCode ==='2') {
        url = `${api.EmphasisProject}Classification=${encodeURI(query.Classification)}&page=${query.page}&rows=${query.rows}`
    } else if (query.typeCode ==='3') {
         console.log('进来了')
        url = `${api.EmphasisProject}HasMark=${query.HasMark}&page=${query.page}&rows=${query.rows}`
    }else {
        let pageSize =10
        url =`${api.EmphasisProject}page=${query.page}&rows=${query.rows}`
        
    }
    console.log(url)
    const options = {
        url: url,
        headers: {
            Authorization: token.token
        }
    }
    const data = await requests(options)
    return data
}

//BusinessPhase 商务阶段跟新
export async function BusinessPhase(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessPhase}ProjectID=${id}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目商务阶段进度跟踪反馈
export async function BusinessPhaseGroup(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessPhaseGroup}ID=${id}`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    console.log(data)
    return data
}

//项目投标申请
export async function Biding(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.Biding}ProjectID=${id}&pgae=1&rows=10`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目报价申请
export async function QuotedPrice(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.QuotedPrice}ProjectID=${id}&page=1&rows=20`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
        
    }
    const data =await requests(options)
    return data
}


//合同管理
export async function Contract(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.Contract}ProjectID=${id}&page=1&rows=20`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目报价申请
export async function Receive(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.Receive}ProjectID=${id}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目设计深化申请
export async function DesignDeepen(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.DesignDeepen}ProjectID=${id}&page=1&rows=10`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
}



//项目设计任务
export async function DesignTask(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.DesignTask}ProjectID=${id}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目基本信息
export async function ProjectAuditById(username, query) {
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    let url = `${api.project}ID=${query.Id}`
    const options = {
        url: url,
        headers: {
            Authorization: token.token
        }
    }
    const data = await requests(options)
    return data
}

//项目阶段
export async function ProjectStage(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.Business}ProjectID=${id}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目委托信息
export async function ProjectDelegate(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
}

export async function getContact(username,id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.Users}ProjectID=${id}`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

export async function RemoveAction(user,query){
    const code = await getPhoneCode(user)
    const token = await apiToken(user, code.RandomCode)
    console.log(query)
    const url =`${api.RemoveAction}/${query.ID}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:query
    }
    const data =await requests(options)
    return data
}

//提交审核
export async function SubmitAudit(user,query){
    const code = await getPhoneCode(user)
    const token = await apiToken(user, code.RandomCode)

    const url =`${api.RemoveAction}/${query.ID}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:query
    }
    const data =await request(options)
    return data
}

//商务阶段详细
export async function ProjectBusiness(user,query){
    const code = await getPhoneCode(user)
    const token = await apiToken(user, code.RandomCode)
    const url =`${api.ProjectBusiness}HasApprove=${query.HasApprove}&value=${query.value}&_valueFeild=value`

    const options ={
        method:'Get',
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await request(options)
    return data
}


//商务最新的阶段
export async function BusinessStage(username,Id){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessStage}ProjectID=${Id}`
    console.log(url);
    const options ={
        method:'get',
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}


export async function GetOptions(username,query){
    const { OrgProperty, CompanyType,rows,page} =query
    console.log(query)
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.GetOptions}OrgProperty=${encodeURI(OrgProperty)}&CompanyType=${encodeURI(CompanyType)}&page=${page}&rows=${rows}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

export async function GetClientUnit(username,query){
    const { OrgProperty,rows,page} =query
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.GetOptions}OrgProperty=${encodeURI(OrgProperty)}&page=${page}&rows=${rows}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

export async function CommitProject(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.commitProject}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

export async function CommitBiding(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.CommitBiding}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }

    const data =await requests(options)
    return data
}


export async function CommitQuotedPrice(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.CommitQuotedPrice}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}



//审核数据
export async function SetBusinessState(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//审核商务阶段跟踪反馈数据
export async function SetBusinessPhaseState(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//审核报价申请
export async function SetQuotedPriceState(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.QuotedPriceState}/${form.ID}`
    const options ={
        method:"post",
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//商务阶段提交撤销
export async function RemoveBusiness(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BusinessState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//商务阶段撤销提交
export async function RemoveBusinessPhaseGroup(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.PhaseFeedback}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//报价申请数据撤销
export async function RemoveQuotedPrice(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.QuotedPriceState}/${form.ID}`
    console.log(url)
    const options ={
        method:"post",
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//撤销投标申请
export async function RemoveBiding(username,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.BidingState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//合同
export async function RemoveContact(username,form){
    const code =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.ContractState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

//收款登记
export async function RemoveReceive(username,form){
    const code =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.ReceiveState}/${form.ID}`
    const options ={
        method:'post',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    } 
    const data =await requests(options)
    return data  
}

//搜索
export async function Search(username,query){
    console.log(query)
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url =`${api.Search}ProjectName=${encodeURI(query.searchText)}&page=${query.page}&rows=${query.rows}`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}


export async function ProjectUpdtae(username,id,form) {
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    const url = `${api.ProjectUpdtae}${id}`
    const options ={
        url:url,
        method:'POST',
        body:form,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//更新技术指派人
export async function EditTechnicalManager(username,id,form){
    const code = await getPhoneCode(username)
    console.log(code)
    const token = await apiToken(username, code.RandomCode)
    console.log(token)
    const url =`${api.EditTechnicalManager}${id}`
    const options ={
        url:url,
        method:'POST',
        body:form,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

// 更新商务阶段指派人
export async function EditBusinessManager(username,id,form){
    const code = await getPhoneCode(username)
    const token = await apiToken(username, code.RandomCode)
    console.log(token)
    const url =`${api.EditBusinessManager}${id}`
    const options ={
        url:url,
        method:'POST',
        body:form,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}



//商务阶段更新提交
export async function BusinessCommit(username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.BusinessCommit}`
    const options ={
        url:url,
        method:'POST',
        body:form,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//项目收款登记
export async function ReceiveGroup(username,query){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    //http://localhost:2437/api/BasicData/Contract/GetOptions?value=62253760-EA67-42DD-A14D-0B0D259DCE34&_valueFeild=value
    const url =`${api.ReceiveGroup}value=${query.value}&_valueFeild=value`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    console.log(data)
    return data
}

//项目投标
export async function GetBiding(username,query){
    console.log('xxx')
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url = `${api.GetBiding}HasApprove=${query.hasApprove}&value=${query.value}&_valueFeild=value`
    console.log(url)
    const options = {
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    console.log(data)
    return data
}

//项目商务阶段跟踪任务反馈提交 
export async function PhaseFeedback(username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url = `${api.PhaseFeedback}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =await requests(options)
    return data
}

export async function BidingCommit(){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =''
    const options ={
      method:'post',
      url:url,
      headers:{
          Authorization:token.token
      },
      body:form
    }
}

export async function CommitQutoedPrice(username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.CommitQuotedPrice}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =requests(options)
    return data
}

export async function CommitContract(username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.CommitContract}`
    const options ={
        method:'POST',
        url:url,
        headers:{
            Authorization:token.token
        },
        body:form
    }
    const data =requests(options)

}

export async function GetQuotedPrice(username,query){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url = `${api.GetBiding}HasApprove=${query.hasApprove}&value=${query.value}&_valueFeild=value`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//检查当前项目有没有合同
export async function CheckReceive(username,query){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.CheckReceive}ProjectID=${query.ProjectID}&page=${query.page}&rows=${query.rows}`
    console.log(url)
    const options ={
        url:url,
        headers:{
        Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}


//添加收款登记
export async function CommitReceive(username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.CommitReceive}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        },
        method:'POST',
        body:form
    }
    const data =await requests(options)
    return data
}

//导入人员

export async function  GetAllStaff(url,username,form){
    const code  =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        }
    }
    const data =await requests(options)
    return data
}

//权限--用户角色
export async function GetRoles(username,userCode){
    const code =await getPhoneCode(username)
    const token =await apiToken(username,code.RandomCode)
    const url =`${api.RoleUsers}UserCode=${encodeURI(userCode)}`
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        },
        method:'Get'
    }
    const data =await requests(options)
    return data
}

export async function GetApply(username,form){
    const code =await getPhoneCode(username)
    const token = await apiToken(username,code.RandomCode)
    const url = `${api.Apply}page=1&rows=20`
    console.log(url)
    const options ={
        url:url,
        headers:{
            Authorization:token.token
        },
        method:'Get'
    }
    const data =await request(options)
    return data 
}











