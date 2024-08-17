import { StatusBar } from 'expo-status-bar';
import { Image, Text, View} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { images } from '../constants';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image source={images.logo} style={{ width:400, height:400 }}/>
          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Slogan here
            </Text>
            {/* <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
            /> */}
            <View style={StyleSheet.container}>
              <Link href="/home" style={{ color: 'blue' }}>Home</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
