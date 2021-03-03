

import React from 'react';
import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
  padding: 8px 24px;
  background-color: #efefef;
`;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TodoItemText = styled.Text`
  font-size: 20px;
  flex: 1;
`;
const TodoItemButton = styled.Button``;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 8px 24px;
`;

const Input = styled.TextInput`
  border: 1px solid #a0a0a0;
  flex: 1;
`;

const Button = styled.Button``;

export default function App() {
  return (
    <Container>
      <Contents>
        <TodoItem>
          <TodoItemText>할 일 목록</TodoItemText>
          <TodoItemButton title="삭제" onPress={null} />
        </TodoItem>
      </Contents>
      <InputContainer>
        <Input />
        <Button title="전송" onPress={null} />
      </InputContainer>
    </Container>
  );
}