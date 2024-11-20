<template>
  <div id="app" class="p-6">
    <header class="bg-blue-500 p-6">
    <h1 class="text-3xl font-bold mb-4 text-white">Fancensus Data Visualization</h1>
    <div class="mb-4">
      <button @click="currentView = 'CountryTable'" class="btn">Country Table</button>
      <button @click="currentView = 'ProductTable'" class="btn">Product Table</button>
      <button @click="currentView = 'CountryChart'" class="btn">Country Chart</button>
    </div>
  </header>
    <div v-if="currentView === 'CountryTable'">
      <CountryTable />
    </div>
    <div v-if="currentView === 'ProductTable'">
      <ProductTable />
    </div>
    <div v-if="currentView === 'CountryChart'">
      <CountryChart />
    </div>
    <div class="bg-red-500 text-white p-4 mt-4">Test Tailwind CSS</div>
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

<style scoped>
.btn {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #2779bd;
}

#app {
  text-align: center;
}
</style>
