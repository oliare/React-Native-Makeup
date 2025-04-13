import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchInput from '@/components/search/SearchInput';
import { fetchMakeupProducts, fetchProductCategories } from '@/lib/api';
import Loader from '@/components/loader/Loader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/redux/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '@/redux/store';
import { addToCart, removeFromCart } from '@/redux/slices/cartSlice';

export default function SearchScreen() {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('all');
  const [loading, setLoading] = useState(true);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cart = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMakeupProducts();
      setProducts(data);
      const productCategories = fetchProductCategories(data);
      setCategories(['all', ...await productCategories]);
      setLoading(false)

      const saved = await AsyncStorage.getItem('favorites');
      if (saved) {
        const favoritesList = JSON.parse(saved);
        favoritesList.forEach((item: Product) => {
          dispatch(addToFavorites(item));
        });
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory == 'all'
    ? products
    : products.filter((product: { type: any; }) => product.type == selectedCategory);

  const handleAddToFavorite = async (item: Product) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(item.id));
      const upd = favorites.filter(fav => fav.id !== item.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(upd));
    } else {
      dispatch(addToFavorites(item));
      const upd = [...favorites, item];
      await AsyncStorage.setItem('favorites', JSON.stringify(upd));
    }
  };

  const handleAddToCart = async (item: Product) => {
    const isOnCart = cart.some(fav => fav.id === item.id);

    if (isOnCart) {
      dispatch(removeFromCart(item.id));
      const upd = cart.filter(fav => fav.id !== item.id);
      await AsyncStorage.setItem('cart', JSON.stringify(upd));
    } else {
      dispatch(addToCart(item));
      const upd = [...cart, item];
      await AsyncStorage.setItem('cart', JSON.stringify(upd));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchInput />

          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.categoryButton, selectedCategory == item && styles.activeCategory]}
                onPress={() => setSelectedCategory(item)}>
                <Text style={[styles.categoryText, selectedCategory == item && styles.activeCategoryText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />

          <FlatList
            data={filteredProducts.slice(0, 30)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconsCol}>
                  <TouchableOpacity onPress={() => handleAddToFavorite(item)}>
                    <Ionicons
                      name={favorites.some(i => i.id === item.id) ? 'heart' : 'heart-outline'}
                      size={22}
                      color="#840094"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleAddToCart(item)} style={{ marginTop: 10 }}>
                    <Ionicons
                      name={cart.some(i => i.id === item.id) ? 'bag-handle' : 'bag-outline'}
                      size={22} color="#840094"
                    />
                  </TouchableOpacity>
                </View>

                <Image
                  source={
                    // item.image_link
                    //   ? { uri: item.image_link }
                    //   : 
                    require('@/assets/images/cosmetics-holder.png')
                  }
                  style={styles.image}
                />
                <Text numberOfLines={1} style={styles.brand}>{item.brand}</Text>
                <Text numberOfLines={1}>{item.name}</Text>
                <Text>{item.price ? `₴${item.price}` : 'no price'}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 10 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategory: {
    borderWidth: 0.6,
    borderColor: '#840094',
  },
  categoryText: {
    color: '#666',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  activeCategoryText: {
    color: '#840094',
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 8,
    padding: 10,
    borderRadius: 12,
    maxWidth: '48%',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    opacity: 0.3
  },
  brand: {
    fontSize: 12,
    color: '#888',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconsCol: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
});