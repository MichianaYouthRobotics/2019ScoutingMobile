import Vue from 'nativescript-vue'
import App from './views/App'
import store from './store/store'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
//
// TNSFontIcon.debug = true;
// TNSFontIcon.paths = {
//   'fa': '@/styles/font-awesome.css',
// };
// TNSFontIcon.loadCss();
//
// Vue.filter('fonticon', fonticon);

import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import RadDataFormPlugin from 'nativescript-ui-dataform/vue';

Vue.use(RadDataFormPlugin);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
