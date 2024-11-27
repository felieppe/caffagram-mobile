import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faHeart as faFilledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchFeed, likePost, removeLike, fetchProfileById } from '../utils/api';

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState('/default-profile.webp');
  const [user, setUser] = useState(null)
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (user && jwt) {
      fetchProfileById(user._id, jwt)
        .then(profile => {
          const profilePic = profile.user.profilePicture || "/default-profile.webp";
          console.log("Setting profileImageUrl to:", profilePic);
          setProfileImageUrl(profilePic);
        })
        .catch(error => console.error("Error fetching profile:", error));
    }
  }, []);

  const handleLike = (id) => {
    if (!jwt) return;

    const postToUpdate = posts.find(post => post._id === id); 
    if (!postToUpdate.likes.includes(user._id)) {
      likePost(id, jwt).then((_) => {
        setPosts(posts.map(post => {
          if (post._id === id) {
            return { 
              ...post, 
              liked: !post.liked, 
              likes: [...post.likes, user._id] 
            };
          }
          return post;
        }));
      });
    } else { 
      handleUnlike(id); 
    }
  };

  const handleUnlike = (id) => {
    if (!jwt) return;

    removeLike(id, jwt).then((_) => {
      setPosts(posts.map(post => {
        if (post._id === id) {
          return { 
            ...post, 
            liked: !post.liked, 
            likes: post.likes.filter(like => like !== user._id) 
          };
        }
        return post;
      }));
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then((jwt) => {
      setJwt(jwt);
      fetchFeed(jwt).then((psts) => { setPosts(psts); });
    });
  }, [jwt])

  useEffect(() => {
    AsyncStorage.getItem('user').then((usr) => { setUser(JSON.parse(usr)); });
  }, [user])

  if (!user) { return <View><Text>Loading...</Text></View>; }
  if (!jwt) { navigation.navigate('Login'); }

  return (
    <View style={styles.container}>
      <TopHeader />

      <View style={styles.content}>
        <ScrollView style={styles.feed}> 
          {posts.map(post => (
            <View key={post._id} style={styles.post}>
              <View style={styles.post__top}>
                <TouchableOpacity style={styles.post__top__user}> 
                  <Image 
                    // source={{ uri: post.user.profilePicture || '/default-profile.webp' }}
                    source={ post.user.profilePicture && post.user.profilePicture != "/default-profile.webp" ? { uri: post.user.profilePicture } : require('../public/default-profile.webp') }
                    style={styles.post__top__user__img} 
                  />
                  <Text>@{post.user.username}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.post__top__options}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </TouchableOpacity>
              </View> 

              <Image 
                source={{ uri: "http://192.168.0.27:3001/" + (post.imageUrl).replace("\\", '/') }} 
                style={styles.post__image}
                resizeMode='contain'
                onError={(error) => { console.error("Image load error:", error) }}
              />

              <View style={styles.post__actions}>
                <TouchableOpacity onPress={() => handleLike(post._id)}>
                  <FontAwesomeIcon 
                    icon={post.likes.includes(user._id) ? faFilledHeart : faEmptyHeart} 
                    style={[styles.post__actionIcon, post.likes.includes(user._id) && styles.post__liked]} 
                  />
                </TouchableOpacity>
                <FontAwesomeIcon icon={faComment} style={styles.post__actionIcon} />
              </View>

              <Text style={styles.post__likes}>{post.likes.length} Likes</Text>

              <View style={styles.post__description}>
                <Text style={styles.post__descriptionUsername}>{post.user.username}</Text>
                <Text>{post.caption}</Text>
              </View>

              {post.comments.length > 0 && (
                <TouchableOpacity style={styles.post__comments}>
                  <Text>View all {post.comments.length} comments</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <BottomHeader profileImageUrl={profileImageUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  feed: {
    flex: 1,
    padding: 10,
  },
  post: {
    marginBottom: 20,
    maxWidth: 400, 
  },
  post__top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  post__top__user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  post__top__user__img: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    marginRight: 10,
  },
  post__top__options: {
    padding: 10,
  },
  post__image: {
    width: '100%',
    height: 300, 
    resizeMode: 'contain', 
  },
  post__actions: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  post__actionIcon: {
    marginRight: 15,
    fontSize: 20, 
  },
  post__liked: {
    color: '#D22B2B',
  },
  post__likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  post__description: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  post__descriptionUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  post__comments: {
    marginTop: 5,
  },
});