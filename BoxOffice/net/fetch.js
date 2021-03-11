import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

async function fetch(url) {
  if (!url || typeof url !== 'string') {
    return;
  }

  try {
    const result = await AsyncStorage.getItem(url);

    if (result) {
      return JSON.parse(result);
    } else {
      const response = await axios.get(url);
      AsyncStorage.setItem(url, JSON.stringify(response.data));
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

export default fetch;
