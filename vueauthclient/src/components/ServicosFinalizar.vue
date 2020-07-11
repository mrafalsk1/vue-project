<template>
  <div>
    <div>
      <prest />
      <div class="titulo">
        <h1>Serviços em Andamento</h1>
      </div>
      <div v-if="servicos.lenght == 0">
        <p>dsadasdas</p>
        <p></p>
      </div>
      <div class="row presta container">
        <div
          v-for="(servico,i) in servicos"
          v-bind:key="servico._id"
          class="col-xl=-2 col-md6 esp alo"
        >
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
              <div
                style="padding-top:1.25rem; margin: 0 auto;margin-left:24%;margin-right:24%;max-height:232px;"
                class="row"
              >
                <money
                  style="margin-top:0px;margin-right:1%;"
                  class="form form-control"
                  v-model="valor[i]"
                  v-bind="money"
                ></money>
                <button
                  type="button"
                  @click="finalizar(servico._id,i)"
                  class="btn btn-success pop"
                >Finalizar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          title="Serviço"
          class="row"
          :active.sync="popup"
          icon-close="  X  "
        >
          <div v-html="text" ref="popup"></div>
        </vs-popup>
      </div>
    </div>
    <div class="container" style="display:flex;justify-content:center">
      <div v-if="!servicos[0]" style="margin:auto 0;color:white;width:45%;">
        <div class="card card-stats prest" style="background-color:red">
          <div class="card-body">Não há Nenhum Serviço Em aguardo</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerPrestr from "./headerPrest";
import http from "../services/http";
import dropdown from "vue-dropdowns";
import "bootstrap";
import vSelect from "vue-select";
import router from "../router";
import "vue-select/dist/vue-select.css";
import VueDropdown from "vue-dynamic-dropdown";
import "vuesax/dist/vuesax.css";
import storage from "../services/storage";
import moment from "moment";
import "vuesax/dist/vuesax.css";
export default {
  name: "ServicosAceitos",
  created() {
    http.instance
      .get("/servico/aceitos", {
        params: {
          prestador: storage.getItem("user_id")
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
          this.$set(this.valor, index, 0);
          console.log(this.servicos);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  data: function() {
    return {
      servicos: [],
      valor: [],
      popup: false,
      text: null,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    finalizar(id, i) {
      console.log();
      let d = new Date();
      var x = document.getElementById("snackbar");
      if (this.valor[i] == 0.0) {
        x.innerHTML = "Valor é obrigatório";
        x.className = "show";
        setTimeout(function() {
          x.className = x.className.replace("show", "");
        }, 3000);
        return;
      }
      let data = {
        id: id,
        data_fim: d,
        valor: this.valor[i]
      };

      http.instance
        .patch("/servico/finalizar", {
          data
        })
        .then(response => {
          console.log(response);
          this.servicos.splice(i, 1);
          x.innerHTML = "Serviço Finalizado";
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
    expandir(id) {
      console.log(this.$refs.popup);
      for (let i = 0; i < this.servicos.length; i++) {
        const element = this.servicos[i];
        if (element._id == id) {
          this.text = this.$refs.popup.innerHTML;
          console.log(element);
          this.text =
            '<h6 class="lbl"><span class="label label-default lbl">Assunto:</span></h6><textarea name="assunto" rows="1" class="form-control" readonly>' +
            element.assunto +
            "</textarea>" +
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
      this.popup = true;
    }
  },
  components: {
    prest: headerPrestr
  }
};
</script>
<style scoped>
.card {
  margin-right: 1%;
  border: 2px solid white;
  background-color: unset;
  color: white;
}
.alo {
  margin: auto;
  margin-bottom: 5%;
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
.txt {
  overflow: hidden;
  white-space: nowrap;
  margin: 15px;
}
.form-control {
  width: 50%;
  margin-top: 5px;
}
</style>