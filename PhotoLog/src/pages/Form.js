import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';
import uploadImage from '../net/uploadImage';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Button = styled.Button``;

const Image = styled.Image`
  width: 100%;
  height: 360px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 4px;
  border: 1px solid #e5e5e5;
`;

function Form() {
  const [url, setUrl] = React.useState(null);
  const [hashTags, setHashTags] = React.useState('');

  function selectImage() {
    uploadImage()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <Container>
      <Title>Form</Title>
      <Button title="이미지 선택" onPress={selectImage} />
      {url && <Image source={{uri: url}} />}
      <Input
        placeholder="#해시태그"
        value={hashTags}
        onChangeText={(value) => setHashTags(value)}
      />
      <Button title="저장" onPress={null} />
    </Container>
  );
}

export default Form;
