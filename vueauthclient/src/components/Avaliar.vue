<template>
  <div>
    <headerUser />
    <div class="titulo">
      <h1>Avaliação</h1>
    </div>
    <div class="row presta container">
      <div v-for="(servico, i) in servicos" v-bind:key="servico._id" class="col-xl=-2 col-md6 esp">
        <div class="card card-stats prest">
          <div class="card-body">
            <div
              @click="expandir(servico._id)"
              style="border-bottom:1px solid #bbbbbb80;padding-bottom:1.25rem;max-height:232px;"
            >
              <h4 class="txt">{{ servico.assunto}}</h4>
              <span class="txt">Contato: {{ servico.contato }}</span>
              <br />
              <span class="txt">Endereco: {{ servico.endereco }}</span>
              <br />
              <span class="txt">Data da solicitação: {{ servico.data_inicio }}</span>
              <br />
              <span class="txt">Data de confirmação: {{ servico.data_conf }}</span>
              <br />
              <span class="txt">Data de Finalização: {{ servico.data_fim }}</span>
              <br />
              <span class="txt">Descrição: {{ servico.descricao}}</span>
              <br />
              <span class="txt">Valor: {{ servico.valor }}</span>
            </div>
            <span class="txt" style="font-size:24px">Avaliação</span>
            <div style="margin: 0 auto;margin-left:24%;margin-right:24%" class="row">
              <div class="stars">
                <star-rating
                  v-bind:star-size="20"
                  v-model="stars[i].stars"
                  @rating-selected="setRating(servico._id,i)"
                ></star-rating>
              </div>
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
</template>
<script>
import router from "../router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import headerUser from "./headerUser";
import http from "../services/http";
import storage from "../services/storage";
import moment from "moment";
import Rating from "v-rating";
import Rate from "vue-rate";
import StarRating from "vue-star-rating";
import { VueStars } from "vue-stars";
import "vuesax/dist/vuesax.css";
export default {
  name: "Avaliar",
  created() {
    //@rating-selected="setRating(servico._id)"
    http.instance
      .get("/servico/avaliar", {
        params: {
          user: storage.getItem("user_id")
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
          element.data_conf = moment(element.data_conf).format("DD/MM/YYYY");
          element.data_fim = moment(element.data_fim).format("DD/MM/YYYY");
          this.$set(this.servicos, index, element);
          console.log(this.servicos);
        }
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          let data = {
            id: element._id,
            stars: element.avaliacao
          };
          this.$set(this.stars, index, data);
        }
      })
      .catch(error => {
        console.log(error);
      });

    $(".txt").hide();
  },
  data: function() {
    return {
      stars: [],
      servicos: [],
      rating: 0,
      popup: false,
      text: null,
    };
  },
  methods: {
    setRating: function(id, i) {
      let d = new Date();
      let data = {
        id: id,
        avaliacao: this.stars[i].stars
      };
      console.log(this.stars[i].stars);

      http.instance
        .patch("/servico/avaliar", {
          data
        })
        .then(response => {
          console.log(response);
          this.servicos.splice(i, 1);
          var x = document.getElementById("snackbar");
          x.innerHTML = "Avaliado";
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
      this.popup = true;
    }
  },
  components: {
    headerUser: headerUser,
    StarRating
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
.esp {
  margin: inherit;
  margin-bottom: 4%;
}
.txt {
  overflow: hidden;
  white-space: nowrap;
  margin: 15px;
}
.checked {
  color: orange;
}
.lbl {
  margin-top: 5px;
}
.stars {
  margin: 0 auto;
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
.form-control {
  width: 50%;
  margin-top: 5px;
}
</style>