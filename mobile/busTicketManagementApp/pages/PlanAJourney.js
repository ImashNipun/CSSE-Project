import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlanAJourney = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handelPlanning = () => {
    console.log(fromLocation, toLocation);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plan a Journey</Text>

      <Image
        // source={{ uri: 'https://path_to_image_url.png' }} // Replace with your image URL or require('./path_to_image.png')
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Icon name="location-arrow" size={20} style={styles.icon} />
        <TextInput
          placeholder="From"
          value={fromLocation}
          onChangeText={setFromLocation}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="location-arrow" size={20} style={styles.icon} />
        <TextInput
          placeholder="To"
          value={toLocation}
          onChangeText={setToLocation}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.planButton} onPress={handelPlanning}>
        <Text style={styles.planButtonText}>Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  planButton: {
    backgroundColor: '#4C9EEB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  planButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlanAJourney;
