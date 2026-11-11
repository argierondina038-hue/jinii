import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('@cart');
      const storedOrders = await AsyncStorage.getItem('@orders');
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (error) {
      console.log('Error loading data', error);
    }
  };

  const saveCart = async (newCart) => {
    try {
      setCart(newCart);
      await AsyncStorage.setItem('@cart', JSON.stringify(newCart));
    } catch (error) {
      console.log('Error saving cart', error);
    }
  };

  const saveOrders = async (newOrders) => {
    try {
      setOrders(newOrders);
      await AsyncStorage.setItem('@orders', JSON.stringify(newOrders));
    } catch (error) {
      console.log('Error saving orders', error);
    }
  };

  const addToCart = (food, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.id === food.id);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...food, quantity }]);
    }
  };

  const removeFromCart = (foodId) => {
    saveCart(cart.filter(item => item.id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    const newCart = cart.map(item => 
      item.id === foodId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      items: [...cart],
      status: 'Order Placed',
      ...orderDetails
    };
    saveOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      getSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
