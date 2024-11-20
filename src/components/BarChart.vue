<template>
    <Bar :chart-data="chartData" :chart-options="chartOptions" />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  
  // Register required components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default defineComponent({
    name: 'BarChart',
    components: {
      Bar,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        default: () => {},
      },
    },
  });
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  