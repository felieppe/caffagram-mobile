import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

// ProfileHeader.js
function ProfileHeader({ username, profilePicture, posts, friends, description }) {
  return (
    <View style={profileHeaderStyles.profileHeader}>
      <View style={profileHeaderStyles.profilePictureContainer}>
        <Image
          source={ profilePicture == "/default-profile.webp" ? require('../public/default-profile.webp') : { uri: "http://192.168.0.27:3001/" + (profilePicture).replace("\\", "/") } }
          style={profileHeaderStyles.profilePicture}
        />
      </View>
      <View style={profileHeaderStyles.profileInfo}>
        <Text style={profileHeaderStyles.profileUsername}>{username}</Text>
        <Text style={profileHeaderStyles.profileDescription}>{description}</Text>
        <View style={profileHeaderStyles.profileStats}>
          <View style={profileHeaderStyles.statItem}>
            <Text style={profileHeaderStyles.statNumber}>{posts}</Text>
            <Text>Posts</Text>
          </View>
          <View style={profileHeaderStyles.statItem}>
            <Text style={profileHeaderStyles.statNumber}>{friends}</Text>
            <Text>Friends</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const profileHeaderStyles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDescription: {
    fontSize: 16,
    color: 'gray',
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statItem: {
    marginRight: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileHeader;