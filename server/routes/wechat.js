
/**
 * 说明:此代码用的是es8的编写，nuxt build 不过关
 * 废弃文件
 * 等V2.0的时候加上
 */
import { controller, get, post, required } from '../decorator/router'
import { resolve } from 'path'
import config from '../config'
import { reply } from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'
import { readdirSync,readFileSync } from 'fs'
import sha1 from 'sha1'


/**
 *  微信控制器
 * 处理所有和微信相关的请求
 * @export
 * @class WechatController
 */
@controller('')
export class WechatController {
  @get('/wx')
  async wechatHear (ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  }

  @get('/WW_verify_j4MyzAjMcHIQbgYm')
 async ReadWww(ctx,next){
   const data =readFileSync(__dirname+'./../../WW_verify_j4MyzAjMcHIQbgYm.txt')
   return data
}

  @post('/wx')
  async wechatPostHear (ctx, next) {
    const middle = wechatMiddle(config.wechat, reply)
    await middle(ctx, next)
  }

  @post('/wechat-pay')
  @required({ body: ['productId', 'name', 'phoneNumber', 'address'] })
  async createOrder (ctx, next) {
    await wechatPay(ctx, next)
  }

  @get('/wechat-signature')
  async wechatSignature (ctx, next) {
    await signature(ctx, next)
  }

  @get('/wechat-redirect')
  async wechatRedirect (ctx, next) {
    await redirect(ctx, next)
  }

  @get('/wechat-oauth')
  async wechatOAuth (ctx, next) {
    await oauth(ctx, next)
  }
}

