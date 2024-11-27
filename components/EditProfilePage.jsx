import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';


function EditProfilePage({ profileData, onSave, onCancel }) {
    const [profile, setProfile] = useState(profileData);
  
    const handleInputChange = (name, value) => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      onSave(profile);
    };
  
    return (
      <View style={editProfilePageStyles.modal}>
        <View style={editProfilePageStyles.modalContent}>
          <TouchableOpacity onPress={onCancel} style={editProfilePageStyles.close}>
            <Text style={editProfilePageStyles.closeText}>&times;</Text>
          </TouchableOpacity>
          <Text style={editProfilePageStyles.h2}>Edit Profile</Text>
          <View style={editProfilePageStyles.form}> 
            <View style={editProfilePageStyles.formGroup}>
              <Text style={editProfilePageStyles.label}>Username:</Text>
              <TextInput
                style={editProfilePageStyles.input}
                value={profile.username}
                onChangeText={(text) => handleInputChange('username', text)} 
              />
            </View>
            <View style={editProfilePageStyles.formGroup}>
              <Text style={editProfilePageStyles.label}>Profile Picture:</Text>
              <TextInput
                style={editProfilePageStyles.input}
                value={profile.profilePicture}
                onChangeText={(text) => handleInputChange('profilePicture', text)} 
              />
            </View>
            <View style={editProfilePageStyles.formGroup}>
              <Text style={editProfilePageStyles.label}>Description:</Text>
              <TextInput
                style={editProfilePageStyles.textarea}
                multiline
                value={profile.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
            </View>
            <View style={editProfilePageStyles.formButtons}>
              <TouchableOpacity style={editProfilePageStyles.button} onPress={handleSave}>
                <Text style={editProfilePageStyles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={editProfilePageStyles.button} onPress={onCancel}>
                <Text style={editProfilePageStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  const editProfilePageStyles = StyleSheet.create({

  });

  export default EditProfilePage;