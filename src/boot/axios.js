import Vue from "vue";
import axios from "axios";

axios.defaults.params = {};
axios.defaults.params["api_key"] = process.env.API_KEY;
Vue.prototype.$axios = axios;
