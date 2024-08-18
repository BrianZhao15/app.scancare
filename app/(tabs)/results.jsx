import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, StyleSheet } from 'react-native';

const RoboflowWebView = () => {
  const webViewRef = useRef(null);

  const runModel = () => {
    webViewRef.current.injectJavaScript(`
      const fileInput = document.getElementById('fileInput');
      fileInput.click(); // Trigger the file input dialog
    `);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // Extract base64 data

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

    reader.readAsDataURL(file); // Convert file to base64
  };

  return (
    <View style={styles.container}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default RoboflowWebView;
