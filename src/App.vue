<!-- App Component  
    This is the main component that displays the different views of the application.
-->
<template>
  <div id="app">
    <header class="bg-blue-500 py-6">
      <h1 class="text-3xl font-bold mb-4 text-white">Fancensus Data Visualization</h1>
      <div class="mb-4">
        <button @click="currentView = 'CountryTable'" class="btn">Country Table</button>
        <button @click="currentView = 'ProductTable'" class="btn">Product Table</button>
        <button @click="currentView = 'CountryChart'" class="btn">Country Chart</button>
        <button @click="currentView = 'WordCloud'" class="btn">Word Cloud</button>
        <button @click="currentView = 'ProductMentions'" class="btn">Product Mentions</button>
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
    <div v-if="currentView === 'WordCloud'">
      <WordCloud />
    </div>
    <div v-if="currentView === 'ProductMentions'">
      <ProductMentions />
    </div>
  </div>
</template>

<script>
import CountryTable from './components/CountryTable.vue';
import ProductTable from './components/ProductTable.vue';
import CountryChart from './components/CountryChart.vue';
import WordCloud from './components/WordCloud.vue';
import ProductMentions from './components/ProductMentions.vue';
import { getData } from './services/api';

export default {
  components: {
    CountryTable,
    ProductTable,
    CountryChart,    
    WordCloud,
    ProductMentions,
  },
  data() {
    return {
      currentView: 'CountryTable', // Default view
      views: [
        { name: 'CountryTable', label: 'Country Table' },
        { name: 'ProductTable', label: 'Product Table' },
        { name: 'CountryChart', label: 'Country Chart' },        
        { name: 'WordCloud', label: 'Word Cloud' },
        { name: 'ProductMentions', label: 'Product Mentions' },
      ],
      rawData: [], // Data fetched from the API
    };
  },
  /**
   * Get the current view component.
   */
  computed: {
    currentViewComponent() {
      return this.currentView;
    },
  },
  /**
   * Fetch the data from the API when the component is created.
   */
  async created() {
    this.rawData = await getData();
    console.log('Fetched data structure:', this.rawData);
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
