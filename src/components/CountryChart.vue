<template>
  <div class="modal-container">
    <h2>Data Visualization by Country</h2>
    <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BarChart from './BarChart.vue';
import { getData } from '../services/api';
import { countryCodeMap } from '../services/countryCodes';

export default defineComponent({
  name: 'CountryChart',
  components: {
    BarChart,
  },
  data() {
    return {
      data: [],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async fetchData() {
      this.data = await getData();
      this.prepareChartData();
    },
    prepareChartData() {
      const countryCounts = this.data.reduce((acc, item) => {
        const countryCode = item.countrycode || 'Unknown';
        acc[countryCode] = (acc[countryCode] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(countryCounts).map(
        (code) => countryCodeMap[code] || code
      );

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Number of Entries',
            backgroundColor: '#42b983',
            data: Object.values(countryCounts),
          },
        ],
      };
    },
  },
  created() {
    this.fetchData();
  },
});
</script>

<style scoped>
.modal-container {
  padding: 20px;
  box-sizing: border-box;
  margin: 60px;
}
</style>