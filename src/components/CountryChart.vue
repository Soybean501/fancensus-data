<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Articles by Country</h2>
    <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import { getData } from '../services/api'; // Fetch your sample data from an API or a file

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      rawData: [], // Raw data from the API
      chartData: null, // Processed data for the chart
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Articles by Country',
          },
        },
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        this.rawData = await getData();
        this.processData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    processData() {
      // Group data by country
      const grouped = this.rawData.reduce((acc, item) => {
        const country = item.countrycode || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {});

      // Prepare chartData
      this.chartData = {
        labels: Object.keys(grouped),
        datasets: [
          {
            label: 'Number of Articles',
            data: Object.values(grouped),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Example colors
          },
        ],
      };
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>
