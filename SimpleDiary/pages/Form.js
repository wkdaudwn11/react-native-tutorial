import React from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-community/async-storage";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

const Label = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: ${({ height }) => (height ? height : "40px")};
  border: 1px solid #666666;
  padding: 8px;
  font-size: 20px;
  margin-bottom: 12px;
`;

function Form({ navigation }) {
  const [date, setDate] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  async function setStore() {
    if (!date || !title || !text) {
      alert("날짜, 제목, 내용은 반드시 입력해주세요.");
      return;
    }
    let list = await AsyncStorage.getItem("list");

    if (list === null) {
      list = [];
    } else {
      list = JSON.parse(list);
    }

    list.push({
      date,
      title,
      text,
    });

    await AsyncStorage.setItem("list", JSON.stringify(list));
    alert("일기 작성이 완료되었습니다.");
    navigation.goBack();
  }

  return (
    <Container>
      <Contents>
        <Label>날짜</Label>
        <Input
          placeholder="YYYY-MM-DD 형식으로 입력"
          value={date}
          onChangeText={(value) => setDate(value)}
        />
        <Label>제목</Label>
        <Input
          placeholder=""
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <Label>내용</Label>
        <Input
          multiline={true}
          height="200px"
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </Contents>
      <Button onPress={setStore}>저장</Button>
    </Container>
  );
}

export default Form;
