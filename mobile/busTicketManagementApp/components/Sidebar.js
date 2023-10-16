import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar = ({ isVisible, toggleSidebar, navigation }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={toggleSidebar}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={toggleSidebar} />

            <View style={styles.sidebarContainer}>
                <TouchableOpacity style={styles.backButton} onPress={toggleSidebar}>
                    <Icon name="arrow-left" size={30} color="#000" />
                </TouchableOpacity>
                
                <View style={styles.profileContainer}>
                    {/* <Image source={require('./path_to_image.png')} style={styles.profileImage} /> */}
                    <Text style={styles.profileName}>Lea Jems</Text>
                    <Text style={styles.profileEmail}>example@email.com</Text>
                </View>

                <TouchableOpacity style={styles.listItem} onPress={() => {
                            toggleSidebar();
                            navigation.navigate('Profile');
                        }} >
                    <Icon name="user" size={24} color="#000" />
                    <Text style={styles.listText}>Profile Details</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                        style={styles.listItem}
                        onPress={() => {
                            toggleSidebar();
                            navigation.navigate('Home');
                        }}
                    >
                    <Icon name="location-arrow" size={24} color="#000" />
                    <Text style={styles.listText}>Journey History</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.listItem}>
                    <Icon name="money" size={24} color="#000" />
                    <Text style={styles.listText}>Payments</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.listItem}>
                    <Icon name="cogs" size={24} color="#000" />
                    <Text style={styles.listText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} >
                {/* onPress={handleLogout} */}
                    <Icon name="sign-out" size={24} color="#000" />
                    <Text style={styles.listText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    sidebarContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '70%',
        backgroundColor: '#B8EAFF',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 14,
        color: 'gray',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomColor: '#ffff',
        borderBottomWidth: 1,
    },
    listText: {
        marginLeft: 10,
        fontSize: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white'
    },
});

export default Sidebar;
