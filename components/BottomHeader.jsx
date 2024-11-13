import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function BottomHeader() {
    return (
        <View style={styles.bottomHeader}>
            <TouchableOpacity style={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} />
            </TouchableOpacity>
            <Image source={require('../assets/image.jpg')} style={styles.profileImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    homeButton: {
        marginRight: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default BottomHeader;