import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeader = ({ navigation, toggleSidebar }) => {
    // const navigationdraw = useNavigation();
  
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
  
        {/* <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-circle" size={30} color="#000" />
          </TouchableOpacity>
        </View> */}
      </View>
    );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fffff',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'stretch',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeader;
