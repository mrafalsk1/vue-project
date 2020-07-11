<template>
  <div>
    <div class="container">
      <form v-on:submit.prevent="cadastrar" autocomplete="off">
        <div class="margin-10">
          <div class="col-12 text-center">
            <h2 class="white">Cadastro</h2>
          </div>
          <div class="col-12 text-center">
            <input
              type="text"
              placeholder="Nome"
              v-model="nome"
              id="nome"
              class="form form-control"
            />
          </div>
          <div class="col-12 text-center">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              id="email"
              class="form form-control"
            />
          </div>
          <div class="col-12 text-center">
            <the-mask
              class="form form-control"
              placeholder="CNPJ"
              v-model="cnpj"
              :masked="true"
              :mask="['###.###.###-##', '##.###.###/####-##']"
            />
          </div>
          <div class="col-12 text-center">
            <the-mask
              placeholder="Telefone"
              v-model="telefone"
              :masked="true"
              class="form form-control"
              :mask="['(##) ####-####', '(##) #####-####']"
            />
          </div>
          <div class="col-12 text-center">
            <input
              type="password"
              v-model="senha"
              placeholder="Senha"
              id="senha"
              class="form form-control"
            />
          </div>
          <div class="col-12 text-center">
            <input
              type="password"
              v-model="senhaconfirm"
              placeholder="Confirmar Senha"
              class="form form-control"
              id="senhaconfirm"
            />
          </div>
          <div id="example-3">
            <label>Assinale os serviços prestados</label>
            <br />
            <div class="row" style="text-align:end">
              <div class="col-2" v-for="{nome,_id} in categorias" v-bind:key="_id">
                <label style>{{ nome }}</label>
                <input
                  style=" margin-top:6px;margin-left:6px;"
                  type="checkbox"
                  :value="nome"
                  v-model="servicos"
                />
              </div>
            </div>
          </div>
          <div class="col-12 text-center">
            <button type="submit" class="btn btn-outline-danger btn-lg">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
    <div id="snackbar" class="snackbar">alo</div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import http from "../services/http";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
axios.defaults.baseURL = "http://localhost:3000";
export default {
  name: "Cadastro",
  created() {
    http.instance
      .get("/categorias")
      .then(response => {
        console.log(response.data);
        console.log(response.data.categorias[0]);
        console.log(response.data.categorias.length);

        for (let index = 0; index < response.data.categorias.length; index++) {
          const element = response.data.categorias[index];
          // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
          console.log(element);

          this.$set(this.categorias, index, element);
        }
        console.log(this.categorias);
      })
      .catch(errors => {
        console.log(errors);
      });
  },
  data: function() {
    return {
      servicos: [],
      email: "",
      senha: "",
      senhaconfirm: "",
      cnpj: "",
      nome: "",
      categorias: [],
      telefone: ""
    };
  },
  methods: {
    cadastrar() {
      if (senha.value != senhaconfirm.value) {
        var x = document.getElementById("snackbar");
        x.innerHTML = "As senhas devem ser as mesmas";
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
        return;
      }
      let data = {
        email: this.email,
        senha: this.senha,
        nome: this.nome,
        cnpj: this.cnpj,
        servicos: this.servicos,
        roles: ["prest"],
        telefone: this.telefone
      };
      http.instance
        .post("/cadastrar/prestador", data)
        .then(response => {
          router.push("/");
        })
        .catch(errors => {
          console.log("Cannot log in" + errors.data.message);
          var x = document.getElementById("snackbar");
          x.innerHTML = 'Falta coisa ai';
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
        });
    }
  }
};
</script>
<style scoped>
.bg-white {
  background-color: white;
  width: 50px;
}
label {
  color: white;
}
.btn-outline-danger {
  color: #cf5bff;
  border-color: #ca3dc5;
  margin-top: 20px;
}
.btn-outline-danger:hover {
  background-color: #cf5bff;
  color: white;
}
.margin-10 {
  margin-top: 10%;
}
.text-center {
  text-align: center;
  margin-bottom: 20px;
}
input {
  margin: 0 auto;
}
.form-control {
  text-align: center;
  justify-content: center;
  width: 40%;
}
.text-center {
  text-align: center;
}
.white {
  color: white;
}
#example-3 {
  margin: auto;
}
</style>
