import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'
import xml2js from 'xml2js'
import { getWechat }  from '../wechat/index'
const Wechat  =require('../wechat/index')


export default function (opts,reply){
	const wechat= getWechat()
	return async function wechatMiddle(ctx,next) {
		const token =opts.token
		const msg_signature =ctx.query.msg_signature
		const nonce =ctx.query.nonce
		const encodingaeskey =opts.encodingaeskey
		const timestamp =ctx.query.timestamp
		const echostr =ctx.query.echostr

		const str =[token,timestamp,nonce,encodingaeskey].sort().join('');

		if(ctx.method==='GET'){
			console.log('验证服务器')
			if(wechat.verifyURL(msg_signature,token,timestamp,nonce,echostr)){
				 let a =wechat.decrypr(echostr)
				 ctx.body =a
			}else {
				ctx.body  ="wang:不是微信服务器"
			}
		}else if(ctx.method==='POST') {
		
			const data =await getRawBody(ctx.req,{
					length:ctx.length,
					limit:"1mb",
					encoding:ctx.charset
			})

			var content=await util.parseXMLAsync(data)
			//对消息解密 Encrypt
			console.log(content);
			console.log(content.xml.Encrypt[0])
			var xmlmsg = wechat.decrypr(content.xml.Encrypt[0])
			console.log(xmlmsg)
			var json="";
			xml2js.parseString(xmlmsg,{trim:true},function(err,content){
				json =content;
			});
			var message=util.formatMessage(json.xml);//把用户消息抓转为json
			ctx.weixin =message;//挂载到this上
			console.log(message);
			await reply.apply(ctx,[ctx,next]);
			const replyBody =ctx.body
			const msg =ctx.weixin
			const xml =util.tpl(replyBody,msg)
			const msgEncrypt =wechat.encryptMsgs(xml)
			var opt={
				nonce:nonce
		    };
			 ctx.status =200;
			 ctx.type='application/xml';
			 ctx.body=msgEncrypt;
		  }
	}
}

