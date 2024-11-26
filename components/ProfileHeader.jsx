import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function ProfileHeader({ username, profilePicture, posts, friends, description, onEdit }) {
    return (
        <View style={styles.header}>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
            <Text>{posts} posts</Text>
            <Text>{friends} friends</Text>
            <Text>{description}</Text>
            <Button title="Edit Profile" onPress={onEdit} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProfileHeader;