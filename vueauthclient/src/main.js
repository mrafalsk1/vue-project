// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './services/http'
import storage from './services/storage'
import Vuesax from "vuesax";
Vue.config.productionTip = false
Vue.prototype.$http = http;

/* eslint-disable no-new */
Vue.use(Vuesax)
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

