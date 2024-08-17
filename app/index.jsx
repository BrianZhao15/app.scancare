import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { images } from '../constants';
import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image source={images.logo} style={{ width: 400, height: 400 }} />
          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              Slogan here
            </Text>
            <View style={StyleSheet.container}>
              {/* Existing link to Home */}
              <Link href="/home" style={{ color: 'blue', marginVertical: 10 }}>Home</Link>
              {/* New link to Camera Page */}
              <Link href="/camera" style={{ color: 'blue', marginVertical: 10 }}>Open Camera</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
