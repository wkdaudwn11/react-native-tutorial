import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

async function fetch(url) {
  if (!url) {
    return;
  }

  AsyncStorage.clear();

  let result = await AsyncStorage.getItem(url);
  let timestamp = await AsyncStorage.getItem('T' + url);

  if (result) {
    // 현재 시간이랑 timestamp를 비교 후 하루 미만이면 Async Storage에 있는 것을 반환
    timestamp = Number(timestamp);
    const now = new Date.getTime();
    if (now - timestamp < 86400000) {
      return JSON.parse(result);
    }
  }

  const response = await axios.get(url);
  result = response.data;
  AsyncStorage.setItem(url, JSON.stringify(result));
  AsyncStorage.setItem('T' + url, new Date().getTime().toString());
  return result;
}

export default fetch;
