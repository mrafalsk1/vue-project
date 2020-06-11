<template>
  <div>
    <cabecalho />
    <div v-if="user == 'user'" class="container-fluid">
      <div class="titulo">
        <h1>Serviços Prestados</h1>
      </div>
      <div class="row">
        <div
          v-for="categoria in categorias"
          v-bind:key="categoria._id"
          class="col-xl-2 col-md-6 esp"
        >
          <router-link to="/prestadores">
            <div class="card card-stats">
              <div class="card-body">
                {{ categoria.categoria }}
                <br />
                {{ categoria.quantidade }}
              </div>
            </div>
          </router-link>
        </div>
        
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import header from './header'
import http from "../services/http";
import storage from "../services/storage";
axios.defaults.baseURL = "http://localhost:3000";
export default {
  created() {
    console.log('alo2');
    
    let user = storage.getItem('user')
    
    this.user = user
    console.log(user);
    
    http.instance
      .get("/categoria", {})
      .then(response => {
        console.log(response);
        
        if (response.status == 401) {
          console.log("oshi");

          route.push("/");
        }

        if (!http.verify(response)) {
          console.log("passo aqui fio");

          route.push("/");
        }
        console.log(response.data[0].roles.roles[0]);
        console.log(response.data[0].categoria);
        if(response.data[0].roles.roles[0]) {
          this.user = response.data[0].roles.roles[0]
        }

        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
          this.$set(this.categorias, index, element);
        }
      })
      .catch(errors => {
        console.log(errors);
        if (errors.response.status == 401) {
          router.push("/");
        }
        
      });
  },
  name: "Dashboard",
  data: function() {
    return {
      categorias: [],
      user:'',
      role: ''
    };
  },
  methods: {
    aaa() {
      let token = window.localStorage.getItem("token");
      let nome = window.localStorage.getItem("nome");
      console.log("alo " + nome);
      console.log(token);
    },
    prestadores() {
      console.log("alo");

      router.push("/prestadores");
    }
  },
  components: {
    'cabecalho' : header
  }
};
</script>
<style>
body {
  background-color: white;
}
.esp {
  margin-bottom: 20px;
}
.titulo {
  color: white;
  margin-bottom: 2%;
}
th {
  color: white;
}
td {
  color: white;
}
.card:hover {
    background-color: #0b399461;
}
.user {
  float: right
}
</style>>