import { shallowMount } from "@vue/test-utils";
import * as All from "quasar";
import Index from "~/src/pages/Index.vue";

describe("Index.vue", () => {
  it("Carga listado de estaciones de España", () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.vm.stations).toHaveLength(291);
  });
});
