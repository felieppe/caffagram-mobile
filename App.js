import React from 'react';
import { StyleSheet, View } from 'react-native';
import PostView from './pages/PostView';

export default function App() {
  return (
    <View style={styles.container}>
      <PostView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
