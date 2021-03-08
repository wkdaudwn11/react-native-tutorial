import React from "react";
import { Button, View, Text } from "react-native";

function Detail({ navigation }) {
  return (
    <View>
      <Text>Detail</Text>
      <Button title="목록으로" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Detail;
