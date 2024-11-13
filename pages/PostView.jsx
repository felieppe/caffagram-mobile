import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostView = () => {
  const profilePicture = 'https://example.com/zarasa.jpg';
  const post = {
    user: {
      username: 'Zarasa del Sabor',
      profilePicture: 'https://example.com/zarasa.jpg',
    },
    imageUrl: 'https://example.com/zarasa.jpg',
    likes: ['1', '2'],
    comments: [
      { _id: '1', user: { username: 'Luciano' }, text: 'Tremenda foto!' },
      { _id: '2', user: { username: 'Alfredo' }, text: 'Tremenda pilcha Loco!' },
    ],
  };

  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleLike = () => {
    console.log(`Liked post by user`);
  };

  const handleComment = async () => {
    if (!newComment) {
      setError('El comentario no puede estar vacío');
      return;
    }
    try {
      const jwt = "tu_token_jwt";
      setNewComment('');
      setError('');
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      setError('Error al agregar el comentario. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.profilePicture }} style={styles.profilePic} />
        <Text style={styles.username}>@{post.user.username}</Text>
      </View>

      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike}>
          <Text style={post.likes.includes('user_id') ? styles.liked : styles.unliked}>❤️</Text>
        </TouchableOpacity>
        <Text>{post.likes.length} Likes</Text>
      </View>

      <View style={styles.comments}>
        {post.comments.map(comment => (
          <View key={comment._id} style={styles.comment}>
            <Text style={styles.commentUsername}>{comment.user.username}</Text>
            <Text>{comment.text}</Text>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Escribe un comentario..."
      />
      <Button title="Comentar" onPress={handleComment} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  liked: {
    fontSize: 20,
    color: 'red',
  },
  unliked: {
    fontSize: 20,
    color: 'grey',
  },
  comments: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default PostView;
