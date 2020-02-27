<template>
  <q-page>
    <div class="flex column flex-center items-center">
      <q-img src="~assets/city-cover.jpg" style="width: 70%">
        <div class="absolute-bottom text-subtitle1 text-center">Listado de ciudades</div>
      </q-img>
      <br />
      <q-select
        color="purple"
        filled
        v-model="selectedCity"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        label="Seleccione su ciudad"
        :options="cities"
        :option-label="item => (item === null ? null : item.provincia)"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        style="width: 250px"
        hint="Listado de ciudades disponibles"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No hay resultados</q-item-section>
          </q-item>
        </template>
      </q-select>
      <br />
      <q-btn
        :to="`city/${selectedCity !== null ? selectedCity.provincia : ''}`"
        label="Buscar"
        icon-right="navigation"
        color="purple"
        :disable="selectedCity ? false : true"
      />
    </div>
  </q-page>
</template>

<script>
import Axios from "axios";
export default {
  name: "PageIndex",
  data() {
    return {
      stations: [],
      cities: [],
      selectedCity: null
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
          this.stations = res.data;
          return this.filterCities(this.stations);
        })
        .catch(err => console.log(err));
    },
    filterCities(stations) {
      return stations.filter(
        (v, i, a) => a.findIndex(t => t.provincia === v.provincia) === i
      );
    },
    async filterFn(val, update, abort) {
      this.cities = await this.getCities();
      update(() => {
        const needle = val.toLowerCase();
        this.cities = this.cities.filter(
          v => v.provincia.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    abortFilterFn() {
      // console.log('delayed filter aborted')
    }
  },
  mounted() {
    this.getCities();
  }
};
</script>
