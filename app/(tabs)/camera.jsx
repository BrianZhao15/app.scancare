import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';

const CameraPage = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (permission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        onPictureSaved(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const onPictureSaved = async (photo) => {
    console.log('Photo saved:', photo);
    const imageUri = photo.uri;

    if (imageUri) {
        try {
            await MediaLibrary.saveToLibraryAsync(imageUri);
            console.log('Photo successfully saved to gallery');
        } catch (error) {
            console.error('Error saving photo to gallery:', error);
        }
    } else {
        console.error('No valid URI found in the photo object');
    }
};

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}> 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.text}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraPage;