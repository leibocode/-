import wechat_config from '../config' 
module.exports = {
	'button': [{
		'type': 'click',
		'name': '项目查询',
		 'sub_button':[{
			 'name':'商务项目',
			 'type':'click',
			 'key':'menu_click_business'
		 },{
			'name':'设计项目',
			'type':'click',
			'key':'menu_click_design'
		 },{
			 'name':'重点项目',
			 'type':'click',
			 'key':'menu_click_Ech'
		 }]
	}, {
		'type': 'view',
		'name': '我的项目',
		'url': `${wechat_config.SITE_ROOT_URL}/list`
	}, {
		'name': "平台管理",
		'type':'view',
        'url':`${wechat_config.SITE_ROOT_URL}`
	}]
}