import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Container = styled.SafeAreaView`
  flex: 1;
`;

function Form() {
  return (
    <Container>
      <Title>Form</Title>
    </Container>
  );
}

export default Form;
