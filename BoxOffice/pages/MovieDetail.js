import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import Title from '../components/Title';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: ${({justifyContent}) =>
    justifyContent ? justifyContent : 'flex-start'};
  align-items: ${({alignItems}) => (alignItems ? alignItems : 'flex-start')};
`;

const Header = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const BackButton = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackButtonLabel = styled.Text`
  font-size: 18px;
  color: black;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Description = styled.Text`
  font-size: 16px;
  margin: 4px 12px;
`;

function MovieDetail({navigation, route}) {
  const [pending, setPending] = React.useState(true);
  const [info, setInfo] = React.useState(null);

  React.useEffect(() => {
    const movieCd = route.params.movieCd;
    axios
      .get(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=853bc8f805d6f1e93fdfc95a6c803f24&movieCd=${movieCd}`,
      )
      .then((response) => {
        setInfo(response.data.movieInfoResult.movieInfo);
        setPending(false);
      })
      .catch((error) => {
        console.log(error);
        alert('영화 목록을 불러오는데 실패하였습니다.');
      });
  }, [route.params.movieCd]);

  if (pending) {
    return (
      <Container justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  const {movieNm, prdtYear, openDt, showTm, nations, directors, actors} = info;

  return (
    <Container>
      <Header>
        <BackButton onPress={navigation.goBack}>
          <BackButtonLabel>⬅️ 목록으로</BackButtonLabel>
        </BackButton>
        <HeaderTitle>영화 정보 조회</HeaderTitle>
      </Header>
      <Contents>
        <Title>{movieNm}</Title>
        <Description>제작년도 : {prdtYear}년</Description>
        <Description>
          개봉일 : {moment(openDt, 'YYYYMMDD').format('YYYY년 MM월 DD일')}
        </Description>
        <Description>상영시간 : {showTm}분</Description>
        <Description>
          국가 : {nations.map((item) => item.nationNm).join(', ')}
        </Description>
        <Description>
          감독 : {directors.map((item) => item.peopleNm).join(', ')}
        </Description>
        <Description>
          출연 : {actors.map((item) => item.peopleNm).join(', ')}
        </Description>
      </Contents>
    </Container>
  );
}

export default MovieDetail;
