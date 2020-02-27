<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-xs">
      <q-card v-for="station in stations" :key="station.indicativo" class="my-card" flat bordered>
        <q-img :src="`statics/cities/city${getRandomNumber()}.png`" />

        <q-card-section>
          <div class="text-overline text-orange-9">{{station.provincia}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{station.nombre}}</div>
          <div
            class="text-caption text-grey"
          >Latitud: {{station.latitud}} - Altitud: {{station.altitud}} - {{station.indicativo}}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="purple" label="Ver Detalles" @click="showDialog(station.indicativo)" />
        </q-card-actions>
      </q-card>
    </div>
    <StationComponent
      @closed="onClosedChild"
      :shown="shown"
      :selectedStationDetails="selectedStationDetails"
    />
  </q-page>
</template>

<script>
import Axios from "axios";
import StationComponent from "../components/StationComponent";
export default {
  name: "PageCity",
  components: {
    StationComponent
  },
  data() {
    return {
      cityId: this.$route.params.cityId,
      stations: [],
      shown: false,
      selectedStationDetails: []
    };
  },
  methods: {
    getStations() {
      return Axios.get(
        process.env.API_URL +
          "/valores/climatologicos/inventarioestaciones/todasestaciones/"
      )
        .then(res => {
          return res.data;
        })
        .catch(err => console.log(err));
    },
    async getCities() {
      const data = await this.getStations();
      return Axios.get(data.datos)
        .then(res => {
          this.stations = this.filterStations(res.data);
        })
        .catch(err => console.log(err));
    },
    filterStations(stations) {
      return stations.filter(el => el.provincia === this.cityId);
    },
    getRandomNumber() {
      return Math.floor(Math.random() * (4 - 1) + 1);
    },
    async showDialog(value) {
      this.shown = true;
      console.log("value", value);
      this.selectedStationDetails = await this.getStationDetails(value);
    },
    getStationData(stationId) {
      return Axios.get(
        process.env.API_URL +
          `/observacion/convencional/datos/estacion/${stationId}`
      ).then(res => {
        return res.data;
      });
    },
    async getStationDetails(stationId) {
      const data = await this.getStationData(stationId);
      console.log("data", data);
      if (data.estado === 200) {
        return Axios.get(data.datos).then(res => res.data);
      } else {
        return [];
      }
    },
    onClosedChild(value) {
      this.shown = value;
    }
  },
  mounted() {
    this.getCities();
  }
};
</script>
<style lang="scss">
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>