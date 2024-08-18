import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { WebView } from 'react-native-webview';

const CameraPage = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const webViewRef = useRef(null);

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
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const runModel = () => {
    webViewRef.current.injectJavaScript(`
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
    `);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(',')[1];

      webViewRef.current.injectJavaScript(`
        const img = document.getElementById('imageElement');
        img.onload = () => {
          model.detect(img).then(function(predictions) {
            window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
          });
        };
        img.src = "data:image/jpeg;base64,${base64}";
      `);
    };

    reader.readAsDataURL(file);
  };

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
  
        // Convert image to base64 and inject into WebView
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          const jsCode = `
            // Ensure the WebView content is loaded
            if (typeof roboflow !== 'undefined') {
              const img = document.getElementById('imageElement');
              img.src = "data:image/jpeg;base64,${base64}";
  
              img.onload = () => {
                console.log('Image loaded for detection');
                model.detect(img).then(predictions => {
                  console.log('Predictions:', predictions);
                  window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
                }).catch(error => {
                  console.error('Error during prediction:', error);
                });
              };
            } else {
              console.error('Roboflow model is not loaded');
            }
          `;
          webViewRef.current.injectJavaScript(jsCode);
        };
  
        reader.readAsDataURL(blob);
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
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <head>
                <script src="https://cdn.roboflow.com/0.2.26/roboflow.js"></script>
              </head>
              <body>
                <input type="file" id="fileInput" style="display:none;" />
                <img id="imageElement" style="max-width: 100%; height: auto;" />
                <script>
                  roboflow.auth({ publishable_key: "rf_WtYiuyT2mBbUXQsQbLjhnZiW67f1" })
                    .load({ model: "scancare", version: 1 })
                    .then(function(model) {
                      document.getElementById('fileInput').addEventListener('change', (event) => {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                          const base64 = reader.result.split(',')[1]; // Extract base64 data
                          const img = document.getElementById('imageElement');
                          img.onload = () => {
                            model.detect(img).then(function(predictions) {
                              window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
                            });
                          };
                          img.src = "data:image/jpeg;base64," + base64;
                        };
                        reader.readAsDataURL(file); // Convert file to base64
                      });
                    });

                  // Receive base64 image from React Native
                  window.ReactNativeWebView.onMessage = (event) => {
                    const base64 = event.data;
                    const img = document.getElementById('imageElement');
                    img.onload = () => {
                      roboflow.detect(img).then(function(predictions) {
                        window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
                      });
                    };
                    img.src = "data:image/jpeg;base64," + base64;
                  };
                </script>
              </body>
            </html>
          `,
        }}
        onMessage={(event) => {
          const predictions = JSON.parse(event.nativeEvent.data);
          console.log("Predictions:", predictions);
        }}
        style={styles.webview}
      />
      <Button title="Upload File" onPress={runModel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  captureButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '10%',
  },
});

export default CameraPage;
