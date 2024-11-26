import React from 'react';
import { Button, StyleSheet } from 'react-native';

function EditProfileButton({ onEdit }) {
    return (
        <Button title="Edit Profile" onPress={onEdit} />
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#0095f6',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
});

export default EditProfileButton;