var Promise=require('bluebird')
var request=Promise.promisify(require('request'))
var util=require('./util.js')
var fs=require('fs')
var menu =require('../wechat/menu')
var crypto = require('crypto')
//https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRECT
var prefix='https://qyapi.weixin.qq.com/cgi-bin/';
var api={
	accessToken:prefix+'gettoken?',
	users:{
		create:prefix+'user/create?',
		get:prefix+'user/get?',
		update:prefix+'user/update?',
		del:prefix+'user/delete?',
		dellist:prefix+'user/batchdelete?',
		getdepartment:prefix+'user/simplelist?',
    getdepartmentdetail:prefix+'user/list'
	},
	department:{
        create:prefix+'department/create?',
        update:prefix+'department/update?',
        del:prefix+'department/delete?',
        get:prefix+'department/list?'
	},
	tag:{
        create:prefix+'tag/create?',
        update:prefix+'tag/update?',
        del:prefix+'tag/delete?',
        getUsers:prefix+'tag/get?',
        addUsers:prefix+'tag/addtagusers?',
        delUsers:prefix+'tag/deltagusers',
        getlist:prefix+'tag/list?'
	},
	menu:{
      create:prefix+'menu/create?',
      get:prefix+'menu/get?',
      del:prefix+'menu/delete?'
	},
	send:prefix+'message/send?',
	media:{
		upload:prefix+'media/upload?',
		get:prefix+'media/get?'
	},

};
function Wechat(opts){	
    // var that=this;
    console.log(opts)
	 this.corpid=opts.corpid;
	 this.secret=opts.secret;
	 this.agentId =opts.agentId;
	 this.appsecret =opts.appsecret;
	 this.getAccessToken=opts.getAccessToken;
	 this.saveAccessToken=opts.saveAccessToken;
	 this.getTicket=opts.getTicket;
	 this.saveTicket=opts.saveTicket;//encodingaeskey
	 this.encodingaeskey =opts.encodingaeskey;
	 this.token =opts.token;
	 this.fetchAccessToken();
	 this.fetchTicket();

	 //验证开发者服务器
	 this.aesKey = new Buffer(opts.encodingaeskey + '=', 'base64');
     this.iv = this.aesKey.slice(0, 16);

};
Wechat.prototype.PKCS7Decoder =function(buff){
    var pad = buff[buff.length - 1];
    if (pad < 1 || pad > 32) {
      pad = 0;
    }
    return buff.slice(0, buff.length - pad);
}
/**
 * [timestamp 时间戳函数]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @param    {[type]}   delay [description]
 * @return   {[type]}         [description]
 */
Wechat.prototype.timestamp =function(delay){
       delay =Number(delay)||0;
       return parseInt(new Date().valueOf() / 1000) + delay * 1000;
}

 /**
  * [encrypt 给响应下消息进行加密]
  * @Author   leibo
  * @DateTime 2017-09-27
  * @param    {[xml]}   xmlMsg [要加密的消息]
  * @return   返回加密的密文
  */
Wechat.prototype.encrypt =function(xmlMsg){
    var random16 = crypto.pseudoRandomBytes(16);
    var msg = new Buffer(xmlMsg);
    var msgLength = new Buffer(4);
    msgLength.writeUInt32BE(msg.length, 0);
    var corpid = new Buffer(this.corpid);
    var rawMsg = Buffer.concat([random16, msgLength, msg, corpid]);
    var cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
    var cipheredMsg = Buffer.concat([cipher.update(rawMsg), cipher.final()]);

    return cipheredMsg.toString('base64');
}

/**
 * [decrypr  接收用户的消息进行解密]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @param    {[type]}   echostr [description]
 * @return   返回解密后明文
 */
Wechat.prototype.decrypr =function(echostr){
    var aesCipher = crypto.createDecipheriv("aes-256-cbc", this.aesKey, this.iv);
    aesCipher.setAutoPadding(false);
    var decipheredBuff = Buffer.concat([aesCipher.update(echostr,'base64'), aesCipher.final()]);
    decipheredBuff = this.PKCS7Decoder(decipheredBuff);
    var len_netOrder_corpid = decipheredBuff.slice(16);
    var msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0);
    var result = len_netOrder_corpid.slice(4, msg_len + 4).toString();
    
   return result; // 返回一个解密后的明文
}
/**
 * [getSignature description]
 * @Author   leibo
 * @DateTime 2017-09-27
 */
