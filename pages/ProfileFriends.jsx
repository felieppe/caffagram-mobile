import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { fetchProfileById } from '@/utils/api';
import TopHeader from '@/components/TopHeader';
import LeftNavbar from '@/components/menus/LeftNavbar';

function ProfileFriends({ user = {}, jwt = '' }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user.friends.length === 0) { return; }

        user.friends.forEach((friendID) => {
            fetchProfileById(friendID, jwt).then((friend) => {
                setFriends(prev => [...prev, friend.user]);
            }).catch((err) => { console.log(err); });
        });
    }, [user.friends]);

    if (!user) { return <Text>Loading...</Text>; }

    return (
        <>
            <TopHeader />

            <View style={styles.container}>
                <LeftNavbar user={user} actual={"FRIENDS"} />

                <View style={styles.friends}>
                    <View style={styles.friendsUser}>
                        <Image source={{ uri: user.profilePicture ? user.profilePicture : "/default-profile.webp" }} style={styles.profileImage} />
                        <View style={styles.friendUserInfo}>
                            <Text style={styles.username}>@{user.username}'s friends list</Text>
                            <Text>(You have {friends.length} friends)</Text>
                        </View>
                    </View>
                    <FlatList
                        data={friends}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.friend}>
                                <Image source={{ uri: item.profilePicture ? item.profilePicture : "/default-profile.webp" }} style={styles.friendPfp} />
                                <Text>@{item.username}</Text>
                            </View>
                        )}
                        ListEmptyComponent={<Text>No friends yet.</Text>}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    friends: {
        flex: 1,
    },
    friendsUser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
    },
    friendUserInfo: {
        marginLeft: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    friendPfp: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
});

export default ProfileFriends;