<!-- CountryTable Component
    This component displays a table of the number of entries per country.
-->
<template>
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-4"> Entries per country</h2>            
      <p class="mb-4">
        <i class="fas fa-info-circle ml-1 text-blue-500"></i>
        Click a row you want more info on to see all entries for that country.        
      </p>
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
      /**
       * Fetch the data from the API and group it by country.
       */
      async fetchData() {
        this.data = await getData();
        this.groupDataByCountry();
        this.setTableHeaders();
      },
      /**
       * Group the data by country.
       */
      groupDataByCountry() {
        this.groupedData = this.data.reduce((acc, item) => {
          const countryCode = item.countrycode || 'Unknown';
          if (!acc[countryCode]) acc[countryCode] = [];
          acc[countryCode].push(item);
          return acc;
        }, {});
      },
      /**
       * Toggle the selected country.
       */
      toggleCountry(countryCode) {
        console.log('Row clicked:', countryCode);
        this.selectedCountry =
          this.selectedCountry === countryCode ? null : countryCode;
        console.log('Selected Country:', this.selectedCountry);
      },
      /**
       * Get the country name from the country code.
       */
      getCountryName(code) {
        return countryCodeMap[code] || code;
      },
      /**
       * Set the table headers.
       */
      setTableHeaders() {
        if (this.data.length > 0) {
          this.tableHeaders = Object.keys(this.data[0]);
        }
      },
    },
    /**
     * Fetch the data when the component is created.
     */
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
  