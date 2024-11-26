import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function EditProfilePage({ profileData, onSave, onCancel }) {
    const [username, setUsername] = useState(profileData.username);
    const [description, setDescription] = useState(profileData.description);
    const [profilePicture, setProfilePicture] = useState(profileData.profilePicture);

    const handleSave = () => {
        onSave({ username, description, profilePicture });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
            />
            <TextInput
                style={styles.input}
                value={profilePicture}
                onChangeText={setProfilePicture}
                placeholder="Profile Picture URL"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onCancel} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default EditProfilePage;