// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './services/http'
import storage from './services/storage'
import Vuesax from "vuesax";
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import Snotify from 'vue-snotify';
Vue.config.productionTip = false
Vue.prototype.$http = http.instance;
http.instance.defaults.timeout = 1000
/* eslint-disable no-new */
http.instance.interceptors.request.use(
  config => {
    const token = storage.getItem("token");
    if (token) {
      config.headers.common["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
http.instance.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
    if (error.response.status) {
      switch (error.response.status) {
      
        case 401:
          alert('Sem autorização')
          router.replace({
            path:'/',
            query: { redirect: router.currentRoute.fullPath }
          })
          break;
        case 403:
          alert('Sem permissão')
          router.go(-1)
           break;
        case 404:
          alert('page not exist');
          break;
        case 502:
         setTimeout(() => {
            router.replace({
              path: "/",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
Vue.use(Vuesax)
Vue.use(VueTheMask)
Vue.use(Snotify)
Vue.use(money, {precision: 4})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

  /*methods: {
    enableInterceptor() {
      http.instance.interceptors.response.use(
        response => {
          if (response.status === 200 || response.status === 201) {
            console.log('da o papo');
            
            return Promise.resolve(response);
          } else {
            return Promise.reject(response);
          }
        },
      error => {
          if (error.response.status) {
            switch (error.response.status) {
              case 400:
               
               //do something
                break;
            
              case 401:
                alert("session expired");
                break;
              case 403:
                router.replace({
                  path: "/login",
                  query: { redirect: router.currentRoute.fullPath }
                });
                 break;
              case 404:
                alert('page not exist');
                break;
              case 502:
               setTimeout(() => {
                  router.replace({
                    path: "/login",
                    query: {
                      redirect: router.currentRoute.fullPath
                    }
                  });
                }, 1000);
            }
            return Promise.reject(error.response);
          }
        }
      );
    }
  }*/
})

