import React from "react";
import { Button, View, Text } from "react-native";

function Form({ navigation }) {
  return (
    <View>
      <Text>Form</Text>
      <Button title="목록으로" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Form;
