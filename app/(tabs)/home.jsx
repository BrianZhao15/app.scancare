import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Fetch product recommendations and reminders
    fetchProducts();
    fetchReminders();
  }, []);

  const fetchProducts = () => {
    // Simulating API call to fetch product recommendations
    setProducts([
      { id: 1, name: 'Gentle Cleanser', image: 'https://example.com/cleanser.jpg' },
      { id: 2, name: 'Hydrating Moisturizer', image: 'https://example.com/moisturizer.jpg' },
      { id: 3, name: 'Vitamin C Serum', image: 'https://example.com/serum.jpg' },
    ]);
  };

  const fetchReminders = () => {
    // Simulating API call to fetch reminders
    setReminders([
      { id: 1, time: '08:00 AM', task: 'Morning Routine' },
      { id: 2, time: '08:00 PM', task: 'Evening Routine' },
    ]);
  };

  const addReminder = () => {
    // Navigate to Add Reminder screen
    console.log('Navigate to Add Reminder screen');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Skincare Routine</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminders</Text>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderItem}>
            <FontAwesome name="clock-o" size={24} color="#4a4a4a" />
            <View style={styles.reminderText}>
              <Text style={styles.reminderTime}>{reminder.time}</Text>
              <Text style={styles.reminderTask}>{reminder.task}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          <FontAwesome name="plus" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    textAlign: 'center',
    fontSize: 14,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reminderText: {
    marginLeft: 15,
  },
  reminderTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderTask: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Home;