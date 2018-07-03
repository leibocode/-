import request from 'request-promise'

const api ={
    AuthorizeUrl:`https://open.weixin.qq.com/connect/oauth2/authorize?`,
    AccessTokenUrl:'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
    UserInfoUrl:'https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?',
    getUser:'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?'
}

export default class  workOAuth {
    constructor(opts){
        this.corpId =opts.corpid
        this.corpSecret =opts.appsecret
        this.agentId =opts.agentId

    }
    async request(options) {
        options =Object.assign({},options,{json:true})

        try{
            const response =await request(options)
            return response
        }catch(error) {
            console.log(error)
        }
    }

    getAuthorizeUrl(scope='snsapi_privateinfo',target,state) {
        const url =`${api.AuthorizeUrl}appid=${this.corpId}&redirect_uri=${encodeURIComponent(target)}&response_type=code&scope=${scope}&agentid=${this.agentId}&state=${state}#wechat_redirect`
        return url
    }

    async  fetchAccessToken(access_token,code) {
        const url =`${api.getUser}access_token=${access_token}&code=${code}`
        const data =await this.request({url:url})
        return data
    }

    async fetchUserInfo(access_token,user_ticket){
        const url =`${api.UserInfoUrl}access_token=${access_token}`
        const options ={
            method:'POST',
            url:url,
            body:{
                "user_ticket":user_ticket
            }
        }
        const data =await this.request(options)
        return data
    }
}






 