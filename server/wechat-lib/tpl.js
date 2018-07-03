var ejs=require('ejs');
var heredoc=require('heredoc');

var tpl=heredoc(function(){/*
	<xml>
	<ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
	<FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
	<CreateTime><%= createTime%></CreateTime>
	<MsgType><![CDATA[<%= msgType %>]]></MsgType>
	<% if(msgType==='text') {%>
	<Content><![CDATA[<%= content%>]]></Content>
	<%} else if(msgType==='image') {%>
	<Image>
	<MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
	</Image>
	<%} else if(msgType==='voice') {%>
	<Voice>
	<MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
	</Voice>
	<%} else if(msgType==='video') {%>
	<Video>
	<MediaId><![CDATA[<%= content.mediaId%>]]></MediaId>
	<Title><![CDATA[<%= content.title%>]]></Title>
	<Description><![CDATA[<%= content.description %>]]></Description>
	</Video>
	<%} else if(msgType==='music') {%>
	<Music>
	<Title><![CDATA[<%= content.title%>]]></Title>
	<Description><![CDATA[<%= content.description %>]]></Description>
	<MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
	<HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
	<ThumbMediaId><![CDATA[<%= content.mediaId%>]]></ThumbMediaId>
	</Music>
	<%} else if(msgType==='news') {%>
	<ArticleCount><%= content.length%></ArticleCount>
	<Articles>
	<% content.forEach(function(item){%>
	<item>
	<Title><![CDATA[<%= item.title%>]]></Title> 
	<Description><![CDATA[<%=item.description%>]]></Description>
	<PicUrl><![CDATA[<%= item.picUrl%>]]></PicUrl>
	<Url><![CDATA[<%= item.url%>]]></Url>
	</item>
	<% }) %>
	</Articles>
	<% } %>
	
	</xml>
*/});
//  "toparty":"@all",
//"totag":"@all",
var tplmsg =heredoc(function(){/*
	{
	   "touser":"<%= touser%>",
	 
	   "msgtype":"<%= msgType%>",
	   "agentid":1000002,
	   <% if(msgType==='text'){%>
	         "text":{
	             "content":"<%= content%>"
	         },
	         "safe":0
	  <% } else if(msgType==='image'){%>
	           "image":{
	               "media_id":<%= content.media_id%>,
	          },
	          "safe":0
	  <% } else if(msgType==='voice'){%>
	            "voice":{
	                "media_id":<%= content.media_id%>,
	            }
	  <% } else if(msgType==='file'){%>
	            "file":{
	                "media_id" : "1Yv-zXfHjSjU-7LH-GwtYqDGS-zz6w22KmWAT5COgP7o",
	            }
	 <% } else if(msgType==='news'){%>
	           "news":{
	                "articles":[
                              {
	                        "title":"<%= content.title%>",
	                        "description":"<%= content.description%>",
	                        "url":"<%= content.url%>",
	                        "picurl":"<%= content.picurl%>",
	                        "btntxt":"<%= content.btntxt%>"
                              }
	                ]
	           }
	 <% }else if(msgType==='textcard'){%>
	        "textcard":{
	             "title":<%= title%>,
	             "description":<%= description%>,
	             "url":<%= url%>,
	             "btntxt":<%= btntxt%>
	        }
	<% }%>
       }
*/})
var compiled = ejs.compile(tpl);
var sendmsg  = ejs.compile(tplmsg);
exports=module.exports={
	compiled:compiled,
         sendmsg:sendmsg,
};