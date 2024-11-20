<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Data Grouped by Country</h2>
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 border">Country</th>
            <th class="px-4 py-2 border">Number of Entries</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(items, countryCode) in groupedData"
            :key="countryCode"
            @click="toggleCountry(countryCode)"
            class="cursor-pointer hover:bg-gray-100"
          >
            <td class="px-4 py-2 border">{{ getCountryName(countryCode) }}</td>
            <td class="px-4 py-2 border">{{ items.length }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal for Drill-Down Details -->
      <Modal
        v-if="selectedCountry"
        :title="'Details for ' + getCountryName(selectedCountry)"
        @close="selectedCountry = null"
      >
        <table class="min-w-full border-collapse">
          <thead>
            <tr>
              <th
                v-for="key in tableHeaders"
                :key="key"
                class="px-4 py-2 border"
              >
                {{ key === 'countrycode' ? 'Country' : key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in groupedData[selectedCountry]"
              :key="index"
              class="hover:bg-gray-50"
            >
              <td
                v-for="key in tableHeaders"
                :key="key"
                class="px-4 py-2 border"
              >
                <span v-if="key === 'countrycode'">
                  {{ getCountryName(item[key]) }}
                </span>
                <span v-else>{{ item[key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  </template>
  
  
  <script>
  import { getData } from '../services/api';
  import { countryCodeMap } from '../services/countryCodes';
  import Modal from './Modal.vue';

  
  export default {
    data() {
      return {
        data: [],
        groupedData: {},
        selectedCountry: null,
        tableHeaders: [],
      };
    },
    components: {
        Modal,
    },
    methods: {
      async fetchData() {
        this.data = await getData();
        this.groupDataByCountry();
        this.setTableHeaders();
      },
      groupDataByCountry() {
        this.groupedData = this.data.reduce((acc, item) => {
          const countryCode = item.countrycode || 'Unknown';
          if (!acc[countryCode]) acc[countryCode] = [];
          acc[countryCode].push(item);
          return acc;
        }, {});
      },
      toggleCountry(countryCode) {
        console.log('Row clicked:', countryCode);
        this.selectedCountry =
          this.selectedCountry === countryCode ? null : countryCode;
        console.log('Selected Country:', this.selectedCountry);
      },
      getCountryName(code) {
        return countryCodeMap[code] || code;
      },
      setTableHeaders() {
        if (this.data.length > 0) {
          this.tableHeaders = Object.keys(this.data[0]);
        }
      },
    },
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  </style>
  