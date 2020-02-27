<template>
  <div>
    <q-dialog v-model="shownDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Datos de la Estación</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="selectedStationDetails.length > 0">
            <div>
              <q-markup-table separator="vertical" flat bordered>
                <thead>
                  <tr>
                    <th class="text-left">Ubicación</th>
                    <th class="text-right">Precipitación acumulada pluviómetro</th>
                    <th class="text-right">Velocidad máxima del viento</th>
                    <th class="text-right">Velocidad media del viento</th>
                    <th class="text-right">Temperatura instanánea del aire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail) in selectedStationDetails.slice(0,5)" :key="detail.fint">
                    <td class="text-left">{{detail.ubi}}</td>
                    <td class="text-right">{{detail.prec}}</td>
                    <td class="text-right">{{detail.vmax}}</td>
                    <td class="text-right">{{detail.vv}}</td>
                    <td class="text-right">{{detail.ta}}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
          <div v-else>
            <p>No se obtuvieron datos.</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="purple" @click="closeDialog" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: ["shown", "selectedStationDetails"],
  data() {
    return {
      stationDetails: []
    };
  },
  methods: {
    closeDialog() {
      this.shownDialog = false;
    }
  },
  computed: {
    shownDialog: {
      get() {
        return this.shown;
      },
      set(value) {
        this.$emit("closed", value);
      }
    }
  },
  mounted() {}
};
</script>