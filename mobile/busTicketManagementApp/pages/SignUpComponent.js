import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import CustomCheckBox from '../components/CustomCheckBox';
// import { useNavigation } from '@react-navigation/native';

export default function SignUpComponent({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSelected, setSelection] = useState(false);


  const clearForm = () => {
    setName('');
    setEmail('');
    setMobileNumber('');
    setPassword('');
    setConfirmPassword('');
    setSelection(false);  // Assuming this state is for the checkbox.
  };

  const handleSignUp = async () => {
    if (!name||!email||!mobileNumber||!password||!confirmPassword) {
        alert('Please fill all the fields.');
        return;
      }else if(!isSelected){
        alert('You need to agree with the Terms & Conditions to sign up.');
        return;
      }else if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match.');
        return;
      }else{
        try {
        const response = await axios.post(`http://localhost:9000/api/v1/auth/local/register`, {
          name: name,
          email: email,
          mobileNumber: mobileNumber,
          password: password,
        });
  
        // Check for successful registration response from your server
        if (response.status === 201) {
          alert('Registered successfully! Please login.');
          // Clear the form
          clearForm();
          // Navigate back to the Sign In page
          navigation.navigate('Login'); 
        } else {
          alert(response.data.message || 'Registration failed!');
        }
      } catch (error) {
        alert('Error registering. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Sign Up</Text>
        
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Full Name"
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setMobileNumber}
          value={mobileNumber}
          placeholder="Mobilhe Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <View style={styles.checkboxContainer}>
        <CustomCheckBox
            value={isSelected}
            onValueChange={setSelection}
            label="Agree with Terms & Conditions"
            />
        </View>
{/* 
        // ... other input fields similarly ... */}

        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
}

// The styles remain similar to LoginComponent's styles.
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
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 8,
      },
  });
  