Wechat.prototype.getSignature =function(token,timestamp,nonce,echostr){
    var key =  [token, timestamp, nonce, echostr].sort().join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex');
}
//验证此次的消息是微信服务器发送的
Wechat.prototype.verifyURL =function(signature, token, timestamp, nonce, echostr){
	return this.getSignature(token, timestamp, nonce, echostr) == signature;
}
/**
 * [encryptMsgs 消息加密]
 * @Author   leibo
 * @DateTime 2017-09-27
 * @return   {[xml]}   返回给微信服务器
 */
Wechat.prototype.encryptMsgs =function(replyxml,opts){
   var options =opts||{};
   var encrypt =this.encrypt(replyxml);
   var nonce =options.nonce||parseInt((Math.random()*100000000000),10);
   var timestamp =this.timestamp();
   var msgsignature =this.getSignature(this.token,timestamp,nonce,encrypt);
    var resxml = `
      <xml>
        <Encrypt><![CDATA[${encrypt}]]></Encrypt>
        <MsgSignature><![CDATA[${msgsignature}]]></MsgSignature>
        <TimeStamp>${timestamp}</TimeStamp>
        <Nonce><![CDATA[${nonce}]]></Nonce>
      </xml>
    `;
    return resxml;
}
//消息解密
Wechat.prototype.decryptMsg =function(msgSignature,token,timestamp,nonce,echostr){
    var msgencrypt =echostr.Encrypt;
     if (this.getSignature(token, timestamp, nonce, msgencrypt) != msgSignature) {
      console.log('消息签名不一致');
      return false;
    }
    var decryptedMsg =this.decrypr(msgencrypt);
   // return parseXML(decryptedMsg,{explicitArray:false});
}





//获取access_token
Wechat.prototype.fetchAccessToken=function(){
	var that=this;
	return new Promise(function(resolve,reject){
          
		if(that.access_token&&that.expires_in){
			if(that.isValidAccessToken(that)){
				//access_token合法向下传递
				resolve(that);
			}
		}
        //重新获取access_token
		that.getAccessToken().then(function(data){
		 	try{
		 		data=JSON.parse(data)
		 	}catch(e){
		 		return that.updateAccessToken();
		 	}
		 	if(that.isValidAccessToken(data)){
		 		return Promise.resolve(data);
		 	}else{
		 		return that.updateAccessToken();
		 	}
		 }).then(function(data){
		 	that.saveAccessToken(data);
		 	//access_token合法向下传递
		 	resolve(data);
		 	
		 })
	})

}
//获取消息权限的access_token
Wechat.prototype.fetchTicket=function(access_token){
    var that=this;
	return new Promise(function(resolve,reject){

		that.getTicket().then(function(data){
		 	try{
		 		data=JSON.parse(data)
		 	}catch(e){
		 		return that.updateTicket(access_token);
		 	}
		 	if(that.isValidTicket(data)){
		 		return Promise.resolve(data);
		 	}else{
		 		return that.updateTicket(access_token);
		 	}
		 }).then(function(data){
		 	that.saveTicket(data);
		 	
		 	resolve(data);
		 	
		 })
	})

}

//添加成员
Wechat.prototype.createUser=function(form){ 
   var that =this;
   return new Promise(function(resolve,reject){
		that.fetchAccessToken().then(function(data){
		    var url =api.users.create+"access_token="+data.access_token;
			 request({method:'POST',url:url,body:form,json:true}).then(function(response){
                   
			 });
		})
	});
}

//读取成员
Wechat.prototype.getUser =function(userid){
	var that =this;
    return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
        	var url =api.users.get+"access_token="+data.access_token+'&userid='+userid;
             request({method:'POST',url:url,json:true}).then(function(response){
                      resolve(response.body)
             });
        })
    })
}

//更新成员
Wechat.prototype.updateUser =function(form){
   var that =this;
   return new Promise(function(resolve,reject){
       that.fetchAccessToken().then(function(data){
       	   var url =api.users.update+"access_token="+data.access_token;
           request({method:'POST',url:url,body:form,json:true}).then(function(response){
                 console.log(response.body);
           });
       })
   })
}

//删除成员
Wechat.prototype.delUser =function(userid){
   var that =this;
   return new Promise(function(resolve,reject){
       that.fetchAccessToken().then(function(data){
         	var url =api.users.get+"access_token="+data.access_token+'&userid='+userid;
            request({method:'POST',url:url,json:true}).then(function(response){
                  console.log(response.body);
            });
       })
   })
}
//批量删除成员
Wechat.prototype.delUserList =function(useridlist){
   var that =this;
   return new Promise(function(resolve,reject){
      that.fetchAccessToken().then(function(data){
           var url =api.users.dellist+"access_token="+data.access_token;
	       request({method:'POST',url:url,json:true}).then(function(response){
	            console.log(response.body);
	       })
      })
   })
}

