import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

function PhotoGallery({ photos }) {
    return (
        <FlatList
            data={photos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Image source={{ uri: item.imageUrl }} style={styles.photo} />
            )}
            numColumns={3}
        />
    );
}

const styles = StyleSheet.create({
    photo: {
        width: '33%',
        height: 100,
    },
});

export default PhotoGallery;