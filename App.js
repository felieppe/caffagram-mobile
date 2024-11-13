import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TopHeader from './components/TopHeader';
import BottomHeader from './components/BottomHeader';

export default function App() {
  return (
    <View style={styles.container}>
      <TopHeader />
      <BottomHeader/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  botttomContainer: {
    justifyContent: 'flex-end',
  }
});