//获取部门成员
Wechat.prototype.getDepartment =function(depid,fetch){ 
   var that=this;
   return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
            var url =api.users.getdepartment+"access_token="
            +data.access_token+'&department_id='+depid+'&fetch_child='+fetch;
            request({method:'POST',url:url,json:true}).then(function(response){
            	console.log(response.body);
            })
        })
   })
}

//获取部门成员详情
Wechat.prototype.getDepartmentdetail =function(){

}

//创建部门
Wechat.prototype.createDep =function(form){
	var that =this;
	return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
             var url =api.department.create+"access_token="+data.access_token;
             request({method:'POST',url:url,body:form,json:true}).then(function(response){
                  console.log(response.body);
             })
        }) 
	})
}

//更新部门
Wechat.prototype.updateDep =function(form){
	var that =this;
	return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
            var url =api.department.update+"access_token="+data.access_token;
            request({method:'POST',url:url,form:form,json:true}).then(function(response){
                    console.log(response.body);
            })
        })

	})
}

//删除部门
Wechat.prototype.delDep =function(depid){
    var that =this;
    return new Promise(function(resolve,reject){
    	that.fetchAccessToken().then(function(data){
             var url =api.department.del+'access_token='+data.access_token+'&id'+depid;
             request({method:'POST',url:url,json:true}).then(function(response){
                  console.log(response.body);
             });
    	})
    })
}

//获取部门列表
Wechat.prototype.getDep =function(depid){
    var that =this;
    return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
             var url =api.department.get +"access_token="+data.access_token+"&id="+depid;
             request({method:'POST',url:url,json:true}).then(function(response){
                  console.log(response.body.errmsg);
                   console.log(response.body);
             });
        })
    })
}


//创建标签
Wechat.prototype.createTag =function(form){
	var that =this;
	return new Promise(function(resolve,reject){
        that.fetchAccessToken().then(function(data){
            var url =api.tag.create+'access_token='+data.access_token;
            request({method:'POST',url:url,json:true}).then(function(response){
                console.log(response.body); 
            });
        });
	})
}

//修改标签
Wechat.prototype.updateTag =function(form){
    var that =this;
    return new Promise(function(response,reject){
        that.fetchAccessToken().then(function(data){
        	 var url =api.tag.update+'access_token='+data.access_token;
             request({method:'POST',url:url,json:true}).then(function(response){
                 console.log(response.body);
             })
        })
    })
}

//删除标签
Wechat.prototype.delTag =function(tagid){
   var that =this;
   return new Promise(function(response,reject){
       that.fetchAccessToken().then(function(data){
           var url =api.tag.del+"access_token="+data.access_token+'&tagid='+tagid;
           request({method:'POST',url:url,json:true}).then(function(response){
               console.log(response.body);
           });
       })
   })
}

//获取标签成员
Wechat.prototype.getUserbyTag  =function(tagid){
  var that =this;
  return new Promise(function(response,reject){
      that.fetchAccessToken().then(function(data){
          var url =api.tag.getUsers+'access_token='+data.access_token+'&tagid='+tagid;
          request({method:'POST',url:url,json:ture}).then(function(response){
               console.log(response.body);
          })
      })
  })
}

//增加标签成员
Wechat.prototype.addUsersByTag =function(){
	
}

//创建菜单
Wechat.prototype.createMenu =function(menu){
	var that =this;
	 var agentId =that.agentId;
	return new Promise(function(resolve,reject){
        that.fetchTicket().then(function(data){
        	
             var url =api.menu.create +'access_token='+data.access_token+'&agentid='+agentId;
             request({method:'POST',url:url,body:menu,json:true}).then(function(response){
                 resolve(response)
             },(err)=>{
                   reject(err)
             });
        });
	});
};

//删除菜单
Wechat.prototype.delMenu =function(){
   var that =this;
   var agentId =that.agentId;
       return new Promise(function(resolve,reject){
          that.fetchTicket().then(function(data){
          
             var url =api.menu.del +'access_token='+data.access_token+'&agentid='+agentId;
             request({method:'GET',url:url,json:true}).then(function(response){
                resolve(response)
             },(err)=>{
                 reject(err)
             });
        });
  });
}


