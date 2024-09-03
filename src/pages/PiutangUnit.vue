<script setup>
import { ref, toRaw, watch } from "vue";
import data from "./../../data.json";
import { currencyFormatter } from "./../../src/utils/currency-formatter";
import Search from "./../components/Search.vue";
import Headers from "../constants/headers";

const tableData = ref(data.data.map((item) => ({ ...item, isChecked: false })));
const selected = ref([]);

const handlePaidIfChecked = () => {
  if (!selected.value.length) return;
  console.log(selected.value);
  tableData.value.forEach((item) => {
    if (selected.value.includes(item.obligationNumber)) {
      item.status = "Lunas";
    }
  });
};

const handleSearch = (value) => {
  const { searchTextValue, date, selectedColumn, sliderValue, status } = value;
  const startDate = new Date(date[0]);
  const endDate = new Date(date[1]);

  const filteredData = data.data.filter((item) => {
    console.log("searchTextValue", searchTextValue);

    const normalizeText = searchTextValue.toLowerCase();

    const matchTextValue =
      item.participant.toLowerCase().includes(normalizeText) ||
      item.obligationNumber.toLowerCase().includes(normalizeText) ||
      item.policeNumber.toLowerCase().includes(normalizeText) ||
      item.va.includes(normalizeText);

    const matchStatus = status ? item.status === status : true;

    return matchTextValue && matchStatus;
  });
  tableData.value = filteredData.map((item) => ({ ...item, isChecked: false }));
};

const refreshDataTable = () => {
  selected.value = [];
  tableData.value = data.data.map((item) => ({ ...item, isChecked: false }));
};
</script>

<template>
  <v-container fluid class="container m-auto">
    <h1 class="text-center">Piutang Unit</h1>

    <div class="text-left">
      <v-breadcrumbs :items="['Home', 'Daftar Piutang Unit']">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>

    <v-row class="flex gap-2 justify-between">
      <v-col md="6">
        <Search @handleSubmit="handleSearch" />
      </v-col>
      <v-col md="6" class="d-flex ga-2 justify-end">
        <v-btn color="warning" @click="refreshDataTable">Refresh</v-btn>
        <v-btn class="btn" color="secondary" variant="elevated"
          ><download-excel :data="tableData" name="Piutang Unit">
            Export
          </download-excel></v-btn
        >

        <v-btn class="btn" color="primary" @click="handlePaidIfChecked"
          >Bayar</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      :items="tableData"
      :headers="Headers"
      v-model="selected"
      item-value="obligationNumber"
      show-select
      :sort-by="[
        { key: 'obligationNumber' },
        { key: 'policeNumber' },
        { key: 'owner' },
        { key: 'participant' },
        { key: 'va' },
        { key: 'priceFormed' },
        { key: 'adminFee' },
        { key: 'ppn' },
        { key: 'total' },
        { key: 'dateAuction' },
        { key: 'dueDate' },
        { key: 'settelmentDate' },
        { key: 'status' },
      ]"
    >
      <template v-slot:item.va="{ item }">
        {{ item.va || "-" }}
      </template>
      <template v-slot:item.settelmentDate="{ item }">
        {{ item.settelmentDate || "-" }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ currencyFormatter(item.total) }}
      </template>
      <template v-slot:item.priceFormed="{ item }">
        {{ currencyFormatter(item.priceFormed) }}
      </template>
      <template v-slot:item.ppn="{ item }">
        {{ currencyFormatter(item.ppn) }}
      </template>
      <template v-slot:item.adminFee="{ item }">
        {{ currencyFormatter(item.adminFee) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="
            item.status === 'Konfirmasi Pembayaran'
              ? 'primary'
              : item.status === 'Lunas'
              ? 'success'
              : 'warning'
          "
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>
