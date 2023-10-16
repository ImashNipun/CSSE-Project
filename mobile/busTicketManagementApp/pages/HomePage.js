import React, { useState } from 'react';
import CustomHeader from "../components/CustomHeader";
import Sidebar from "../components/Sidebar";
import LocationCard from '../components/LocationCard';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function HomePage({ navigation }) {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrData, setQRData] = useState(null);


    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleCardPress = (data) => {
        setQRData(JSON.stringify(data));
        setShowQRCode(true);
    };

    const journeys = [  // Mock data for the journeys
        {
            route: 'kaduwela-kollupitiya',
            routeNo: '177 Route',
            price: 'Rs. 56',
            date: '19 September 2023',
            time: '1.00 PM'
        },
        // ... you can add more journey objects as needed
    ];

    return (
        <View style={styles.container}>
            <CustomHeader navigation={navigation} toggleSidebar={toggleSidebar} />
            <Sidebar isVisible={isSidebarVisible} navigation={navigation} toggleSidebar={toggleSidebar} />
            <Text style={styles.title}>Journey History</Text>
            <Image 
                // source={{ uri: 'https://path-to-your-image.jpg' }} // Replace with your image link
                style={styles.bannerImage}
            />
            <TouchableOpacity style={styles.planButton} onPress={()=>navigation.navigate('Planning')}>
                <Text style={styles.planButtonText}>Plan a journey</Text>
            </TouchableOpacity>

            {showQRCode && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showQRCode}
                    onRequestClose={() => {
                        setShowQRCode(!showQRCode);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 250, height: 250, backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <QRCode value={qrData} size={200} />
                            <TouchableOpacity onPress={() => setShowQRCode(false)}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {journeys.map((journey, index) => (
                <LocationCard key={index} data={journey} onPress={() => handleCardPress(journey)}/>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',  // Center the title text
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    planButton: {
        padding: 15,
        backgroundColor: '#1E90FF',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    planButtonText: {
        color: 'white',   // Make the text white
        fontWeight: 'bold',  // Bold the text
    },
});
