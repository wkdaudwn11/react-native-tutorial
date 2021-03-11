import React from 'react';
import styled from 'styled-components';
import fetch from './fetch';

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
  const [keyword, setKeyword] = React.useState('');
  const [list, setList] = React.useState([]);

  const search = React.useCallback(() => {
    if (!keyword) {
      alert('키워드를 입력해주세요');
      return;
    }

    fetch(`https://api.manana.kr/karaoke/singer/${keyword}.json`)
      .then((data) => setList(data))
      .catch((err) => alert(err.message));
  }, [keyword]);

  return (
    <Container>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)} />
        <Button title="검색" onPress={search} />
      </Row>
      {list && (
        <Contents>
          {list.map((item) => {
            const {brand, no, title} = item;
            return (
              <ListItem key={brand + no}>
                <Label>
                  {brand} / [{no}] {title}
                </Label>
              </ListItem>
            );
          })}
        </Contents>
      )}
    </Container>
  );
}

export default App;
