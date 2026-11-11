import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderTrackingScreen({ route, navigation }) {
  const { order } = route.params;
  
  // Simulate order progress
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { title: 'Order Placed', desc: 'We have received your order', icon: 'clipboard-text-outline' },
    { title: 'Order Confirmed', desc: 'Restaurant confirmed your order', icon: 'check-decagram-outline' },
    { title: 'Preparing', desc: 'Your food is being prepared', icon: 'chef-hat' },
    { title: 'Out for Delivery', desc: 'Rider is on the way', icon: 'bike' },
    { title: 'Delivered', desc: 'Enjoy your food!', icon: 'emoticon-happy-outline' }
  ];

  useEffect(() => {
    // Automatically advance steps every 3 seconds for demonstration
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{order.id.toUpperCase()}</Text>
          <Text style={styles.amount}>${order.total.toFixed(2)}</Text>
        </View>

        <View style={styles.timeline}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepLeft}>
                <View style={[
                  styles.iconContainer, 
                  currentStep >= index ? styles.iconContainerActive : {}
                ]}>
                  <MaterialCommunityIcons 
                    name={step.icon} 
                    size={24} 
                    color={currentStep >= index ? "#fff" : "#999"} 
                  />
                </View>
                {index < steps.length - 1 && (
                  <View style={[
                    styles.line, 
                    currentStep > index ? styles.lineActive : {}
                  ]} />
                )}
              </View>
              <View style={styles.stepRight}>
                <Text style={[
                  styles.stepTitle, 
                  currentStep >= index ? styles.stepTitleActive : {}
                ]}>
                  {step.title}
                </Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {currentStep === steps.length - 1 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.homeBtn}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.homeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
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
  content: {
    padding: 20,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4B3A',
  },
  timeline: {
    paddingLeft: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  iconContainerActive: {
    backgroundColor: '#FF4B3A',
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: '#f0f0f0',
    marginTop: -5,
    marginBottom: -5,
    zIndex: 1,
  },
  lineActive: {
    backgroundColor: '#FF4B3A',
  },
  stepRight: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  stepTitleActive: {
    color: '#333',
  },
  stepDesc: {
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  homeBtn: {
    backgroundColor: '#FF4B3A',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
