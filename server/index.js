import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
//import R from 'ramda'
import { resolve } from 'path'

import  { addBody,addSession } from './middlewares/common'
import { router } from './middlewares/router'
import { arrayPattern } from 'babel-types';


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const r = path => resolve(__dirname, path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
//const MIDDLEWARES = ['common', 'router']



//import './wechat-lib'

class Server {
  constructor () {
    //console.log(r)
    this.app = new Koa()
    this.useMiddleWares(this.app)
  }

  useMiddleWares (app) {

    // return m=>{
		// 	m.forEach(o=>{
		// 		require(`${r('./middlewares')}/${o}`)(MIDDLEWARES)
		// 	})
    // }
    
    addBody(app)
    addSession(app)
    router(app)
    
  }

  async start () {
    // Instanciate nuxt.js
    const nuxt = await new Nuxt(config)
    // Build in development
    if (config.dev) {
      try {
        const builder = new Builder(nuxt)
        await builder.build()
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        process.exit(1)
      }
    }

    this.app.use(async (ctx, next) => {
      await next()
      ctx.status = 200
      ctx.req.session = ctx.session

      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          promise.then(resolve).catch(reject)
        })
      })

      await nuxt.render(ctx.req, ctx.res)
    })

    this.app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  }
}

const app = new Server()

app.start()