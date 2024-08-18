import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';

const RoboflowWebView = () => {
  const webViewRef = useRef(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const runModel = () => {
    webViewRef.current.injectJavaScript(`
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
    `);
  };

  const evaluateAcne = (predictions) => {
    let severity = 'mild';
    let count = {
      'blackhead': 0,
      'whitehead': 0,
      'papule': 0,
      'pustule': 0,
      'nodule': 0,
      'cyst': 0
    };

    predictions.forEach(pred => {
      count[pred.class] += 1;
    });

    if (count.nodule > 0 || count.cyst > 0) {
      severity = 'severe';
    } else if (count.papule > 5 || count.pustule > 5) {
      severity = 'moderate';
    }

    return `${severity} acne`;
  };

  const getRecommendations = (severity) => {
    const recommendations = [
      "Cleanse your face twice daily with a gentle, non-comedogenic cleanser.",
      "Use non-comedogenic and oil-free skincare products and makeup.",
      "Avoid touching your face frequently and don't pop or squeeze pimples.",
      "Stay hydrated and maintain a balanced diet."
    ];

    if (severity === 'moderate' || severity === 'severe') {
      recommendations.push(
        "Consider using over-the-counter treatments containing benzoyl peroxide or salicylic acid.",
        "Consult a dermatologist for prescription treatments if OTC options aren't effective."
      );
    }

    if (severity === 'severe') {
      recommendations.push(
        "A dermatologist may recommend prescription oral medications or other advanced treatments.",
        "Be consistent with your treatment plan and follow up regularly with your dermatologist."
      );
    }

    return recommendations;
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
                          const base64 = reader.result.split(',')[1];
                          const img = document.getElementById('imageElement');
                          img.onload = () => {
                            model.detect(img).then(function(predictions) {
                              window.ReactNativeWebView.postMessage(JSON.stringify(predictions));
                            });
                          };
                          img.src = "data:image/jpeg;base64," + base64;
                        };
                        reader.readAsDataURL(file);
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
          const acneDiagnosis = evaluateAcne(predictions);
          setDiagnosis(acneDiagnosis);
          setRecommendations(getRecommendations(acneDiagnosis.split(' ')[0]));
        }}
        style={styles.webview}
      />
      <Button title="Upload Photo" onPress={runModel} />
      <ScrollView style={styles.resultsContainer}>
        {diagnosis && (
          <View>
            <Text style={styles.diagnosisText}>Diagnosis: {diagnosis}</Text>
            <Text style={styles.recommendationsTitle}>Recommendations:</Text>
            {recommendations.map((rec, index) => (
              <Text key={index} style={styles.recommendationItem}>• {rec}</Text>
            ))}
          </View>
        )}
      </ScrollView>
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
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  diagnosisText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  recommendationItem: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default RoboflowWebView;