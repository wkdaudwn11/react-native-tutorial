import React from 'react';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;

function Search({navigation}) {
  const [keyword, setKeyword] = React.useState('');
  const [list, setList] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const search = React.useCallback(() => {
    if (!keyword) {
      alert('검색어를 입력해주세요.');
      return;
    }
    const url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=853bc8f805d6f1e93fdfc95a6c803f24&movieNm=${keyword}`;

    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setList(response.data.movieListResult.movieList);
      })
      .catch((err) => {
        setIsLoading(true);
        alert(err.message);
      });
  }, [keyword]);

  return (
    <Container>
      <Title>영화 검색</Title>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)} />
        <Button title="검색" onPress={search} />
      </Row>
      {list &&
        (isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          list.map((item) => {
            const {movieCd, movieNm} = item;
            return (
              <ListItem
                key={movieCd}
                onPress={() => navigation.navigate('MovieDetail', {movieCd})}>
                <MovieName>{movieNm}</MovieName>
              </ListItem>
            );
          })
        ))}
    </Container>
  );
}

export default Search;
