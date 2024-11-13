import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App!</Text>
      <Button
        title="Ir a Registro"
        onPress={() => navigation.navigate('Register')}  
      />
    </View>
  );
};

export default HomePage;
