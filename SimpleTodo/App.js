import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import Constants from "expo-constants";
import _ from "lodash";

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
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
  padding: 8px 0;
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
  const [input, setInput] = React.useState("");
  const [list, setList] = React.useState([
    {
      id: 1,
      todo: "할 일 1"
    },
    {
      id: 2,
      todo: "할 일 2"
    },
    {
      id: 3,
      todo: "할 일 3"
    }
  ]);

  function handleAddPress(todo) {
    if (!todo) return;

    const newItem = {
      id: new Date().getTime().toString(),
      todo
    };
    setList([...list, newItem]);
    setInput("");
  }

  function handleDeletePress(id) {
    // const newList = list.filter(item => item.id !== id);
    // setList(newList);
    const newList = _.reject(list, item => item.id === id);
    setList(newList);
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Contents>
          {list.map(item => {
            const { id, todo } = item;
            return (
              <TodoItem key={id}>
                <TodoItemText>{todo}</TodoItemText>
                <TodoItemButton title="삭제" onPress={() => handleDeletePress(id)} />
              </TodoItem>
            );
          })}
        </Contents>

        <InputContainer>
          <Input value={input} onChangeText={value => setInput(value)} />
          <Button title="전송" onPress={() => handleAddPress(input)} />
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
