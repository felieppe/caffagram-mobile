import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PostView = ({ route }) => {
  const { id } = route.params;  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://your-api-url/api/post/${id}`); 
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar el post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
};


export default PostView;
