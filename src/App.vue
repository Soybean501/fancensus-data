<template>
  <div id="app">
    <!-- Header Section -->
    <header class="bg-blue-600 py-6 shadow-md">
      <h1 class="text-3xl font-bold mb-4 text-white">Fancensus Data Visualization</h1>
      <nav class="mb-4">
        <button 
          v-for="view in views" 
          :key="view.name" 
          @click="currentView = view.name"
          :class="['btn', { active: currentView === view.name }]"
        >
          {{ view.label }}
        </button>
      </nav>
    </header>

    <!-- Main Content Section -->
    <main>
      <component :is="currentViewComponent" :raw-data="rawData" />
    </main>
  </div>
</template>

<script>
import CountryTable from './components/CountryTable.vue';
import ProductTable from './components/ProductTable.vue';
import CountryChart from './components/CountryChart.vue';
import TimeTrend from './components/TimeTrend.vue';
import { getData } from './services/api';

export default {
  components: {
    CountryTable,
    ProductTable,
    CountryChart,
    TimeTrend,
  },
  data() {
    return {
      currentView: 'CountryTable',
      views: [
        { name: 'CountryTable', label: 'Country Table' },
        { name: 'ProductTable', label: 'Product Table' },
        { name: 'CountryChart', label: 'Country Chart' },
        { name: 'TimeTrend', label: 'Time Trend' },
      ],
      rawData: [],
    };
  },
  computed: {
    currentViewComponent() {
      return this.currentView;
    },
  },
  async created() {
    this.rawData = await getData();
  },
};
</script>

<style scoped>
/* Button Styles */
.btn {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
  background-color: #2779bd;
  transform: scale(1.05);
}

.btn.active {
  background-color: #1d4f91;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* App Styles */
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 20px;
  text-align: center;
}

main {
  padding: 20px;
  flex: 1;
}
</style>