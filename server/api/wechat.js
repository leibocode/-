/**
 * 微信接口
 */
import {  getWechat, getOAuth } from '../wechat'


const client = getWechat()

// export async function getSignatureAsync (url) {
//   const data = await client.fetchAccessToken()
//   const token = data.access_token
//   const ticketData = await client.fetchTicket(token)
//   const ticket = ticketData.ticket

//   let params = client.sign(ticket, url)
//   params.appId = client.appID

//   return params
// }

export function getAuthorizeURL (...args) {
  const oauth = getOAuth()
  return oauth.getAuthorizeUrl(...args)
}

export async function getUserByCode (code) {
  const oauth = getOAuth()
  
  const ticket =await client.fetchTicket()
  const data = await oauth.fetchAccessToken(ticket.access_token,code)
  const user =await oauth.fetchUserInfo(ticket.access_token,data.user_ticket)
  return {
    userid:user.userid,
    name:user.name,
    mobile:user.mobile,
    gender:user.gender,
    email:user.email,
    avatar:user.avatar,
    qr_code:user.qr_code
  }
}


