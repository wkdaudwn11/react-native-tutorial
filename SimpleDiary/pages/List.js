import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0;
  border-bottom-color: #aaaaaa;
  border-bottom-width: 1px;
`;
const Label = styled.Text`
  font-size: 20px;
`;

function List({ navigation }) {
  const [list, setList] = React.useState([]);

  async function load() {
    const data = await AsyncStorage.getItem("list");
    if (data) {
      setList(JSON.parse(data));
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });

    load();

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Contents>
        {_.sortBy(list, "date").map((item, index) => {
          const { date, title } = item;
          return (
            <ListItem
              key={`list-${index}`}
              onPress={() => navigation.navigate("Detail", { date })}
            >
              <Label>{date}</Label>
              <Label>{title}</Label>
            </ListItem>
          );
        })}
      </Contents>
      <Button onPress={() => navigation.navigate("Form")}>새 일기 작성</Button>
    </Container>
  );
}

export default List;
