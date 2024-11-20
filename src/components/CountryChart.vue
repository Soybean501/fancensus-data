<template>
  <div class="modal-container">
    <h2>Data Visualization by Country</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <BarChart
        :chart-data="chartData"
        :chart-options="chartOptions"
      />
    </div>
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
      loading: true,
      rawData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Articles by Country',
            backgroundColor: '#42b983',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const data = await getData();
        this.rawData = data;
        this.updateChartData();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    updateChartData() {
      // Group by country
      const countryCounts = this.rawData.reduce((acc, item) => {
        const countryCode = item.countrycode || 'Unknown';
        acc[countryCode] = (acc[countryCode] || 0) + 1;
        return acc;
      }, {});

      // Update chart data properties directly
      this.chartData.labels = Object.keys(countryCounts).map(
        (code) => countryCodeMap[code] || code
      );
      this.chartData.datasets[0].data = Object.values(countryCounts);
    },
  },
  async created() {
    await this.fetchData();
  },
});
</script>

<style scoped>
.modal-container {
  padding: 20px;
}
</style>