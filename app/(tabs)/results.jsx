// // Results.jsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { usePredictions } from './PredictionsContext';

// const Results = () => {
//   const { predictions } = usePredictions();
//   const [diagnosis, setDiagnosis] = useState('');
//   const [recommendations, setRecommendations] = useState('');

//   useEffect(() => {
//     if (predictions && predictions.length > 0) {
//       const newDiagnosis = diagnoseAcne(predictions);
//       setDiagnosis(newDiagnosis);
//       setRecommendations(getRecommendations(newDiagnosis));
//     }
//   }, [predictions]);

//   const diagnoseAcne = (predictions) => {
//     const acneTypes = {
//       blackheads: 0,
//       'dark spot': 0,
//       nodules: 0,
//       papules: 0,
//       pustules: 0,
//       whiteheads: 0,
//     };

//     predictions.forEach(pred => {
//       if (acneTypes.hasOwnProperty(pred.class)) {
//         acneTypes[pred.class]++;
//       }
//     });

//     if (acneTypes.nodules > 0 || acneTypes.pustules > 0) {
//       return "Severe Acne";
//     } else if (acneTypes.papules > 0 || acneTypes.whiteheads > 3 || acneTypes.blackheads > 3) {
//       return "Moderate Acne";
//     } else if (acneTypes.whiteheads > 0 || acneTypes.blackheads > 0 || acneTypes['dark spot'] > 0) {
//       return "Mild Acne";
//     } else {
//       return "No significant acne detected";
//     }
//   };

//   const getRecommendations = (diagnosis) => {
//     switch (diagnosis) {
//       case "Severe Acne":
//         return "Consult a dermatologist. Use a gentle cleanser, benzoyl peroxide treatment, and non-comedogenic moisturizer.";
//       case "Moderate Acne":
//         return "Use salicylic acid cleanser, spot treatment with benzoyl peroxide, and oil-free moisturizer.";
//       case "Mild Acne":
//         return "Use a gentle cleanser with salicylic acid, apply tea tree oil as a spot treatment, and use a light, oil-free moisturizer.";
//       default:
//         return "Maintain a basic skincare routine with a gentle cleanser, moisturizer, and sunscreen.";
//     }
//   };

//   if (!predictions || predictions.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>No predictions available yet</Text>
//         <Text>Take a photo to see results</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Acne Diagnosis</Text>
//         <Text style={styles.diagnosis}>{diagnosis}</Text>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.title}>Recommendations</Text>
//         <Text style={styles.recommendations}>{recommendations}</Text>
//       </View>
//       <View style={styles.card}>
//         <Text style={styles.title}>Detected Acne Types</Text>
//         {predictions.map((pred, index) => (
//           <Text key={index} style={styles.prediction}>
//             {pred.class}: {(pred.confidence * 100).toFixed(2)}% confidence
//           </Text>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };



// export default Results;