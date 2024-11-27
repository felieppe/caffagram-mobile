import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';


function EditProfileButton({ onEdit }) {
    return (
      <TouchableOpacity style={editProfileButtonStyles.editProfileBtn} onPress={onEdit}>
        <Text style={editProfileButtonStyles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    );
  }
  
  const editProfileButtonStyles = StyleSheet.create({
    editProfileBtn: {
      backgroundColor: '#007bff', // Example color
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
  });

  export default EditProfileButton;