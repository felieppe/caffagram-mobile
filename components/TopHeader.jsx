import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faSquarePlus } from '@fortawesome/free-regular-svg-icons';

function TopHeader() {
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const handleCreatePostClick = () => {
        setIsCreatingPost(true);
    };

    const handleCloseCreatePost = () => {
        setIsCreatingPost(false);
    };

    return (
        <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => {}}>
                <Image source={require('../public/logo.png')} style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.likeButton}>
                    <FontAwesomeIcon icon={faHeart} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.createPost} onPress={handleCreatePostClick}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </TouchableOpacity>
            </View>
            {isCreatingPost && <CreatePostForm onClose={handleCloseCreatePost} />}
        </View>
    );
}

const styles = StyleSheet.create({
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 120,
        height: 30
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    likeButton: {
        marginRight: 10,
    },
    createPost: {
        marginRight: 10,
    },
});

export default TopHeader;