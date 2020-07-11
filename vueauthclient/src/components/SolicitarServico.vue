<template>
  <div>
    <div>
      <cabecalho />
    </div>
    <div class="row">
      <div style="margin-right:20px;" class="col-2">
        <select v-model="selected" @change="listar" class="form-control">
          <option value selected disabled>Por favor Selecione</option>
          <option
            v-for="option in options"
            v-bind:key="option._id"
            :value="option"
          >{{ option.nome }}</option>
        </select>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          title="Informações"
          class="row"
          :active.sync="popupActivo2"
        >
          <form v-on:submit.prevent="cadastrar">
            <input class="inputx form form-control" placeholder="Assunto" v-model="assunto" />
            <input class="inputx form form-control" placeholder="Endereço" v-model="endereco" />
                        <the-mask
              placeholder="Contato"
              v-model="contato"
              :masked="true"
              class="form form-control inputx"
              :mask="['(##) ####-####', '(##) #####-####']"
            />
            <textarea class="inputx form form-control" placeholder="Descrição" v-model="descricao" />
            <input type="hidden" :value="pId" />
            <button type="submit" class="btn btn-success pop">Confirmar</button>
            <button type="button" @click="popupActivo2=false" class="btn btn-danger pop">Cancelar</button>
          </form>
        </vs-popup>
      </div>
      <div class="col-sm-2 card card-stats" v-for="(p,i) in prestadores" v-bind:key="p._id">
        <div class="card-body">
          <div class="divider">
            <div class="stars card-subtitle" v-if="prestadores[i].media != -1">
              <star-rating
                style="display:block;margin-top:3px;"
                :show-rating="false"
                border-color="#000000"
                text-class="stars"
                v-bind:read-only="true"
                class="inline"
                :inline="true"
                v-bind:star-size="25"
                v-model="prestadores[i].media"
              ></star-rating>
            </div>
            <h5 v-if="prestadores[i].media == -1">Sem avaliação</h5>
            <span class="txt card-subtitle">Nome: {{ p.prestador.nome.split(' ')[0] }}</span>
            <br />
            <span class="txt card-subtitle">Cnpj: {{ p.prestador.cnpj }}</span>
            <br />
            <span class="txt card-subtitle last">Telefone: {{ p.prestador.telefone }}</span>
          </div>
          <div class="btn">
            <button
              type="button"
              @click="popupActivo2=true;pId= p.prestador._id"
              class="btn btn-success"
            >Contratar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <v-select class="form-control" :options="options"></v-select> -->
  </div>
</template>
      <script src="https://unpkg.com/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/vuesax"></script>
<script>
import headerUser from "./headerUser";
import http from "../services/http";
import dropdown from "vue-dropdowns";
import "bootstrap";
import vSelect from "vue-select";
import router from "../router";
import "vue-select/dist/vue-select.css";
import VueDropdown from "vue-dynamic-dropdown";
import "vuesax/dist/vuesax.css";
import storage from "../services/storage";
import StarRating from "vue-star-rating";
export default {
  name: "SolicitarServico",
  created() {
    console.log(storage.getItem("user_id"));
    this.user = storage.getItem("user_id");
    http.instance.get("/categorias").then(response => {
      console.log(response.data.usuario);
      this.user = response.data.usuario;
      for (let index = 0; index < response.data.categorias.length; index++) {
        const element = response.data.categorias[index];
        // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
        this.$set(this.options, index, element);
      }
    });
    if (this.$route.query.categoria) {
      let data = {
        nome: this.$route.query.categoria
      };

      this.selected = data;
      console.log(this.selected);

      http.instance
        .get("/prestador", {
          params: {
            categoria: this.selected.nome
          }
        })
        .then(response => {
          console.log(response.data);
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
            this.$set(this.prestadores, index, element);
          }
          this.prestadores.sort((a, b) =>
            a.media > b.media ? 1 : b.media > a.media ? -1 : 0
          );
          console.log(this.prestadores.reverse());
        });
    }
  },
  data: function() {
    return {
      options: [],
      selected: "",
      prestadores: [],
      popupActivo2: false,
      value1: "",
      pId: "",
      endereco: "",
      user: "",
      contato: "",
      descricao: "",
      assunto: "",
      estrelas: []
    };
  },
  methods: {
    listar() {
      console.log(this.prestadores == null);
      this.prestadores = [];

      console.log("veio");
      console.log(this.selected.nome);

      http.instance
        .get("/prestador", {
          params: {
            categoria: this.selected.nome
          }
        })
        .then(response => {
          console.log(response.data);
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">

            this.$set(this.prestadores, index, element);
          }
          this.prestadores.sort((a, b) =>
            a.media > b.media ? 1 : b.media > a.media ? -1 : 0
          );
          console.log(this.prestadores.reverse());
        });
    },
    cadastrar() {
      console.log(this.pId);
      console.log(this.endereco);
      this.popupActivo2 = false;
      console.log(this.user);
      let data = {
        usuario_id: storage.getItem("user_id"),
        prestador_id: this.pId,
        endereco: this.endereco,
        contato: this.contato,
        descricao: this.descricao,
        assunto: this.assunto
      };
      console.log(data);

      http.instance
        .post("/servico", data)
        .then(response => {
          var x = document.getElementById("snackbar");
          x.innerHTML = "Serviço solicitado";
          console.log(response);
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
          this.endereco = "";
          this.contato = "";
          this.descricao = "";
          this.assuntp = "";
        })
        .catch(error => {
          console.log("bom ida");

          var x = document.getElementById("snackbar");
          x.innerHTML = error.data.message;
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
        });
    }
  },
  components: {
    "v-select": vSelect,
    cabecalho: headerUser,
    dropdown: dropdown,
    "vue-dropdown": VueDropdown,
    StarRating
  }
};
</script>

<style scoped>
.inputx {
  margin-bottom: 10px;
}
.card {
  margin-left: 1%;
  border: 2px solid white;
  background-color: unset;
  color: white;
  padding: unset;
  margin-bottom: 1%;
}
.txt {
  overflow: hidden;
  margin: 15px;
}
.alo {
  padding-bottom: 1.25rem;
}
.stars {
  display: block !important;
  margin-bottom: 10px;
  margin-left: 31%;
}
.row {
  margin-right: 0;
}
.card-body {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.divider {
  border-bottom: 1px solid white;
  padding-bottom: 1.25rem;
}
.pop {
  margin-top: 5px;
}
.vue-star-rating {
  display: block !important;
}
</style>>
