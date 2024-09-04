<script setup>
import { ref, onMounted } from "vue";

const searchValue = ref("");
const startDate = ref(null);
const endDate = ref(null);
const date = ref([]);
const selectedColumn = ref("");
const selectedStatus = ref("");
const sliderValue = ref([0, 100000000]);

const paymentStatus = [
  { name: "", label: "Semua" },
  { name: "Konfirmasi Pembayaran", label: "Konfirmasi Pembayaran" },
  { name: "Lunas", label: "Lunas" },
  { name: "Proses Pembayaran", label: "Proses Pembayaran" },
];

const columnTypes = [
  { name: "dateAuction", label: "Tanggal Lelang" },
  { name: "dueDate", label: "Tanggal Jatuh Tempo" },
  { name: "settelmentDate", label: "Tanggal Lunas" },
];

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

const $emit = defineEmits(["handleSubmit"]);

const handleEmitSubmit = () => {
  const props = {
    searchTextValue: searchValue.value,
    date: date.value,
    selectedColumn: selectedColumn.value,
    sliderValue: sliderValue.value,
    status: selectedStatus.value,
  };
  $emit("handleSubmit", props);
};
</script>

<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              <h3>Advance Search</h3>
            </v-col>
            <v-col class="text-grey" cols="8"> </v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <form @submit.prevent="handleEmitSubmit">
          <v-row>
            <v-col>
              <v-text-field
                label="Search Text"
                variant="outlined"
                v-model="searchValue"
                placeholder="(Peserta, No.wajib, No.polisi, VA)"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                label="Status"
                :items="paymentStatus"
                item-title="label"
                item-value="name"
                v-model="selectedStatus"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                label="Choose Date Column"
                :items="columnTypes"
                item-title="label"
                item-value="name"
                v-model="selectedColumn"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col>
              <div v-show="selectedColumn">
                <VueDatePicker label="date" v-model="date" range />
              </div>
            </v-col>
          </v-row>

          <div style="margin-top: 35px">
            <v-range-slider
              :min="0"
              :max="200000000"
              :step="20000000"
              v-model="sliderValue"
              thumb-label="always"
              label="Total Range"
            >
            </v-range-slider>
          </div>

          <div style="margin-top: 15px; text-align: right">
            <v-btn type="submit" color="primary">Search</v-btn>
          </div>
        </form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
