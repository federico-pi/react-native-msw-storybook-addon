import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';

export default function App() {
  const onPress = () => console.log('fetched');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Click to fetch" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
