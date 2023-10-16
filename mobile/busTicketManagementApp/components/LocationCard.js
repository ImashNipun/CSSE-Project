import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const LocationCard = ({ data, onPress  }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                <Icon name="map-marker" size={20} color="#000" />
                </View>
                <Text style={styles.routeText}>{data.route}</Text>
                <Text style={styles.routeNoText}>{data.routeNo}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.priceText}>{data.price}</Text>
                <Text style={styles.dateText}>{data.date}</Text>
                <Text style={styles.timeText}>{data.time}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    routeText: {
        flex: 1,
        fontWeight: 'bold',
    },
    routeNoText: {
        marginLeft: 10,
    },
    priceText: {
        flex: 1,
    },
    dateText: {
        marginLeft: 10,
    },
    timeText: {
        marginLeft: 10,
    }
});

export default LocationCard;
