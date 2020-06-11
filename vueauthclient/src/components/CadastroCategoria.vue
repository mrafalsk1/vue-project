<template>
  <div>
    <div class="container">
      <form v-on:submit.prevent="cadastrar" autocomplete="off">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="white">Cadastro Categoria</h2>
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
            <button type="submit" class="btn btn-outline-danger btn-lg">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import http from "../services/http";
import router from "../router";
export default {
  name: "CadastroCategoria",
  data: function() {
    return {
      nome: ""
    };
  },
  methods: {
    cadastrar() {
      if (this.nome == "") {
        var x = document.getElementById("snackbar");
        x.innerHTML = "Categoria inválida";
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
        return;
      }
      let data = {
        nome: this.nome
      };
      console.log(data);

      http.instance
        .post("/categoria", data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          var x = document.getElementById("snackbar");
           x.innerHTML = "Sem permissão";
          if (error.response.status == 401) {
            x.innerHTML = 'Unauthorized'
            router.push("/");
          }
         
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
input {
  margin: 0 auto;
}
.form-control {
  width: 40%;
}
h2 {
  margin-bottom: 25px;
  color: white;
}
.container {
  margin-top: 10%;
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
</style>