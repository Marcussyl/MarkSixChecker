import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [resultToCheck, setResultToCheck] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);

  const handleAddButton = () => {
    Alert.prompt('Add Digits', 'Enter numbers separated by whitespace:', (text) => {
      const digits = text.split(' ').map(Number);
      setResultToCheck((prevResult) => [...prevResult, digits]);
    });
  };

  const handleCheckButton = async () => {
    // Request permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // Photo is selected or taken
      const photoUri = result.uri;
      setPhotoUri(photoUri);
      console.log(photoUri);

      // Implement digit extraction logic here
      // Extract digits from the photo and store them in a variable


      // Compare extracted digits with resultToCheck and highlight matching digits
    }
  };

  const handleRemoveButton = (index) => {
    setResultToCheck((prevResult) => prevResult.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MarkSixChecker</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Result to Check:</Text>
        {resultToCheck.map((digits, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultDigits}>{digits.join(' ')}</Text>
            <Button title="Remove" onPress={() => handleRemoveButton(index)} />
          </View>
        ))}
      </View>
      <Button title="Add" onPress={handleAddButton} />
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




