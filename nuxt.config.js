module.exports = {
  /**
   * 
   * 
   */
  // router: {
  //   middleware: 'wechat-auth'
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/mint-ui/lib/style.css'}
    ],
    script: [
      // {
      //   src: 'http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js'
      // },
      {
        src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    {
      src: 'static/css/weui.css'
    },
    {
      src: 'static/css/example.css'
    },
    {
      src:'static/font-awesome/css/font-awesome.min.css'
    }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#399fff' },
  /*
   ** Build configuration
   */
  plugins: [
    {
      src: '~plugins/mint-ui', ssr: true
    }//,
    // {
    //   src:'~plugins/fastclick',ssr:false
    // }
  ],
  build: {
    /*
     ** Run ESLINT on save
     */
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
