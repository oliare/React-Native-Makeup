import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart } from '@/redux/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price ? Number(item.price) : 0), 0).toFixed(2);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
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
      ) : (
        <View style={styles.cartContainer}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text>{item.price ? `₴${item.price}` : 'no price'}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                  <Ionicons name={'bag-remove'} size={26} color="#840094" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>₴{total}</Text>
          </View>

          <Link href="/" asChild>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
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
  cartContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    // borderColor: '#EBE0EC',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FAF6FB'
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: ''
  },
  cartList: {
    paddingBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#840094',
  },
  checkoutButton: {
    backgroundColor: '#840094',
    paddingVertical: 12,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});