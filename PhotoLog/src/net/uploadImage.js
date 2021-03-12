import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const config = {
  headers: {
    Authorization: 'Client-ID b65a6cc1ffba77a',
  },
};

async function uploadImage() {
  // promisify
  return new Promise((resolve, reject) => {
    try {
      launchImageLibrary(
        {
          includeBase64: true,
        },
        (response) => {
          if (response.didCancel) {
            console.warn('User cancelled image picker');
          } else if (response.error) {
            console.warn('ImagePicker Error: ', response.error);
            reject({message: response.error});
          } else {
            const params = new FormData();
            params.append('image', response.base64);
            axios
              .post('https://api.imgur.com/3/image', params, config)
              .then((res) => {
                resolve(res.data.data.link);
              })
              .catch((error) => {
                reject({message: error.response.data.data.error});
              });
          }
        },
      );
    } catch (e) {
      console.warn(e.message);
      reject({message: e.message});
    }
  });
}

export default uploadImage;
