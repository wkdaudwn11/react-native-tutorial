import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Button, View, Text } from "react-native";

function List({ navigation }) {
  return (
    <View>
      <Text>List</Text>
      <Button title="상세" onPress={() => navigation.navigate("Detail")} />
      <Button title="작성" onPress={() => navigation.navigate("Form")} />
    </View>
  );
}

export default List;
