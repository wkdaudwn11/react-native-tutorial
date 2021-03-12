import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Container = styled.SafeAreaView`
  flex: 1;
`;

function View() {
  return (
    <Container>
      <Title>View</Title>
    </Container>
  );
}

export default View;
