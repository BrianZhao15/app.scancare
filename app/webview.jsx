import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button } from 'react-native';

const RoboflowWebView = () => {
  const webViewRef = useRef(null);

  const runModel = () => {
    webViewRef.current.injectJavaScript(`
      const video = document.querySelector('video');
      model.detect(video).then(function(predictions) {
        window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
      });
    `);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <head>
                <script src="https://roboflow.js"></script>
              </head>
              <body>
                <video id="videoElement" autoplay></video>
                <script>
                  roboflow.auth({
                    publishable_key: "rf_WtYiuyT2mBbUXQsQbLjhnZiW67f1"
                  }).load({
                    model: "scancare",
                    version: 1
                  }).then(function(model) {
                    // model has loaded!
                    const video = document.getElementById('videoElement');
                    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                      video.srcObject = stream;
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
        style={{ flex: 1 }}
      />
      <Button title="Run Model" onPress={runModel} />
    </View>
  );
};


export default RoboflowWebView;
