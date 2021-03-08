import React from 'react';
import styled from 'styled-components';
import movieList from './movieList';
import _ from 'lodash';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Quiz = styled.Text`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding: 24px;
`;

const Contents = styled.View`
  flex: 1;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #cc0000;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
`;

const App = () => {
  const [quizList, setQuizList] = React.useState(_.shuffle(movieList));
  const [mode, setMode] = React.useState('quiz'); // quiz || answer

  function getInitials(string) {
    return string
      .split('')
      .map((char) => {
        const index = (char.charCodeAt(0) - 44032) / 28 / 21;
        if (index >= 0) {
          return String.fromCharCode(index + 4352);
        }
        return char;
      })
      .join('');
  }

  const handlePress = React.useCallback(() => {
    if (mode === 'answer') {
      setQuizList(quizList.slice(1));
    }
    const newMode = mode === 'quiz' ? 'answer' : 'quiz';
    setMode(newMode);
  }, [mode, quizList]);

  const retry = React.useCallback(() => {
    setQuizList(_.shuffle(movieList));
    setMode('quiz');
  }, []);

  return (
    <Container>
      <Contents>
        {quizList.length > 0 ? (
          <Quiz>
            {mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}
          </Quiz>
        ) : (
          <Quiz>끝!</Quiz>
        )}
      </Contents>
      {quizList.length > 0 ? (
        <Button onPress={handlePress}>
          <Label>{mode === 'quiz' ? '정답 확인' : '다음'}</Label>
        </Button>
      ) : (
        <Button onPress={retry}>
          <Label>처음부터 다시 시작</Label>
        </Button>
      )}
    </Container>
  );
};

export default App;
