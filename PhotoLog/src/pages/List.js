import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Button = styled.Button``;

function List({navigation}) {
  return (
    <Container>
      <Title>List</Title>
      <Button title="조회" onPress={() => navigation.navigate('View')} />
      <Button title="글 작성" onPress={() => navigation.navigate('Form')} />
    </Container>
  );
}

export default List;
