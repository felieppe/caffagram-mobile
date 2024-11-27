import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';
import UserContext from '../UserContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || !AsyncStorage.getItem('token')) { navigation.navigate('Login'); }
  }, [])

  return (
    <View style={styles.container}>
      <TopHeader />
      <View style={styles.content}>
        <Text>Home Screen</Text>
        {user ? (
          <Text>Welcome, {user.username}</Text>
        ) : (
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </View>
      <BottomHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});