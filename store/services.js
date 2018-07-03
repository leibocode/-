import axios from 'axios'

const baseUrl = ''

class Services {
 getWechatSignature(url) {
   return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
 }

 getUserByOAuth(url){
   return axios.get(`${baseUrl}/wechat-oauth?ur=${url}`)
 }

 getWechatOAuth(url) {
  return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
 }

  getProject() {
     return axios.get(`${baseUrl}/api/EmphasisProject`)
  }
  
  getProjectDetail(){
    return axios.post(`${baseUrl}/api/`)
  }
  
  getProjectList(typeCode){
    return axios.get(`${baseUrl}/api/ProjectList/${typeCode}`)
  }
  
}

export default new Services()