//推送消息
Wechat.prototype.sendMessgae =function(reply){
    var that =this;
    return new Promise(function(resolve,reject){
     var msg =util.sendtpl(reply);
     console.log(msg)
    that.fetchTicket().then(function(data){
           var url =api.send +"access_token="+data.access_token;
           request({method:'POST',url:url,body:msg,json:true}).then(function(response){
               console.log(response.body);
           })
    	})
    })
}

//发送图文消息
Wechat.prototype.Mpnews =function(username,reply){
	 var that =this;
	 return new Promise(function(resolve,reject ){
             var msg ={
                 "touser":username,
                 "toparty" : "@all",
                 "totag" : "@all",
                 "msgtype" : "news",
                 "agentid" : 1000002,
                 "news" : {
                    "articles" : [
                       {
                           "title" :reply.title,
                           "description" : reply.description,
                           "url" : reply.url,
                           "picurl" : reply.picurl,
                           "btntxt":"详情"
                       }
                    ]
               }
             }
			that.fetchTicket().then(function(data){
                var url =api.send +"access_token="+data.access_token;
		        request({method:'POST',url:url,body:msg,json:true}).then(function(response){
		               console.log(response.body);
		        });
			});
	 });
}

//发送卡片消息
Wechat.prototype.sendMessgaebycard  =function(username,reply){
    var that =this;
    return new Promise(function(resolve,reject){
        var msg ={
             "touser":username,
             "msgtype":"textcard",
             "agentid":1000002,
             "textcard" : {
                      "title" :reply.title ,
                      "description":reply.description,
                      "url":reply.url,
                      "btntxt":"详情"
             }
        };
    that.fetchTicket().then(function(data){
           var url =api.send +"access_token="+data.access_token;
           request({method:'POST',url:url,body:msg,json:true}).then(function(response){
               console.log(response.body);
           })
      })
      
    })
}


//发送文本文本消息
Wechat.prototype.sendMessgaebyText =function(username,content){
    var that =this;
    return new Promise(function(resolve,reject){
        var msg ={
       "touser":username,
       "toparty" : "@all",
       "totag" : "@all",
       "msgtype" : "text",
       "agentid" :1000002,
       "text" : {
           "content" : content
       },
       "safe":0
    };
    that.fetchTicket().then(function(data){
           var url =api.send +"access_token="+data.access_token;
           request({method:'POST',url:url,body:msg,json:true}).then(function(response){
               console.log(response.body);
           })
      })
      
    })
}



//获取用户信息
Wechat.prototype.getUserInfo=function(openId){
	var that=this;
	return new Promise(function(resolve,reject){
		that.fetchAccessToken().then(function(data){	
			var url=api.user.getUser+"access_token="+data.access_token
				+'&openid'+openId+'&lang=zh_CN';
			
			request({url:url,json:true})
			.then(function(response){
				 var _data=response.body;
				console.log(_data)
				resolve(_data);
			})
		})
	});
};
Wechat.prototype.isValidAccessToken=function(data){
	if(!data||!data.access_token||!data.expires_in){
		return false
	}else{
		var access_token=data.access_token;
		var expires_in=data.expires_in;
		var now=(new Date().getTime());
		if(now<expires_in){
			return true
		}else{
			return false
		}	
	}
};

Wechat.prototype.isValidTicket=function(data){
	if(!data||!data.ticket||!data.expires_in){
		return false
	}else{
		var ticket=data.ticket;
		var expires_in=data.expires_in;
		var now=(new Date().getTime());
		if(ticket&&now<expires_in){
			return true
		}else{
			return false
		}	
	}
};
Wechat.prototype.updateAccessToken=function(){
	var corpid=this.corpid;
	var secret=this.secret;
	var url=api.accessToken+'corpid='+corpid+'&corpsecret='+secret;
	return new Promise(function(resolve,reject){

		request({url:url,json:true}).then(function(response){
			 var data=response.body;
			var now=(new Date().getTime());
			var expires_in=now+(data.expires_in-20)*1000;
			data.expires_in=expires_in;
			resolve(data)
		})
	});
	
}

Wechat.prototype.updateTicket=function(access_token){
	    var appsecret =this.appsecret;
	    var corpid =this.corpid;
		var url=api.accessToken+'corpid='+corpid+'&corpsecret='+appsecret;
      return new Promise(function(resolve,reject){

		request({url:url,json:true}).then(function(response){
			 var data=response.body;
			var now=(new Date().getTime());
			var expires_in=now+(data.expires_in-20)*1000;
			data.expires_in=expires_in;
			resolve(data)
		})
	});
	
}
//回复消息
Wechat.prototype.reply=function(){
   var msgEncrypt =this.msgEncrypt;
 
}
module.exports=Wechat;