<template>
  <div>
    <cabecalho />
    <div class="row">
      <div class="col-2">
        <select v-model="selected" @change="listar" class="form-control">
          <option value selected disabled>Please select</option>
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
          title="Endereço"
          class='row'
          :active.sync="popupActivo2"
        >
        <form v-on:submit="cadastrar" >
          <input class="inputx form form-control" placeholder="Endereço" v-model="endereco" />
          <input class="inputx form form-control" placeholder="Contato" v-model="contato" />
          <input type='hidden' :value="pId">
          <button type='submit' class='btn btn-success pop'>Confirmar</button>
          <button  @click="popupActivo2=false" class='btn btn-danger pop'>Cancelar</button>
        </form>
        </vs-popup>
      </div>
      <div class="col-sm-2 card card-stats" v-for="p in prestadores" v-bind:key="p._id">
        <div class="card-body">
          <div class="divider">
            <span class="card-subtitle">Nome: {{ p.nome }}</span>
            <br />
            <span class="card-subtitle">Cnpj: {{ p.cnpj }}</span>
            <br />
            <span class="card-subtitle last">Telefone: {{ p.telefone }}</span>
          </div>
          <div class="btn">
            <button type="button" @click="popupActivo2=true;pId=p._id" class="btn btn-success">Contratar</button>
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
import header from "./header";
import http from "../services/http";
import dropdown from "vue-dropdowns";
import "bootstrap";
import vSelect from "vue-select";
import router from "../router";
import "vue-select/dist/vue-select.css";
import VueDropdown from "vue-dynamic-dropdown";
import "vuesax/dist/vuesax.css";
export default {
  name: "SolicitarServico",
  created() {
    http.instance.get("/categorias").then(response => {
      console.log(response.data.usuario);
      this.user = response.data.usuario
      for (let index = 0; index < response.data.categorias.length; index++) {
        const element = response.data.categorias[index];
        // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
        this.$set(this.options, index, element);
      }
    });
  },
  data: function() {
    return {
      options: [],
      selected: "",
      prestadores: [],
      popupActivo2: false,
      value1: "",
      pId: '',
      endereco: '',
      user: '',
      contato: ''
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
          console.log(response);
          this.user = response.data.usuario._id
          for (let index = 0; index < response.data.response.length; index++) {
            const element = response.data.response[index];
            // <tr v-for="usuario in usuarios" v-bind:key="usuario._id">
            this.$set(this.prestadores, index, element);
          }
        });
    },
    cadastrar() {
      console.log(this.pId);
      console.log(this.endereco);
      this.popupActivo2 = false;
      console.log(this.user);
      let data = {
        'usuario_id':this.user,
        'prestador_id':this.pId,
        'endereco':this.endereco,
        'contato':this.contato
      }
      console.log(data);
      
      http.instance.post('/servico',data).then(response => {
        console.log(response);
        
      }).catch(error => {
        console.log(error);
        
      })
      
    }
  },
  components: {
    "v-select": vSelect,
    cabecalho: header,
    dropdown: dropdown,
    "vue-dropdown": VueDropdown
  }
};
</script>

<style scoped>
.card {
  margin-right: 1%;
  border: 2px solid white;
  background-color: unset;
  color: white;
  padding: unset;
}
.alo {
  padding-bottom: 1.25rem;
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
</style>>
