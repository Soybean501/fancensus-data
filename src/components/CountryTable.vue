<template>
    <div>
      <h2>Data Grouped by Country</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Number of Entries</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(items, countryCode) in groupedData"
            :key="countryCode"
            @click="toggleCountry(countryCode)"
          >
            <td>{{ getCountryName(countryCode) }}</td>
            <td>{{ items.length }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Details Table -->
      <div v-if="selectedCountry">
        <h3>Details for {{ getCountryName(selectedCountry) }}</h3>
        <table>
          <thead>
            <tr>
              <!-- Use a computed property to get the headers -->
              <th v-for="key in tableHeaders" :key="key">
                {{ key === 'countrycode' ? 'Country' : key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in groupedData[selectedCountry]"
              :key="index"
            >
              <td v-for="key in tableHeaders" :key="key">
                <!-- Replace country codes with full names -->
                <span v-if="key === 'countrycode'">
                  {{ getCountryName(item[key]) }}
                </span>
                <span v-else>{{ item[key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { getData } from '../services/api';
  import { countryCodeMap } from '../services/countryCodes';
  
  export default {
    data() {
      return {
        data: [],
        groupedData: {},
        selectedCountry: null,
        tableHeaders: [],
      };
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
        this.selectedCountry =
          this.selectedCountry === countryCode ? null : countryCode;
      },
      getCountryName(code) {
        return countryCodeMap[code] || code;
      },
      setTableHeaders() {
        // Get the keys from the first item to use as table headers
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
  }
  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  </style>
  