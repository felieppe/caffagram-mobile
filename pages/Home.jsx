import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TopHeader from '../components/TopHeader';
import BottomHeader from '../components/BottomHeader';
import UserContext from '../UserContext'; 

export default function Home({ navigation }) {
  const { user } = useContext(UserContext);

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