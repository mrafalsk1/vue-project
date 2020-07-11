<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="navbar-brand" to="/dashboard">Home <i class="fa fa-home" aria-hidden="true"></i>  </router-link>
          </li>
          <li class="nav-item active">
            <router-link class="navbar-brand" to="/servico/solicitar">Solicitar Serviço  <i class="fa fa-list" aria-hidden="true"></i></router-link>
          </li>
          <li class="nav-item">
            <router-link class="navbar-brand" to="/servico/avaliar">Avaliar <i class="fa fa-star" aria-hidden="true"></i></router-link>
          </li>
        </ul>

        <div class="dropdown">
          <button
            type="button"
            class="btn bt btn-secondary"
            data-toggle="dropdown"
            aria-haspopup="false"
            aria-expanded="true"
          >
           
            {{ nome }}  <i class="fa fa-user-o" aria-hidden="true"></i>
          </button>

          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/">Logout</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
        
        
        
<script src="https://kit.fontawesome.com/a076d05399.js%22%3E"></script>
<script>
import storage from "../services/storage";
import "font-awesome/css/font-awesome.css";
export default {
  created() {
    this.nome = storage.getItem("user_nome");
  },
  data: function() {
    return {
      nome: ""
    };
  }
};
</script>

<style>
.header {
  margin-bottom: 1%;
}
.dropdown {
  margin-right: 5%;
}

.navbar-brand:hover {
  border-radius: 0.25rem;
  background-color: #5a6268;
  border-color: #545b62;
  
}
.navbar-brand {
  padding: 0.375rem 0.75rem;
  font-size: 1.1rem
}
.bt {
  background-color: #343a40;
  color: white;
  border-color: #343a40;
}
.fa {
  font-size: 18px;
}
</style>