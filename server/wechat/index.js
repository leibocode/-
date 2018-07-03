import config from '../config'
import WechatOAuth from '../wechat-lib/oauth'
import path from 'path'

const Wechat =require('../wechat-lib/index')


var wechat_file = path.join(__dirname, '.././config/wechat.txt');
var wechat_ticket_file = path.join(__dirname, '.././config/wechat_ticket.txt');
var util = require('.././libs/util')


const wechatConfig = {
    wechat: {
      corpid: config.wechat.corpid,
      secret: config.wechat.secret,
      appsecret: config.wechat.appsecret,
      tokenencodingaeskey: config.wechat.token,
      encodingaeskey: config.wechat.encodingaeskey,
      agentId: 1000002,

    getAccessToken: function () {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function (data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file, data)
    },
    getTicket: function () {
      return util.readFileAsync(wechat_ticket_file)
    },
    saveTicket: function (data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_ticket_file, data)
    }
 }
}

export const  getWechat =()=>{
  const WechatClient =new Wechat(wechatConfig.wechat) 
  return WechatClient
}


export const getOAuth = () => {
  const oauth = new WechatOAuth(wechatConfig.wechat)
  return oauth
}
