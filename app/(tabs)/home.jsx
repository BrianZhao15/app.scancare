import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Linking } from 'react-native';

const popularProducts = [
  { 
    id: 1, 
    name: 'CeraVe Foaming Facial Cleanser', 
    url: 'https://www.cerave.com/skincare/cleansers/foaming-facial-cleanser',
    imageUrl: 'https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v3/foaming-facial-cleanser/700x875/cerave_foaming_facial_cleanser_12oz_front-700x875-v2.jpg'
  },
  { 
    id: 2, 
    name: 'The Ordinary Niacinamide 10% + Zinc 1%', 
    url: 'https://theordinary.com/product/niacinamide-10pct-zinc-1pct',
    imageUrl: 'https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw0c91e33e/Images/products/The%20Ordinary/rdn-niacinamide-10pct-zinc-1pct-30ml.png'
  },
  { 
    id: 3, 
    name: 'Paula\'s Choice 2% BHA Liquid Exfoliant', 
    url: 'https://www.paulaschoice.com/skin-perfecting-2pct-bha-liquid-exfoliant/201.html',
    imageUrl: 'https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dw8010b7d9/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png'
  },
];

const acneTypes = [
  { type: 'Hormonal Acne', products: ['Differin Gel', 'La Roche-Posay Effaclar Duo'] },
  { type: 'Cystic Acne', products: ['Renee Rouleau Anti-Cyst Treatment', 'Mario Badescu Buffering Lotion'] },
  { type: 'Whitehead and Blackhead', products: ['Paula\'s Choice 2% BHA Liquid Exfoliant', 'The Ordinary Salicylic Acid 2% Solution'] },
];

const Home = () => {
  const [selectedAcneType, setSelectedAcneType] = useState(null);

  const handleProductPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Skincare Products</Text>
      <ScrollView horizontal style={styles.productList}>
        {popularProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => handleProductPress(product.url)}
          >
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Products for Specific Acne Types</Text>
      {acneTypes.map((acneType) => (
        <TouchableOpacity
          key={acneType.type}
          style={styles.acneTypeItem}
          onPress={() => setSelectedAcneType(acneType)}
        >
          <Text style={styles.acneTypeName}>{acneType.type}</Text>
        </TouchableOpacity>
      ))}

      {selectedAcneType && (
        <View style={styles.acneTypeInfo}>
          <Text style={styles.acneTypeTitle}>{selectedAcneType.type}</Text>
          <Text style={styles.acneTypeProducts}>
            Recommended Products:
            {selectedAcneType.products.map((product) => (
              <Text key={product}>{'\n'}- {product}</Text>
            ))}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  productList: {
    flexDirection: 'row',
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    textAlign: 'center',
  },
  acneTypeItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  acneTypeName: {
    fontSize: 18,
  },
  acneTypeInfo: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
  },
  acneTypeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  acneTypeProducts: {
    fontSize: 16,
  },
});

export default Home;