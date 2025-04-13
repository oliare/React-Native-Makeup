import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function CartPage() {

  return (
    <View style={styles.container}>
      <View style={styles.emptyCart}>
        <FontAwesome name="shopping-cart" size={60} color="#ddd" />
        <Text style={styles.emptyText}>Your basket is empty</Text>
        <Text style={styles.emptySubText}>Start adding your favorite products</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Go shop</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  shopButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 83,
    borderRadius: 15,
    marginTop: 1,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 20,
    color: Colors.light.text,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
});