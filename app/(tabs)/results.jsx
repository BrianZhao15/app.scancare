import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ResultsPage = ({ route }) => {
  // Destructure predictions from route.params with a fallback to an empty array
  const { predictions = [] } = route?.params || {};

  // Function to generate diagnosis based on predictions
  const generateDiagnosis = (predictions) => {
    // Implement logic based on your specific model's predictions
    // For example:
    if (predictions.some(prediction => prediction.class === 'specificCondition')) {
      return 'Diagnosis: Specific Condition Detected';
    } else {
      return 'Diagnosis: No Specific Condition Detected';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Predictions:</Text>
        <Text>{JSON.stringify(predictions, null, 2)}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Diagnosis:</Text>
        <Text>{generateDiagnosis(predictions)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ResultsPage;
