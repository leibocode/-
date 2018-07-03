import Services from './services'
import axios from 'axios'
import { list } from 'postcss';

export default {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }

      commit('SET_USER', user)
    }
  },

  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },

  getUserByOAuth({ commit }, url) {
    return Services.getUserByOAuth(url)
  },

  getWechatOAuth({ commit }, url) {
    return Services.getWechatOAuth(url)
  },

  setAuthUser ({ commit }, authUser) {
    commit('SET_AUTHUSER', authUser)
  },


  async getProject ( { state } ){
     const res =await Services.getProject()
     state.project =res.data.data
     return res
  },

  async getAuditProject( { state },_id ){
    const res =await  axios.get(`/api/AuditProject/${_id}`)
    // state.auditProject =res.data
    // console.log(state.auditProject.BusinessData.total)
    return res
  },

  async getEmphasisProject({state }){
    const res =await axios.get(`/api/EmphasisProject`)
    state.project =res.data.data
    return res
  },

  async getProjectList( {state},typeCode){
    const res = await axios.get(`/api/ProjectList/${typeCode}`)
    console.log(res.data.data)
    state.projectList =res.data.data
     return res
  },
  async updateProject({ state },item){
    console.log(item)
    state.projectCommit =item
  },
  async clearProject({state},item){
    state.projectCommit =""
  },
  async updateContract( {state},item ){
    state.contract[item.Id] =item
  },
  async clearContract({state},Id) {
    state.contract[Id] =""
  },
  async updateQuotoed({ state},item){
    state.quoted[item.Id] =item
  },
  async clearQuoted({state},Id){
    state.quoted[Id] =""
  },
  async updateBiding({ state },item) {
     state.biding[item.Id] =item
     console.log(state.biding)
  },
  async clearBiding({ state },Id){
     state.biding[Id] =""
  },
  async updateBusiness( {state},item){
     state.business[item.Id] =item
     console.log(state.business)
  },
  async clearBusiness({state},Id){
    state.business[Id] =""
  },
 async updateTask({ state},item){
     state.business[item.Id].taskList =item.list
     console.log(state.business)
  },
  async updateProduct({state},item){

  },
 async  updateQuotedProduct( {state},item ){
  state.quoted[item.Id].products =item.list
 },
  async updateContractProduct( {state },item){
     state.contract[item.Id].productList =item.list
  },
  async updateStore({ state },item){
     console.log(item)

     switch(item.unit){
       case 'survey':
          state.projectCommit.designUnit =item.text
          state.projectCommit.designUnitID =item.value
          state.projectCommit.designUnitAddress =item.Address
       break;
       case 'client':
          state.projectCommit.clientUnit =item.text
          state.projectCommit.clientUnitID =item.value
        break;
        case 'construct':
           state.projectCommit.constructUnit =item.text
           state.projectCommit.constructUnitID =item.value
         break;
         case 'pShock':
          state.projectCommit.shock =item.text
          state.projectCommit.shockId =item.value
          break;
         case "shock":
           state.biding[item.Id].shock =item.text
           state.biding[item.Id].shockId =item.value
          break;
         case 'quShock':
           state.quoted[item.Id].shock =item.text
           state.quoted[item.Id].shockId =item.value
           break
          case 'conShock':
           state.contract[item.Id].conShock =item.text
           state.contract[item.Id].conShockId =item.value
           break
          case 'clientName':
          state.contract[item.Id].clientName =item.text
          state.contract[item.Id].clientNameId =item.value
          break
     }
  },

  async getContact({store},query){
    console.log(query)

    const res =await axios.get(`/api/GetContact?id=${query.id}&state=${query.state}`)
    
    return res
  },
  async RemoveAction({ store },HandleStatus,NextSetp,PreStep,id) {
    
  }
}