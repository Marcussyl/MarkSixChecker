import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [resultToCheck, setResultToCheck] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);
  const [myDraws, setMyDraws] = useState([]);

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
    const matchedResults = [];
    resultToCheck.forEach((result) => {
      const matchedDraws = myDraws.filter((draw) => {
        return draw.every((digit) => result.includes(digit));
      });
      if (matchedDraws.length > 0) {
        matchedResults.push({
          result: result.join(' '),
          matchedDraws: matchedDraws.map((draw) => draw.join(' ')),
        });
      }
    });

    if (matchedResults.length > 0) {
      Alert.alert(
        'Matched Results',
        matchedResults.map((matchedResult) => {
          return `${matchedResult.result} matches: ${matchedResult.matchedDraws.join(', ')}`;
        }).join('\n')
      );
    } else {
      Alert.alert('No Matches', 'No matches found.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MarkSixChecker</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Result to Check:</Text>
        {resultToCheck.map((digits, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultDigits}>{digits.join(' ')}</Text>
            <Button title="Remove" onPress={() => handleRemoveResultButton(index)} />
            <Button title="Edit" onPress={() => handleEditResultButton(index)} />
          </View>
        ))}
        <Button title="Add" onPress={handleAddResult} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>My Draw:</Text>
        {myDraws && myDraws.map((draw, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultDigits}>{draw.join(' ')}</Text>
            <Button title="Remove" onPress={() => handleRemoveMyDraw(index)} />
            <Button title="Edit" onPress={() => handleEditMyDrawButton(index)} />
          </View>
        ))}
        <Button title="Add" onPress={handleAddMyDraw} />
      </View>
      <Button title="Check" onPress={handleCheckButton} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#ffd900',
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
    paddingVertical: 8,
  },
  resultDigits: {
    fontSize: 16,
    marginBottom: 5,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});




