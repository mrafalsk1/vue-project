<template>
  <div>
    <div v-if="role=='prest'">
      <prest />
    </div>
    <div v-if="role=='user'">
      <cabecalho />
    </div>
    <div v-if="role=='adm'">
      <adm />
    </div>
    <div v-if="role == 'user'" class="container-fluid">
      <div class="titulo">
        <h1>Categorias</h1>
      </div>
      <div class="row presta container">
        <div
          v-for="categoria in categorias"
          v-bind:key="categoria._id"
          class="col-xl-3 col-md-6 esp"
        >
          <router-link :to="'/servico/solicitar?categoria=' + categoria.categoria">
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
    <div v-if="role == 'prest'">
      <div class="titulo">
        <h1>Serviços Pendentes</h1>
      </div>
      <div class="row presta container">
        <div v-for="(servico,i) in servicos" v-bind:key="servico._id" class="col-xl=-2 col-md6 esp mar">
          <div class="card card-stats prest">
            <div class="card-body">
              <div
                @click="expandir(servico._id)"
                style="border-bottom:1px solid #bbbbbb80;padding-bottom:1.25rem"
              >
                <h3>{{ servico.assunto }}</h3>
                <span class="txt">Contato: {{ servico.contato }}</span>
                <br />
                <span class="txt">Endereco: {{ servico.endereco }}</span>
                <br />
                <span class="txt">Data: {{ servico.data_inicio }}</span>
                <br />
                <span class="txt">Descrição: {{ servico.descricao}}</span>
                <br />
              </div>
              <div style="padding-top:1.25rem">
                <button
                  type="button"
                  @click="aceitar(servico._id,i)"
                  class="btn btn-success pop"
                >Aceitar</button>
                <button
                  type="button"
                  class="btn btn-danger pop"
                  @click="recusar(servico._id,i)"
                >Recusar</button>
              </div>
            </div>
          </div>
          <div v-if="expand" style="background-color:white;float:rigth;text-center:end">
            <button class="btn btn-primary" @click="expand=false" style="text-center:end;">X</button>
            <input type="text" class="form form-control" :value="servico.descricao" />
          </div>
        </div>
        <div class="centerx">
          <vs-popup
            classContent="popup-example"
            title="Serviço"
            class="row"
            :active.sync="popupActivo2"
            icon-close="  X  "
          >
            <div v-html="text" ref="popup"></div>
          </vs-popup>
        </div>
      </div>
    </div>
    <div class="container" style="display:flex;justify-content:center;">
      <div v-if="!servicos[0] && role == 'prest'" style="margin:auto 0;color:white;width:45%;">
        <div class="card card-stats prest" style="background-color:red">
          <div class="card-body">Não há Nenhum Serviço Pendente</div>
        </div>
      </div>
    </div>
  </div>
</template>
      <script src="https://unpkg.com/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/vuesax"></script>
<script>
import "font-awesome/css/font-awesome.css";
import router from "../router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import headerUser from "./headerUser";
import headerPrestr from "./headerPrest";
import headerAdm from "./headerAdm";
import http from "../services/http";
import storage from "../services/storage";
import moment from "moment";
import "vuesax/dist/vuesax.css";
axios.defaults.baseURL = "http://localhost:3000";
export default {
  created() {
    console.log(this.snack);

    console.log("alo2");
    console.log(storage.getItem("user_nome"));

    let role = storage.getItem("role");
    console.log(role);
    this.role = role;

    let user = storage.getItem("user_id");

    this.user = user;
    console.log("aa" + user);
    if (role == "user") {
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
          if (response.data[0].roles.roles[0]) {
            this.user = response.data[0].roles.roles[0];
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
    }
    if (role == "prest") {
      http.instance
        .get("/servico", {
          params: {
            prestador: this.user
          }
        })
        .then(response => {
          console.log(response);

          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
            element.data_inicio = moment(element.data_inicio).format(
              "DD/MM/YYYY"
            );
            this.$set(this.servicos, index, element);
            console.log(this.servicos);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  name: "Dashboard",
  data: function() {
    return {
      categorias: [],
      user: "",
      role: "",
      servicos: [],
      usuarios: [],
      popupActivo2: false,
      expand: false,
      popup: "",
      text: null,
      idservico: ""
    };
  },
  methods: {
    aaa() {
      let token = window.localStorage.getItem("token");
      let nome = window.localStorage.getItem("nome");
      console.log("alo " + nome);
      console.log(token);
    },
    expandir(id) {
      console.log(this.$refs.popup);
      for (let i = 0; i < this.servicos.length; i++) {
        const element = this.servicos[i];
        if (element._id == id) {
          this.text = this.$refs.popup.innerHTML;
          console.log(element);
                  this.text =
            '<h6 class="lbl"><span class="label label-default lbl">Assunto:</span></h6><textarea name="assunto" rows="1" class="form-control" readonly>' + element.assunto + "</textarea>" +
            '<h6 class="lbl"><span class="label label-default lbl">Endereço:</span></h6><input name="endereco" class="form-control" value=' +
            element.endereco +
            ' readonly><h6 class="lbl"><span class="label label-default lbl">Contato:</span></h6><input class="form-control" value=' +
            element.contato +
            ' readonly><h6 class="lbl"><span class="label label-default lbl">Data:</span></h6><input class="form-control" value=' +
            element.data_inicio +
            ' readonly><h6 class="lbl"><span class="label label-default lbl">Descrição:</span></h6><textarea class="form-control" id="exampleFormControlTextarea1" cols="80" rows="3" readonly>' +
            element.descricao +
            "</textarea>";
        }
      }
      console.log(this.$refs.popup);
      this.popupActivo2 = true;
    },
    prestadores() {
      console.log("alo");

      router.push("/prestadores");
    },
    aceitar(id, i) {
      console.log();
      let d = new Date();
      let data = {
        id: id,
        data_conf: d
      };
      http.instance
        .patch("/servico/aceitar", {
          data
        })
        .then(response => {
          console.log(response);
          this.servicos.splice(i, 1);
          var x = document.getElementById("snackbar");
          x.innerHTML = "Serviço Aceito";
          console.log(response);
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
        })
        .catch(error => {
          console.log();
        });
    },
    recusar(id,i) {
      console.log(id);
      let d = new Date();
      let data = {
        id: id
      };
      http.instance
        .delete("/servico/recusar", {
          data
        })
        .then(response => {
          console.log(response);
          this.servicos.splice(i, 1);
          var x = document.getElementById("snackbar");
          x.innerHTML = "Serviço Removido";
          console.log(response);
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
        })
        .catch(error => {
          console.log();
        });
    }
  },
  components: {
    cabecalho: headerUser,
    adm: headerAdm,
    prest: headerPrestr
  }
};
</script>
<style scoped>
body {
  background-color: white;
}
.esp {
  margin-bottom: 20px;
}
.mar {
  margin-right: 4%;
}
.txt {
  overflow: hidden;
  white-space: nowrap;
  margin: 15px;
}
.card {
  margin-right: 1%;
  border: 2px solid white;
  background-color: unset;
  color: white;
}
.prest {
  margin-right: 1%;
  background-color: unset;
  color: white;
  padding: unset;
  min-width: 500px;
  min-height: 100px;
  max-width: 250px;
  overflow: hidden;
}
.lbl {
  margin-top: 5px;
}
a {
  text-decoration: none;
}
.card-body {
  padding: 0;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.titulo {
  color: white;
  margin-bottom: 2%;
}
.presta {
  margin: auto;
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
  float: right;
}
</style>>