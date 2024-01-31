import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

export default function App() {
  const [resultToCheck, setResultToCheck] = useState([]);
  const [myDraws, setMyDraws] = useState([]);
  const [checkResult, setCheckResult] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever resultToCheck or myDraws changes
  useEffect(() => {
    saveData();
  }, [resultToCheck, myDraws]);

  const loadData = async () => {
    try {
      const resultToCheckData = await AsyncStorage.getItem('resultToCheck');
      const myDrawsData = await AsyncStorage.getItem('myDraws');

      if (resultToCheckData !== null) {
        setResultToCheck(JSON.parse(resultToCheckData));
      }

      if (myDrawsData !== null) {
        setMyDraws(JSON.parse(myDrawsData));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('resultToCheck', JSON.stringify(resultToCheck));
      await AsyncStorage.setItem('myDraws', JSON.stringify(myDraws));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const handleAddResult = () => {
    Alert.prompt(
      'Add Numbers',
      'Enter numbers separated by a period:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (text) => {
            const numbers = text.split('.').map(Number);
            setResultToCheck((prevResult) => [...prevResult, numbers]);
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const handleRemoveResultButton = (index) => {
    setResultToCheck((prevResult) => prevResult.filter((_, i) => i !== index));
  };

  const handleEditResultButton = (index) => {
    const currentResult = resultToCheck[index].join('.');

    Alert.prompt(
      'Edit Numbers',
      'Enter numbers separated by a period:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (text) => {
            const numbers = text.split('.').map(Number);
            setResultToCheck((prevResult) => {
              const newResult = [...prevResult];
              newResult[index] = numbers;
              return newResult;
            });
          },
        },
      ],
      'plain-text',
      currentResult,
      'numeric'
    );
  }

  const handleAddMyDraw = () => {
    Alert.prompt(
      'Add Digits',
      'Enter numbers separated by whitespace:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (text) => {
            
            const numbers = text.split('.').map(Number);
            setMyDraws((prevResult) => [...prevResult, numbers]);
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const handleRemoveMyDraw = (index) => {
    setMyDraws((prevDraws) => prevDraws.filter((_, i) => i!== index));
  };

  const handleEditMyDrawButton = (index) => {
    const currentResult = myDraws[index].join('.');

    Alert.prompt(
      'Edit Numbers',
      'Enter numbers separated by a period:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (text) => {
            const numbers = text.split('.').map(Number);
            setMyDraws((prevResult) => {
              const newResult = [...prevResult];
              newResult[index] = numbers;
              return newResult;
            });
          },
        },
      ],
      'plain-text',
      currentResult,
      'numeric'
    );
  }

  const handleCheckButton = async () => {
    setCheckResult([]);
    myDraws.forEach((draw, index) => {
      const matchedNumbers = draw.filter((number) => resultToCheck[0].includes(number));
      console.log(matchedNumbers);
      if(matchedNumbers.length >= 3) {
        setCheckResult((prevCheckResult) => [...prevCheckResult, matchedNumbers]);
      } else {
        setCheckResult((prevCheckResult) => [...prevCheckResult, ['-','-','-']]);
      }
    });
    console.log(checkResult);
  };

  const handleClearButton = () => {
    setResultToCheck([]);
    setMyDraws([]);
    setCheckResult([]);
  };

  const handleTakePhotoButton = async () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MarkSixChecker</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Result to Check:</Text>
        {resultToCheck.map((digits, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultDigits}>{digits.join(' ')}</Text>
            <View style={styles.resultRowButton}>
              <Button title="Remove" onPress={() => handleRemoveResultButton(index)} />
              <Button title="Edit" onPress={() => handleEditResultButton(index)} />
            </View>
          </View>
        ))}
        <Button title="Add" onPress={handleAddResult} />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>My Draw:</Text>
        {myDraws && myDraws.map((draw, index) => (
          <View key={index} style={styles.resultRow}>
              <Text style={styles.resultDigits}>{draw.join(' ')}</Text>
            <View style={styles.resultRowButton}>
              <Button title="Remove" onPress={() => handleRemoveMyDraw(index)} />
              <Button title="Edit" onPress={() => handleEditMyDrawButton(index)} />
            </View>
          </View>
        ))}
        <View style={styles.buttonRow}>
          <Button title="Add" onPress={handleAddMyDraw} />
          <Button title="Take photo" onPress={handleTakePhotoButton} />
        </View>
      </View>

      <View style={styles.cButtons}>
        <Button title="Check" onPress={handleCheckButton} />
        <Button title="Clear" onPress={handleClearButton} />
      </View>
      

      {checkResult[0].length>1 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result:</Text>
          {checkResult.map((result, index) => (
            <View key={index} style={styles.resultRow}>
              <Text style={styles.resultDigits}>{result.join(' ')}</Text>
            </View>
          ))}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  resultContainer: {
    width: '85%',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    mariginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#000',
  },
  resultRowButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultDigits: {
    fontSize: 16,
    marginBottom: 5,
  },
});




