import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrdersScreen({ navigation }) {
  const { orders } = useContext(CartContext);

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <MaterialCommunityIcons name="receipt" size={100} color="#ccc" />
        <Text style={styles.emptyText}>No previous orders</Text>
        <TouchableOpacity 
          style={styles.browseBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.browseText}>Order Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id.toUpperCase()}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
      
      <Text style={styles.orderDate}>
        {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
      </Text>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsText}>
          {item.items.reduce((total, i) => total + i.quantity, 0)} items
        </Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.trackBtn}
        onPress={() => navigation.navigate('OrderTracking', { order: item })}
      >
        <Text style={styles.trackText}>Track / View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Orders</Text>
      
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  itemsText: {
    fontSize: 15,
    color: '#666',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4B3A',
  },
  trackBtn: {
    backgroundColor: '#FFF5F4',
    borderWidth: 1,
    borderColor: '#FF4B3A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackText: {
    color: '#FF4B3A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },
  browseBtn: {
    backgroundColor: '#FF4B3A',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  browseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
