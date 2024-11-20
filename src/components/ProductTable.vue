<template>
    <div>
      <h2>Data Grouped by Product</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Number of Activities</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, product) in productCounts" :key="product">
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
        productCounts: {},
      };
    },
    methods: {
      async fetchData() {
        this.data = await getData();
        this.groupDataByProduct();
      },
      groupDataByProduct() {
        this.productCounts = this.data.reduce((acc, item) => {
          const product = item.product || 'Unknown';
          acc[product] = (acc[product] || 0) + 1;
          return acc;
        }, {});
      },
    },
    created() {
      this.fetchData();
    },
  };
  </script>
  
  <style scoped>
  /* Same styling as before */
  </style>
  