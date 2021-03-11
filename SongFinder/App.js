import React from 'react';
import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  padding: 0 12px;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  padding: 8px;
`;

const Button = styled.Button``;

const ListItem = styled.TouchableOpacity`
  padding: 6px 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
`;

const Label = styled.Text`
  font-size: 16px;
`;

function App() {
  return (
    <Container>
      <Row>
        <Input />
        <Button title="검색" />
      </Row>
      <Contents>
        <ListItem>
          <Label>검색 결과</Label>
        </ListItem>
        <ListItem>
          <Label>검색 결과</Label>
        </ListItem>
        <ListItem>
          <Label>검색 결과</Label>
        </ListItem>
      </Contents>
    </Container>
  );
}

export default App;
