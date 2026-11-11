import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoryCard({ category, isSelected, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && styles.cardSelected]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
        <MaterialCommunityIcons 
          name={category.icon} 
          size={24} 
          color={isSelected ? '#fff' : '#666'} 
        />
      </View>
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardSelected: {
    // Optionally add some background to the whole card
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainerSelected: {
    backgroundColor: '#FF4B3A',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  nameSelected: {
    color: '#FF4B3A',
    fontWeight: 'bold',
  },
});
