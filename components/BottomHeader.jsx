import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProfileById } from '../utils/api';

function BottomHeader() {
    const [profileImage, setProfileImage] = useState(null);
    const [jwt, setJWT] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('user').then((user) => {
            if (user) {
                const { _id, token } = JSON.parse(user);
                setJWT(token)

                fetchProfileById(_id, token).then((profile) => {
                    setProfileImage(profile.user.profilePicture || '/default-profile.webp')
                }).catch((error) => console.error("Error fetching profile:", error));
            }
        }).catch((error) => console.error("Error fetching profile:", error));
    }, [])

    return (
        <View style={styles.bottomHeader}>
            <TouchableOpacity style={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} />
            </TouchableOpacity>
            <Image source={profileImage == "/default-profile.webp" ? require('../public/default-profile.webp') : { uri: profileImage } } style={styles.profileImage} />
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