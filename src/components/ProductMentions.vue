<!-- ProductMentions Component
    This component displays a table of the most mentioned product for each country.
-->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4">Product Mentions by Country</h2>
    <p class="mb-4">
        <i class="fas fa-info-circle ml-1 text-blue-500"></i>
        The table below shows the most mentioned product for each country.        
      </p>    
    <div v-if="mostMentionedProducts.length">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Most Mentioned Product</th>
            <th>Mentions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in mostMentionedProducts" :key="index">
            <td>{{ product.country }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { countryCodeMap } from '../services/countryCodes';

export default defineComponent({
  name: 'ProductMentions',
  props: {
    rawData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCountry: null,
      availableCountries: [],
      productMentionsData: {},
      mostMentionedProducts: [],
      countryCodeMapLocal: countryCodeMap,
    };
  },
  methods: {
    /**
     * Process the raw data to group it by country and product.
     */
    processData() {
      if (!this.rawData || this.rawData.length === 0) {
        console.warn('No raw data available to process');
        return;
      }

      const productMentionsData = {};

      this.rawData.forEach(({ countrycode, product }) => {
        const country = this.countryCodeMapLocal[countrycode] || countrycode || 'Unknown';

        if (!product) {
          console.warn(`Missing product name for countrycode: ${countrycode}`);
          product = 'Unknown Product';
        }

        if (!productMentionsData[country]) {
          productMentionsData[country] = {};
        }

        productMentionsData[country][product] = (productMentionsData[country][product] || 0) + 1;
      });

      this.productMentionsData = productMentionsData;
      this.availableCountries = Object.keys(productMentionsData);
      this.selectedCountry = this.availableCountries[0];
      this.generateMostMentionedProducts();
    },
    /**
     * Generate the most mentioned products for each country.
     */
    generateMostMentionedProducts() {
      this.mostMentionedProducts = this.availableCountries.map(country => {
        const products = this.productMentionsData[country];
        const mostMentioned = Object.entries(products).reduce((max, [name, count]) => {
          return count > max.count ? { name, count } : max;
        }, { name: '', count: 0 });

        return {
          country,
          name: mostMentioned.name,
          count: mostMentioned.count,
        };
      });
    },
  },
  watch: {
    selectedCountry() {
      this.generateMostMentionedProducts();
    },
  },
  created() {
    console.log('Raw data received:', this.rawData);
    this.processData();
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
  