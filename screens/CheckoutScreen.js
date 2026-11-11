import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, getSubtotal, placeOrder } = useContext(CartContext);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const subtotal = getSubtotal();
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  const paymentMethods = ['Cash on Delivery', 'GCash', 'Pay at Store'];

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      alert('Please fill in all delivery details');
      return;
    }

    const orderDetails = {
      customerName: name,
      phone,
      address,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    };

    const newOrder = placeOrder(orderDetails);
    navigation.replace('OrderConfirmation', { order: newOrder });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#666" style={styles.iconTop} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Complete Delivery Address"
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method} 
              style={[styles.paymentOption, paymentMethod === method && styles.paymentOptionSelected]}
              onPress={() => setPaymentMethod(method)}
            >
              <MaterialCommunityIcons 
                name={paymentMethod === method ? "radiobox-marked" : "radiobox-blank"} 
                size={24} 
                color={paymentMethod === method ? "#FF4B3A" : "#666"} 
              />
              <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextSelected]}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={styles.summaryItemText}>{item.quantity}x {item.name}</Text>
                <Text style={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryPrice}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Delivery Fee</Text>
              <Text style={styles.summaryPrice}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  iconTop: {
    marginRight: 10,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  paymentOptionSelected: {
    borderColor: '#FF4B3A',
    backgroundColor: '#FFF5F4',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  paymentTextSelected: {
    fontWeight: 'bold',
    color: '#FF4B3A',
  },
  orderSummary: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryItemText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
  summaryPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4B3A',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  placeOrderBtn: {
    backgroundColor: '#FF4B3A',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
