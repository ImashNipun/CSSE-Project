import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox';
import axios from 'axios'; // Import axios

const ForeignerSignUp = ({navigation}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [temid,settempId]=useState(generateRandomNumber().toString())
    const [isSelected, setSelection] = useState(false);

    function generateRandomNumber() {
        return Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      }

    const handleSubmit = async () => {
        // Handle the sign up logic here
        if(!fullName || !email || !isSelected) {
            alert('Please fill in all fields and agree with terms and conditions');
            return;
        }
        console.log(fullName, email);
        

        try {
            const response = await axios.post(`http://10.0.2.2:9000/api/v1/auth/foreign/register`, {
                user_name: fullName,
                email: email,
                temp_id:temid,
                transaction_id:""
            });

            console.log(response.data);
            if(response.data.status === 201) {
                // const transactionId = response.data.data.transaction_id;
                
                // Present the alert with the copy button
                Alert.alert(
                    'Registration Successful',
                    `Your ID: ${temid}`,
                    [
                        {text: 'Copy', onPress: () => Clipboard.setString(temid)},
                        {text: 'OK', onPress: () => navigation.navigate('Login')},
                    ],
                    { cancelable: false }
                    );
    
                } else {
                    alert('Error registering.');
                }
        } catch(error) {
            alert('Error registering. Please try again later.');
            console.error('Error registering foreign user:', error);
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Foreigner Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.checkBoxContainer}>
                <CustomCheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    label="Agree with Terms & Conditions"
                    />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    }
});

export default ForeignerSignUp;
