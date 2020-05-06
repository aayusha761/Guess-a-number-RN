import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGamesScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(undefined);

    const numberInputHandler = (enteredValue) => {
        setEnteredValue(enteredValue.replace(/[^0-9]/g, ''))        //Not a number from 0-9 globally
    };

    const ResetInputHandler = () => {
        setEnteredValue('');        //Not a number from 0-9 globally
        setConfirmed(true);
    };

    const confirmInputHandler = (title, message) => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: ResetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContent}>
                <Text>You selected</Text>
                <View>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <Button title="Start Game" onPress={() => props.onStartgame(selectedNumber)}/>

                </View>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text>Start a new Name!</Text>
                <Card style={styles.inputContainer}>

                    <Text style={styles.title}>Select a Number</Text>
                    <Input style={styles.input}
                           blurOnSubmit
                           autoCapitalize='none'
                           autoCorrect={false}
                           keyBoardType="number-pad"
                           maxLength={2}
                           onChangeText={numberInputHandler}
                           value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={ResetInputHandler} color={Colors.accent}/></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        textTransform: 'uppercase',
        marginVertical: 10
    },
    inputContainer: {
        padding: 10,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: '100%'
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContent: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGamesScreen;