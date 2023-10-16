import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChoicePage = ({ navigation }) => {

    const handleLocalPress = () => {
        console.log('Local');
        navigation.navigate('Login');
    };

    const handleForeignPress = () => {
        console.log('Foreign');
        navigation.navigate('ForeignLogin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLocalPress}>
                    <Text style={styles.buttonText}>Local</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleForeignPress}>
                    <Text style={styles.buttonText}>Foreign</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        padding: 40,
        width:'300px',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        padding: 15,
        width:'300px',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 25,
        textAlign: 'center',
    }
});

export default ChoicePage;
