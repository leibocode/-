import api from '../api'
import config from '../wechat'
import { getWechat } from '../wechat'
import wechat_config from '../config' 
import { WSAEALREADY } from 'constants'


const path = require("path")
const querystring = require("querystring")
const manba =require('manba')
const menu = require('./menu')
const sd = require('silly-datetime');
const transliteration =require('transliteration')

const client =getWechat()
const tip = '欢迎来到建顾管理管理应用,当前版本v1.0.0.\n'+'1~查询项目请以项目开头跟上空格,项目名称结尾的格式输入.\n'+'2~文本回复请输入1,2,建顾,以及任意文案\n'+'3~项目操作请点击下方菜单,点击项目查询,查询到当前用户最新的项目,点击我的项目进入项目列表,点击建顾进入平台首页.\n'+'4~当前版本v1,您有更好的想法请联系开发者.'


// const getAll = async()=>{
// 	console.log(api.project.GetAllStaff())
// }

// getAll()


// client.delMenu().then((data)=>{
// 	console.log(data)
// })

client.createMenu(menu).then((data)=>{
 	 console.log(data)
})

//client.createMenu(menu).then(()=>{
//	console.log('创建成功')
//})

export const  reply =async(ctx,next)=> {
	let message = ctx.weixin
	console.log(message)
	let reply = 'sorry';
	var date = manba().format("ll");
	let username = message.FromUserName;
	console.log(username)
	let person = await client.getUser(username);
	console.log('微信回复')
	console.log(person)
	let usercode = person.name;
	console.log(usercode)
	if (message.MsgType === 'event') {
		if (message.Event === "subscribe") {
			reply = tip
			client.sendMessgaebyText(message.FromUserName, reply);
		} else if (message.Event === 'click') {
		
			let data = null;
			let params ={
				typeCode:'0',
				page:1,
				rows:10
			}
			let title ='商务项目'
			if (message.EventKey === 'menu_click_business') {
				params['Classification'] ='商务项目'
				params["typeCode"] ='2'
			} else if (message.EventKey === 'menu_click_design') {
				params['Classification'] ='设计项目'
				title ='设计项目'
				params["typeCode"] ='1'
			}else if(message.EventKey==='menu_click_Ech'){
				params["HasMark"] =true
				title ='重点项目'
				params["typeCode"] ='3'
			}
			//console.log(params)
			const result =await api.project.ProjectList(usercode,params)
		    console.log(result)
			if(result.rows.length>0){
				 let sendMsg =result.rows[0]
				 let card ={
					 title:'项目查询:'+title,
					 description: "<div class=\"gray\">查询时间:"+sd.format(new Date(), 'YYYY-MM-DD')+"</div> <div class=\"normal\">项目类型:"+
					 sendMsg.Classification+ "</div><div class=\"highlight\">项目名称:"+sendMsg.ProjectName+"</div>",
					 url:`${wechat_config.SITE_ROOT_URL }/detail?ID=${sendMsg.ID}`
				 }
				 client.sendMessgaebycard(message.FromUserName,card)
			}else {
				let msg ='您当前没有项目哦'
				client.sendMessgaebyText(message.FromUserName, msg);
			}

		}else if(message.Event ==='view') {
			//跳转到详情
		}

	} else if (message.MsgType === 'text') {
		var content = message.Content;
		reply = `您说的${content}复杂了,我不懂.....`;
		if (content === "1") {
			reply = `你好，欢迎来到建顾项目管理`;
		} else if (content === "2") {
			reply = `Hi, 快去查询我的项目吧`;
		} else if (content === "建顾") {
			reply = `上海建顾减震科技有限公司是一家提供结构减隔震系统解决方案的高科技企业，注册资金为7000万，所涉及的工程领域遍布建筑、桥梁、电力、基础设施、设备、军工、石化、构筑物、新能源等方面。依托于同济大学强大的智库支持，公司拥有本行业超强的技术团队，研发骨干均具有名校博士学位，在结构设计优化咨询、减隔震产品研发、设计及应用等方面积累了深厚的经验，与此配套的精细化的生产制造与工程实施队伍则为解决方案的系统落地提供了切实的保障。公司总部在上海，下设市场、设计、生产、研发、工程等部门，并在新疆、云南建立分公司，西安、武汉、成都、深圳、北京、海南等地设立业务分支机构`;
		} else if(content.indexOf('项目')!==-1){
			let searchText =content.substr(3)
			console.log(searchText);
			let query ={
				searchText:searchText,
				page:'1',
				rows:10
			}
			//console.log(query)
			const projects =await api.project.Search(usercode,query)
			//console.log(projects)
			const project =projects.rows[0]
		    if(projects.rows.length>0){
				let card ={
					title:"项目查询",
					description: "<div class=\"gray\">查询时间:"+sd.format(new Date(), 'YYYY-MM-DD')+"</div> <div class=\"normal\">项目类型:"+
					project.Classification+ "</div><div class=\"highlight\">项目名称:"+project.ProjectName+"</div>",
					url:`${wechat_config.SITE_ROOT_URL }/detail?ID=${project.ID}`
				}
				client.sendMessgaebycard(message.FromUserName,card)
				return ;
			}else {
			   reply =`没有${searchText}这个项目哦,点击<a href="${wechat_config.SITE_ROOT_URL}/project/commit">添加项目</a>`	
			}
		}else {
			reply = tip
		}
	    client.sendMessgaebyText(message.FromUserName, reply);
	} else if (message.MsgType === 'voice') {
	  //语音识别在企业微信中没有开放,
	//   const voiceText = message.Recognition
	//   console.log(voiceText)
	}
 }




 
//为网站调用抛出的接口
//这个地方没有做权限控制,
//解决方式:1.最简单的就是锁定ip,
// 2.添加OAuth协议
export const send = (ctx,next)=> {
	if (!ctx.req._parsedUrl.query) {
		ctx.body = "参数错误"
		return
	}
	let params = querystring.parse(ctx.req._parsedUrl.query)
	let msg = params.msg;
	let username = params.username
	if (msg === '' || username === '' || typeof msg === 'undefined' || typeof username === 'undefined') {
		ctx.body = "参数不合法"
		return
	}

	if (msg.length > 100 || username.length > 5) {
		ctx.body = "参数长度过大"
		return;
	}
	//根据名字请求接口 GET
	client.sendMessgae(username, msg)
}
