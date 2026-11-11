import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { order } = route.params;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
        <MaterialCommunityIcons name="check-circle" size={100} color="#4CAF50" />
      </Animated.View>

      <Text style={styles.title}>Order Successfully Placed!</Text>
      
      <View style={styles.detailsCard}>
        <Text style={styles.label}>Order Number</Text>
        <Text style={styles.value}>#{order.id.toUpperCase()}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Estimated Delivery Time</Text>
        <Text style={styles.value}>30 - 45 mins</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Total Amount</Text>
        <Text style={styles.value}>${order.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.trackBtn}
        onPress={() => navigation.replace('OrderTracking', { order })}
      >
        <Text style={styles.trackText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.homeBtn}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.homeText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  detailsCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  trackBtn: {
    backgroundColor: '#FF4B3A',
    borderRadius: 15,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  trackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeBtn: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4B3A',
  },
  homeText: {
    color: '#FF4B3A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
