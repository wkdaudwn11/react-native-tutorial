import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

function BoxOffice({navigation}) {
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
      {pending ? (
        <ActivityIndicator size="large" />
      ) : (
        <Contents>
          <Title>BoxOffice</Title>
          {list.map((item) => {
            const {movieCd, movieNm, rank} = item;
            return (
              <ListItem
                key={`ListItem-${movieCd}`}
                onPress={() => navigation.navigate('MovieDetail', {movieCd})}>
                <Rank>{rank}</Rank>
                <MovieName>{movieNm}</MovieName>
              </ListItem>
            );
          })}
        </Contents>
      )}
    </Container>
  );
}

export default BoxOffice;
