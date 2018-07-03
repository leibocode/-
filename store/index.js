import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imageCDN: 'http://osmai097y.bkt.clouddn.com/',
      project:{},
      projectList:{},
      auditProject:{},
      projectCommit:{},
      biding:{},
      business:{},
      quoted:{},
      contract:{},
      token:'',//后端权限令牌
      user: null,
      authUser: null,
      receive:{}
    },
    getters,
    actions,
    mutations
  })
}

export default createStore