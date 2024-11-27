import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import { addFriendById, editMyProfile, fetchAllProfiles, fetchFeed, fetchProfileById, removeFriendById } from '../utils/api';
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';
import EditProfileButton from '../components/EditProfileButton';
import EditProfilePage from '../components/EditProfilePage';
import PhotoGallery from '../components/PhotoGallery';
import ProfileHeader from '../components/ProfileHeader';

function User({ user = {}, jwt = '' }) {
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

        editMyProfile(jwt, { username: updatedProfile.username, description: updatedProfile.description, profilePicture: updatedProfile.profilePicture }).then((res) => {
            console.log("Profile updated");
        }).catch((error) => { console.error(error) });
    };

    const handleFollow = () => {
        const following = profile.friends.includes(lUser.id);

        if (!following) {
            addFriendById(user._id, jwt).then(() => {
                console.log("Friend added");

                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friends: [...prevProfile.friends, lUser.id]
                }));
            }).catch((error) => { console.error(error) });
        } else {
            removeFriendById(user._id, jwt).then(() => {
                console.log("Friend removed");

                setProfile((prevProfile) => ({
                    ...prevProfile,
                    friends: prevProfile.friends.filter(friend => friend != lUser.id)
                }));
            }).catch((error) => { console.error(error) });
        }
    }

    useEffect(() => {
        fetchFeed(jwt).then((feed) => {
            const up = feed.filter(post => post.user.username === user.username).map(post => { return { imageUrl: "http://localhost:3001/" + post.imageUrl, id: post._id } });
            setPosts(up);
        }).catch((error) => { console.err(error) });

        const localUser = JSON.parse(localStorage.getItem('user'));
        setLUser(localUser);

        if (localUser == null) { setIsOp(false); }
        else if (localUser.username == user.username) { setIsOp(true); }

        if (localUser && jwt) {
            fetchProfileById(localUser.id, jwt)
                .then(profile => {
                    const profilePic = profile.user.profilePicture || "/default-profile.webp";
                    console.log("Setting profileImageUrl to:", profilePic);
                    setProfileImageUrl(profilePic);
                })
                .catch(error => console.error("Error fetching profile:", error));
        }
    }, [user, jwt])

    if (!lUser) { return <Text>Loading...</Text> }

    return (
        <View style={styles.container}>
            {isEditing ? <EditProfilePage 
                profileData={user} 
                onSave={handleSaveProfile} 
                onCancel={handleCancelEdit} 
            /> : null}
            
            <TopHeader/>
                
            <ProfileHeader
                username={user.username}
                profilePicture={user.profilePicture ? user.profilePicture : "/default-profile.webp"}
                posts={posts.length}
                friends={profile.friends.length}
                description={profile.description}
                onEdit={handleEditProfile}
            />

            {isOp && <EditProfileButton onEdit={handleEditProfile} /> }
            {!isOp && <Button title={profile.friends.includes(lUser.id) ? "Following" : "Follow"} onPress={handleFollow} />}
            {posts.length > 0 ? <PhotoGallery photos={posts} /> : <Text style={styles.noPosts}>No posts yet</Text>}
                
            <BottomHeader profileImageUrl={profileImageUrl}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        maxWidth: 600,
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    noPosts: {
        width: '100%',
        textAlign: 'center',
        color: '#808080',
    },
});

export default User;