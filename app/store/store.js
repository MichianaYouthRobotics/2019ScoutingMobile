import Vue from 'vue'
import Vuex from 'vuex'
import scouting from './modules/scouting'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        scouting
    },
})
