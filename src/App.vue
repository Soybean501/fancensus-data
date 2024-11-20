<template>
  <div id="app">
    <h1>Fancensus Data Visualization</h1>
    <div>
      <button @click="currentView = 'CountryTable'">Country Table</button>
      <button @click="currentView = 'ProductTable'">Product Table</button>
      <button @click="currentView = 'CountryChart'">Country Chart</button>
    </div>
    <div v-if="currentView === 'CountryTable'">
      <CountryTable />
    </div>
    <div v-if="currentView === 'ProductTable'">
      <ProductTable />
    </div>
    <div v-if="currentView === 'CountryChart'">
      <CountryChart />
    </div>
  </div>
</template>

<script>
import CountryTable from './components/CountryTable.vue';
import ProductTable from './components/ProductTable.vue';
import CountryChart from './components/CountryChart.vue';

export default {
  components: {
    CountryTable,
    ProductTable,
    CountryChart,
  },
  data() {
    return {
      currentView: 'CountryTable',
    };
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}

#app {
  text-align: center;
}
</style>