/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const options = {
  title: '이미지를 선택해주세요',
  customButtons: [{name: 'fb', title: '페이스북 사진첩에서 선택하기'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function App() {
  const [fileName, setFileName] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <Button
          title="이미지 선택"
          onPress={() => {
            try {
              setIsLoading(true);

              launchImageLibrary(null, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  setIsLoading(false);
                  console.warn('User cancelled image picker');
                } else if (response.error) {
                  setIsLoading(false);
                  console.warn('ImagePicker Error: ', response.error);
                  alert('ImagePicker Error: ' + response.error);
                } else if (response.customButton) {
                  setIsLoading(false);
                  console.warn(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  setFileName(response.fileName);
                  setUrl(response.uri);
                  setIsLoading(false);
                }
              });
            } catch (e) {
              alert(e.message);
            }
          }}
        />

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {url && (
              <>
                <Text>{fileName}</Text>
                <Image source={{uri: url}} style={{width: 340, height: 340}} />
              </>
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
}

export default App;
