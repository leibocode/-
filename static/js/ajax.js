import axios from 'axios'
import { Toast }  from 'mint-ui'
const ajax = axios.create({
    timeout:3000
})

ajax.interceptors.request.use(function(config){
    //request 
})
ajax.interceptors.response.use((response)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})

export default ajax