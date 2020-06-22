<template>
  <div id="login">
    <div class="container">
      <h1>Login</h1>
      <form v-on:submit="login" autocomplete="off">
        <input
          class="form form-control"
          type="email"
          placeholder="Email"
          name="email"
          v-model="email"
          id="email"
        />
        <br />
        <input
          placeholder="Senha"
          class="form form-control"
          type="password"
          id="senha"
          v-model="senha"
          name="password"
        />
        <br />
        <div class="row under">
          <div class="col-9" style="padding-right:0px;">
            <router-link
              to="/cadastro"
              style="font-size:12px;margin:0 auto;"
            >Cadastre-se como Usuário</router-link>
            <br />
            <router-link
              to="/cadastro/prestador"
              style="padding-left:15px;font-size:12px;margin:0 auto;"
            >Cadastre-se como Prestador</router-link>
          </div>
        </div>
        <div class="row under" style="padding-top:15px;">
          <button class="btn btn-primary btn-lg" type="submit">Login</button>
        </div>
      </form>
      <div id="snackbar" class="snackbar">alo</div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import storage from "../services/storage";
import http from "../services/http";
import topbarguest from "./Topbarguest";
export default {
  name: "Login",
  created() {
    storage.remove();
  },
  data: function() {
    return {
      email: "",
      senha: "",
      path: "http://localhost:8080/Cadastro"
    };
  },
  components: {
    topbarguest
  },
  methods: {
    login: e => {
      e.preventDefault();
      let login = () => {
        let data = {
          email: email.value,
          senha: senha.value
        };

        http.instance
          .post("/login", data)
          .then(response => {
            console.log("Logged in" + response.data.usuario);
            storage.setToken(response.data.token);
            storage.setItem("user_id", response.data.usuario.id);
            storage.setItem("user_nome", response.data.usuario.nome);
            storage.setItem("role", response.data.usuario.roles);
            console.log(storage.getToken("token"));
            http.setHeader();
            router.push("/dashboard");
          })
          .catch(errors => {
            console.log("Cannot log in" + errors);
            var x = document.getElementById("snackbar");
            x.innerHTML = errors.response.data.message;
            x.className = "show";
            setTimeout(function() {
              x.className = x.className.replace("show", "");
            }, 3000);
          });
      };
      login();
    },
    redirect: e => {
      e.preventDefault();
      router.push("Cadastro");
    }
  }
};
</script>
<style scoped>
.under {
  padding-right: 15px;
  padding-left: 15px;
}
.form-control {
  width: 40%;
}
.text-center {
  text-align: center;
}
input {
  margin: 0 auto;
}
body {
  background-image: url("http://127.0.0.1:8887/login.png");
  background-repeat: no-repeat, repeat;
}
.text-center {
  text-align: center;
  margin-left: 25px;
}
a {
  font-size: 14px;
  margin-left: -60%;
}
h1 {
  color: white;
  padding-bottom: 25px;
}
.container {
  margin-top: 10%;
}
button {
  margin: 0 auto;
}
</style>>