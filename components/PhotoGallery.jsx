import React from 'react';
import { View, Image, FlatList, StyleSheet, Text, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

function PhotoGallery({ photos }) {
    const renderItem = ({ item }) => {
        const imageUrl = item.imageUrl;

        if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
            console.error('Invalid image URL:', imageUrl);
            return <Text style={styles.errorText}>Invalid image URL</Text>;
        }

        return (
            <Image
                source={{ uri: imageUrl }}
                style={styles.photo}
                onError={() => console.error(`Failed to load image: ${imageUrl}`)}
            />
        );
    };

    return (
        <FlatList
            data={photos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
    );
}

const styles = StyleSheet.create({
    photo: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        margin: 5, // Espaciado entre imágenes
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default PhotoGallery;
