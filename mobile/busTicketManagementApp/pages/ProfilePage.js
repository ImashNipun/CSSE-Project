import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader'; // Assuming you have this component
// import CustomHeader from "../components/CustomHeader";
import Sidebar from "../components/Sidebar";

const ProfilePage = ({ navigation }) => {

  const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <View style={styles.container}>
            <CustomHeader navigation={navigation} toggleSidebar={toggleSidebar} />
            <Sidebar isVisible={isSidebarVisible} navigation={navigation} toggleSidebar={toggleSidebar} />

            
            <Image
                // source={{ uri: 'https://example.com/path-to-your-image.jpg' }} // Replace with the image URL
                style={styles.profileImage}
            />
            
            <Text style={styles.profileName}>Lea Jems</Text>
            <Text style={styles.profileEmail}>example@email.com</Text>
            <Text style={styles.profilePhone}>+94 123456789</Text>

            <Text style={styles.qrTitle}>My QR Code</Text>
            <Image
                // source={{ uri: 'https://example.com/path-to-qr-code.jpg' }} // Replace with your QR code URL from the backend
                style={styles.qrImage}
            />

            <TouchableOpacity style={styles.qrButton}>
                <Text>Request a New QR code</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.qrButton}>
                <Text>Report Issues In QR</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // To make it circular
        marginBottom: 20,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 16,
        marginBottom: 5,
    },
    profilePhone: {
        fontSize: 16,
        marginBottom: 20,
    },
    qrTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    qrImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    qrButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    }
});

export default ProfilePage;
