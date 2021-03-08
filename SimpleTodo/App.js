import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";
import Constants from "expo-constants";
import _ from "lodash";
import AsyncStorage from "@react-native-community/async-storage";
import produce from "immer";

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

const TodoCheckContainer = styled.TouchableOpacity`
  margin-right: 8px;
`;

const TodoCheckIcon = styled.Text`
  font-size: 20px;
`;

const TodoItemText = styled.Text`
  font-size: 20px;
  flex: 1;
  text-decoration: ${({ done }) => done && "line-through"};
  color: ${({ done }) => (done ? "#a5a5a5" : "black")};
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
  const [list, setList] = React.useState([]);

  function handleAddPress(todo) {
    if (!todo) return;

    const newItem = {
      id: new Date().getTime().toString(),
      todo,
      done: false
    };
    store([...list, newItem]);
    setInput("");
  }

  function handleDeletePress(id) {
    // const newList = list.filter(item => item.id !== id);
    // setList(newList);
    const newList = _.reject(list, item => item.id === id);
    store(newList);
  }

  function store(newList) {
    if (!newList || !Array.isArray(newList)) return;
    setList(newList);
    AsyncStorage.setItem("list", JSON.stringify(newList))
      .then(() => {})
      .catch(err => alert(err.message));
  }

  function handleCheckPress(index) {
    const newList = produce(list, draft => {
      draft[index].done = !list[index].done;
    });
    store(newList);
  }

  React.useEffect(() => {
    AsyncStorage.getItem("list")
      .then(data => {
        if (data) setList(JSON.parse(data));
      })
      .catch(err => {
        alert(err.message);
      });
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Contents>
          {list.map((item, index) => {
            const { id, todo, done } = item;
            return (
              <TodoItem key={id}>
                <TodoCheckContainer onPress={() => handleCheckPress(index)}>
                  <TodoCheckIcon>{done ? "✅" : "☑️"}</TodoCheckIcon>
                </TodoCheckContainer>
                <TodoItemText done={done} onPress={() => handleCheckPress(index)}>
                  {todo}
                </TodoItemText>
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
