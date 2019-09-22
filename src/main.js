// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

/*使用iview*/
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})


var axiosInstance = axios.create({
  baseURL: location.protocol + '//localhost:9091/',
  transformRequest: function (data) {
    return Qs.stringify(data)
  },
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

Vue.use(VueAxios, axiosInstance)

Vue.config.productionTip = false

/*
 this.axios.post('admin/login', {
          'user_name': 'admin',
          'user_pwd': 'admin'
        }).then(res => {
          //res.data do something right
        }).catch(res => {
          //do something wrong
        })

 this.axios.get('/admin')
        .then(res => {
          console.log(res.data)
        })
        .catch(res => {
          console.log(res.data)
        })

 */
