<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Time-Based Trend</h2>
    <div class="mb-4">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" v-model="startDate" @change="processData" />
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" v-model="endDate" @change="processData" />
    </div>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import LineChart from './LineChart.vue';
import { parseISO, format } from 'date-fns';

export default {
  name: 'TimeTrend',
  components: {
    LineChart,
  },
  props: {
    rawData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Articles Over Time',
          },
        },
      },
      startDate: '',
      endDate: '',
    };
  },
methods: {
  processData() {
    if (!this.rawData) {
      console.error('rawData is undefined');
      return;
    }

    const filteredData = this.rawData.filter(item => {
      const date = parseISO(item.date);
      const startDate = this.startDate ? parseISO(this.startDate) : null;
      const endDate = this.endDate ? parseISO(this.endDate) : null;
      return (!startDate || date >= startDate) && (!endDate || date <= endDate);
    });

    console.log('Filtered Data:', filteredData);

    const dateCounts = filteredData.reduce((acc, item) => {
      const date = format(parseISO(item.date), 'yyyy-MM');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    console.log('Date Counts:', dateCounts);

    this.chartData = {
      labels: Object.keys(dateCounts),
      datasets: [
        {
          label: 'Number of Articles',
          data: Object.values(dateCounts),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    };
  },
},
  created() {
    if (this.rawData) {
      this.processData();
    } else {
      console.error('rawData is not provided');
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
}
</style>