import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { addFriendById, editMyProfile, fetchFeed, fetchProfileById, removeFriendById } from '../utils/api.js'; 
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';
import EditProfileButton from '../components/EditProfileButton';
import EditProfilePage from '../components/EditProfilePage';
import PhotoGallery from '../components/PhotoGallery';
import ProfileHeader from '../components/ProfileHeader';

function User({ route, navigation }) {
  const { user, jwt } = route.params; 

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(user);
  const [posts, setPosts] = useState([]);
  const [isOp, setIsOp] = useState(false);
  const [lUser, setLUser] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('/default-profile.webp');

  const handleEditProfile = () => { setIsEditing(true); };
  const handleCancelEdit = () => { setIsEditing(false); }

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);

    editMyProfile(jwt, { username: updatedProfile.username, description: updatedProfile.description, profilePicture: updatedProfile.profilePicture })
      .then((res) => {
        console.log("Profile updated");
      })
      .catch((error) => { console.error(error) });
  };

  const handleFollow = () => {
    const following = profile.friends.includes(lUser.id);

    if (!following) {
      addFriendById(user._id, jwt)
        .then(() => {
          console.log("Friend added");
          setProfile((prevProfile) => ({
            ...prevProfile,
            friends: [...prevProfile.friends, lUser.id]
          }));
        })
        .catch((error) => { console.error(error) });
    } else {
      removeFriendById(user._id, jwt)
        .then(() => {
          console.log("Friend removed");
          setProfile((prevProfile) => ({
            ...prevProfile,
            friends: prevProfile.friends.filter(friend => friend != lUser.id) 
          }));
        })
        .catch((error) => { console.error(error) });
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const feed = await fetchFeed(jwt);
        const up = feed.filter(post => post.user.username === user.username).map(post => { 
          return { imageUrl: "http://192.168.0.27:3001/" + post.imageUrl, id: post._id } 
        });
        setPosts(up);

        const localUser = await AsyncStorage.getItem('user'); 
        const parsedLocalUser = localUser ? JSON.parse(localUser) : null;
        setLUser(parsedLocalUser);

        if (parsedLocalUser == null) { 
          setIsOp(false); 
        } else if (parsedLocalUser.username == user.username) { 
          setIsOp(true); 
        }

        if (parsedLocalUser && jwt) {
          const profile = await fetchProfileById(parsedLocalUser._id, jwt);
          const profilePic = profile.user.profilePicture || "/default-profile.webp";
          console.log("Setting profileImageUrl to:", profilePic);
          setProfileImageUrl(profilePic); 
        }

      } catch (error) {
        console.error(error); 
      }
    };

    fetchUserData(); 
  }, [user, jwt]);

  if (!lUser) { 
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <EditProfilePage
          profileData={user}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : null}

      <TopHeader /> 

      <ProfileHeader
        username={user.username}
        profilePicture={user.profilePicture ? user.profilePicture : "/default-profile.webp"}
        posts={posts.length}
        friends={profile.friends === undefined ? 0 : profile.friends.length}
        description={profile.description}
        onEdit={handleEditProfile} 
      />

      {isOp && <EditProfileButton onEdit={handleEditProfile} />}
      {!isOp && (
        <TouchableOpacity onPress={handleFollow} style={styles.followButton}>
          <Text style={styles.followButtonText}>
            {profile.friends !== undefined ? (profile.friends.includes(lUser.id) ? "Following" : "Follow") : "Follow"}
          </Text>
        </TouchableOpacity>
      )}

      {posts.length > 0 ? (
        <PhotoGallery photos={posts} /> 
      ) : (
        <Text style={styles.noPostsText}>No posts yet</Text>
      )}

      <BottomHeader profileImageUrl={profileImageUrl} /> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    followButtonText: {
        color: 'white',
    },
    noPostsText: {
        textAlign: 'center',
        padding: 20,
    },
});

export default User;