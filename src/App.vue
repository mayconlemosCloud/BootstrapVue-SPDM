<template>
  <div>
    <Sidebar class=""></Sidebar>
    <div class="mt-5 pt-5">
      <b-container>
        <b-row>
          <b-col sm="12" md="12" lg="12">
            <b-card no-body style="height: 250px">
              <b-tabs content-class="mt-3">
                <b-tab title="Por Unidade">
                  <b-container>
                    <b-row>
                      <b-col sm="12" md="8" lg="8">
                        <div class="mx-2">
                          <label for="Unidade" class="form-label"
                            >Unidade</label
                          >

                          <select
                            id="Unidade"
                            v-model="selected"
                            class="form-select"
                            @change="BuscarLeitos()"
                          >
                            <option :value="null" disabled>
                              -- Selecione uma unidade --
                            </option>
                            <option
                              v-for="item in unidades"
                              :key="item.cnes"
                              :value="item.cnes"
                            >
                              {{ item.nome }}
                            </option>
                          </select>
                        </div>
                      </b-col>

                      <b-col sm="12" md="4" lg="4">
                        <div>
                          <label for="leito" class="form-label">Leito</label>
                          <input
                            type="text"
                            @change="Filtro()"
                            v-model="numeroLeito"
                            id="leito"
                            class="form-control"
                            placeholder="leito"
                          />
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="g-0 ">
          <b-col sm="12" md="3" lg="3">
           
            <b-card class="barraLateral">
             
              
                <b-card >
                  <b-button  squared variant="success"   class="w-100 my-2" @click="Filtro(0)" show
                    >Livres: {{ Total.livre }}</b-button
                  ><br />
                  <b-button squared variant="secondary " class="w-100 " @click="Filtro(1)" show
                    >Ocupados:{{ Total.ocupado }}</b-button
                  >
                </b-card>

                <b-card class="mt-2">
                  <b-button variant="outline-secondary" class="w-100" @click="Filtro()" show
                    >Total de Leitos: {{ Total.TotalLeitos }}</b-button
                  >
                </b-card>
                <b-card class="mt-2">
                  <b-button variant="outline-success" class="w-100" @click="exportarExcel()" show
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-spreadsheet"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"
                      />
                    </svg>
                    Relação de Leitos</b-button
                  >
                </b-card>
         
            </b-card>
          </b-col>

          <b-col sm="12" md="6" lg="6">
            <PainelLeitos />
          </b-col>

          <b-col sm="12" md="3" lg="3" class="text-center">
            <b-card class="barraLateral">
              <b-card-text>
                <b-card class="mt-2">
                  <label for="Taxa" class="form-label">Taxa</label> <br />
                  {{ taxaOcupacao }} %
                </b-card>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import PainelLeitos from "./components/PainelLeitos.vue";
import XLSX from "xlsx";
export default {
  name: "App",
  components: { Sidebar, PainelLeitos },
  data() {
    return {
      selected: null,
      unidades: [],
      leitos: null,
      numeroLeito: 0,
      taxaOcupacao: 0.0,
    };
  },

  computed: {
    Total() {
      return this.$store.getters.BuscarLeitosStore;
    },
    StateLeitos() {
      return this.$store.state.leitos;
    },
  },
  methods: {
    Filtro(value) {
      this.$store.commit("Filtro", {
        leitoStatus: value,
        leito: this.numeroLeito,
      });
    },
    BuscarLeitos() {
      this.$store.commit("BuscarLeitosStore", { cnes: this.selected });
    },
    BuscarUnidade() {
      this.$http
        .get("https://web2.smsrio.org/testefront/listarUnidade.php")
        .then((response) => {
          this.unidades.push(response.data);
        });
    },
    exportarExcel() {
      const data = this.leitos;
      const ws = XLSX.utils.json_to_sheet(data);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leitos");
      XLSX.writeFile(wb, `Leitos_${new Date().getTime()}.xlsx`);
    },
  },
  watch: {
    Total(v) {
      this.taxaOcupacao = parseFloat(
        parseInt((v.ocupado * 100) / v.TotalLeitos)
      ).toFixed(2);
    },
    StateLeitos(v) {
      this.leitos = [...v];
    },
  },
  mounted() {
    this.BuscarUnidade();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  vertical-align: baseline;
}

html {
  font-family: "Fredoka One", cursive;
}

.barraLateral {
  height: 500px;
  max-height: 500px;
}


</style>
