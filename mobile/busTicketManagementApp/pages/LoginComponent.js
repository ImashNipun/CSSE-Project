// LoginComponent.js

// import { ScaleFromCenterAndroid } from '@rea-ct-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LoginComponent({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const storeToken = async (token) => {
      try {
          await AsyncStorage.setItem('userToken', token);
      } catch (e) {
          console.log("Error saving token to AsyncStorage", e);
      }
    }
    
    const loginHandle=()=>{
        if(!email||!password){
            alert('Please fill all the fields.');
            return;
        }else{
          axios.post(`http://localhost:9000/api/v1/auth/local/login`, {
            email: email,
            password: password
          }).then(response => {
              console.log(response.data);
              
              // Save the received token to AsyncStorage
              if (response.data && response.data.data && response.data.data.token) {
                  storeToken(response.data.data.token);
              }

              navigation.navigate('Home');

          }).catch(error => {
              alert('Login failed. Please check your credentials.');
          });
        }
    }
  
  //   const [isSelected, setSelection] = useState(false);



  return (
    <View style={styles.outerContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Sign In</Text>
        
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />


        <Button style={styles.button} title="Sign In" onPress={loginHandle} />

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#B8EAFF',
  },
  loginContainer: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button:{
    borderRadius: 10,
    paddingLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  }
});
