import Vue from 'vue'
import mint from 'mint-ui'

if (process.BROWSER_BUILD) {
    Vue.use(mint)
}

