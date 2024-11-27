import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';


function PhotoGallery({ photos, navigation }) { // Add navigation prop
    return (
      <View style={photoGalleryStyles.gallery}>
        {photos.map((photo, index) => (
          <TouchableOpacity 
            key={index} 
            style={photoGalleryStyles.photo} 
            onPress={() => navigation.navigate('Post', { postId: photo.id })} // Navigate to Post screen
          >
            <Image 
              source={{ uri: (photo.imageUrl).replace("\\", '/') }} 
              // source={ console.log(photo.imageUrl) }
              style={photoGalleryStyles.photoImage} 
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  
  const photoGalleryStyles = StyleSheet.create({
    gallery: {
      marginTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    photo: {
      width: '48%',
      marginBottom: 10,
    },
    photoImage: {
      width: '100%',
      height: 300, 
    },
  });

  export default PhotoGallery;