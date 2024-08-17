import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      </ScrollView>
    </SafeAreaView>
  );
}
