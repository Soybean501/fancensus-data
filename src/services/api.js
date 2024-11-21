import axios from 'axios';

/**
 * Fetch the data from the API.
 */
export const getData = async () => {
  try {
    const response = await axios.get('https://www.fancensus.com/test/dataset1.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
