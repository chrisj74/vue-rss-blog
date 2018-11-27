import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})
