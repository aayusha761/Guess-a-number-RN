import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from "./components/Header";
import StartGamesScreen from "./screens/StartGamesScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState(undefined);
    const [guessRounds, setGuessRounds] = useState(0);

    const congigureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = (noOfRounds) => {
        setGuessRounds(noOfRounds);
    };

    let content = <StartGamesScreen onStartgame={startGameHandler}/>;
    if (userNumber && guessRounds <=0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    }
    else if (guessRounds >0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber = {userNumber} onRestart={congigureNewGameHandler}/>
    }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
      {/*<GameScreen/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
