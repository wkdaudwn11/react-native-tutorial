import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import Contents from "../components/Contents";

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;

function Detail({ navigation }) {
  return (
    <Container>
      <Contents>
        <Text>일기...</Text>
      </Contents>
    </Container>
  );
}

export default Detail;
