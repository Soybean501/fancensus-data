<template>
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Data Grouped by Product</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Number of Activities</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([product, count], index) in productCounts" :key="index">
            <td>{{ product }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getData } from '../services/api';
  
  export default {
    data() {
      return {
        data: [],
        productCounts: [],
      };
    },
    methods: {
      async fetchData() {
        this.data = await getData();
        this.groupDataByProduct();
      },
      groupDataByProduct() {
        const counts = this.data.reduce((acc, item) => {
          const product = item.product ? item.product.trim() : 'Unknown';
          acc[product] = (acc[product] || 0) + 1;
          return acc;
        }, {});
  
        // Convert counts object to array and sort by count descending
        this.productCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
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
  }
  </style>
  