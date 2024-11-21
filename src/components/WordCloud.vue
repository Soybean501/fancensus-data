<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Word Cloud</h2>
        <p class="font-semibold mb-4">The size of the words below correspond to the frequency in which they are mentioned in the headlines for the selected country.</p>
        <div v-if="availableCountries.length">
            <label for="country-select">Select Country:</label>
            <select id="country-select" v-model="selectedCountry" @change="generateWordCloud">
                <option v-for="country in availableCountries" :key="country" :value="country">
                    {{ country }}
                </option>
            </select>
        </div>
        <div id="word-cloud" class="mt-4 word-cloud-container"></div>
    </div>
</template>

<script>
import WordCloud from 'wordcloud';
import { countryCodeMap } from '../services/countryCodes';

export default {
    name: 'WordCloud',
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
            wordCloudData: {},
            countryCodeMapLocal: countryCodeMap,
        };
    },
    methods: {
        processData() {
            if (!this.rawData || this.rawData.length === 0) {
                console.warn('No raw data available to process');
                return;
            }

            const stopWords = ['the', 'and', 'is', 'to', 'in', 'of', 'for', 'on', 'with'];
            const wordCloudData = {};

            this.rawData.forEach(({ countrycode, headline }) => {
                const country = this.countryCodeMapLocal[countrycode] || countrycode || 'Unknown';

                if (!headline) {
                        console.warn(`Missing headline for countrycode: ${countrycode}`);
                    return;
                }

                const words = headline
                    .toLowerCase()
                    .replace(/[^a-z\s]/g, '')
                    .split(/\s+/)
                    .filter((word) => word && !stopWords.includes(word));

                if (!wordCloudData[country]) wordCloudData[country] = {};

                words.forEach((word) => {
                    wordCloudData[country][word] = (wordCloudData[country][word] || 0) + 1;
                });
            });

            this.wordCloudData = wordCloudData;
            this.availableCountries = Object.keys(wordCloudData);
            this.selectedCountry = this.availableCountries[0];
            this.$nextTick(() => {
                this.generateWordCloud();
            });
        },
        generateWordCloud() {
            console.log('Generating word cloud for country:', this.selectedCountry);
            const words = Object.entries(this.wordCloudData[this.selectedCountry] || {}).map(([word, count]) => [word, count]);
            console.log('Words for word cloud:', words);
            const el = document.getElementById('word-cloud');
            if (el) {
                WordCloud(el, { list: words });
            } else {
                console.error('Word cloud element not found');
            }
        },
    },
    watch: {
        selectedCountry() {
            this.generateWordCloud();
        },
    },
    created() {
        this.processData();
    },
};
</script>

<style scoped>
.word-cloud-container {
    width: 100%;
    height: 0;
    padding-bottom: 60%;
    position: relative;    
}

#word-cloud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>