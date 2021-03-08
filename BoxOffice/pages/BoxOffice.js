import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

const MovieName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

function BoxOffice() {
  const [pending, setPending] = React.useState(true);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=853bc8f805d6f1e93fdfc95a6c803f24&targetDt=20210307',
      )
      .then((response) => {
        const {dailyBoxOfficeList} = response.data.boxOfficeResult;
        setList(dailyBoxOfficeList);
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
        alert('영화 목록을 불러오는데 실패하였습니다.');
      });
  }, []);

  return (
    <Container>
      <Contents>
        <Title>BoxOffice</Title>
        {pending && <ActivityIndicator size="large" />}
        {list.map((item) => {
          console.log(item);
          const {movieCd, movieNm, rank} = item;
          return (
            <ListItem key={`ListItem-${movieCd}`}>
              <Rank>{rank}</Rank>
              <MovieName>{movieNm}</MovieName>
            </ListItem>
          );
        })}
      </Contents>
    </Container>
  );
}

export default BoxOffice;
