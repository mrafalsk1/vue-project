<template>
  <div>
    <div class="container">
      <form v-on:submit="cadastrar" autocomplete="off">
        <div class="row">
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
            <input
              type="text"
              v-model="telefone"
              placeholder="Telefone"
              class="form form-control"
              id="telefone"
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
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
axios.defaults.baseURL = "http://localhost:3000";
export default {
  name: "Cadastro",
  data: function() {
    return {
      email: "",
      senha: "",
      senhaconfirm: "",
      nome: "",
      telefone: ""
    };
  },
  methods: {
    cadastrar: e => {
      e.preventDefault();

      let cadastrar = () => {
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
          email: email.value,
          senha: senha.value,
          nome: nome.value,
          roles: ["user"]
        };
        console.log("alo");

        axios
          .post("/cadastrar", data)
          .then(response => {
            console.log(response);
            router.push("/");
          })
          .catch(errors => {
            console.log("Cannot log in" + errors.response.data.message);
            var x = document.getElementById("snackbar");
            x.innerHTML = errors.response.data.message;
            x.className = "show";
            setTimeout(function() {
              x.className = x.className.replace("show", "");
            }, 3000);
          });
      };
      cadastrar();
    }
  }
};
</script>
<style scoped>
.bg-white {
  background-color: white;
  width: 50px;
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
.row {
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
</style>
