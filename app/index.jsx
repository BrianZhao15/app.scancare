import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { images } from '../constants';
import { useState } from 'react';

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Image source={images.logo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.sloganText}>
              Slogan here
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
    width: 400,
    height: 400,
    marginBottom: -20, // Move the logo up
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
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
    backgroundColor: 'blue',
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
