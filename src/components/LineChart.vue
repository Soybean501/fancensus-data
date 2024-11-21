<!-- LineChart Component
    This component displays a line chart using the Chart.js library.
    **Note:** This component is not currently used in the application.
-->
<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
  } from 'chart.js';
  
  // Register Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default defineComponent({
    name: 'LineChart',
    components: {
      Line,
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        default: () => ({}),
      },
    },
  });
  </script> 
  