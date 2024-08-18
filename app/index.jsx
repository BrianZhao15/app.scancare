import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { images } from '../constants';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Image source={images.logo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.appNameText}>ScanCare</Text>
            <Text style={styles.sloganText}>
              Your Personal Skin Care Assistant
            </Text>
          </View>
          <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home')}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  appNameText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  sloganText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  homeButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  homeButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
