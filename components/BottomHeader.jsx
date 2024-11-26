import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function BottomHeader({ profileImageUrl }) {
    return (
        <View style={styles.footer}>
            <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default BottomHeader;