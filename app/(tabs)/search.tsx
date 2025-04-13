import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchInput from '@/components/search/SearchInput';
import { fetchMakeupProducts, fetchProductCategories } from '@/lib/api';
import Loader from '@/components/loader/Loader';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function SearchScreen() {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('all');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMakeupProducts();
      setProducts(data);
      const productCategories = fetchProductCategories(data);
      setCategories(['all', ...await productCategories]);
      setLoading(false)
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory == 'all'
    ? products
    : products.filter((product: { type: any; }) => product.type == selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)} >
                  <FontAwesome name={favorites.includes(item.id) ? 'heart' : 'heart-o'} size={20} color="#840094" />
                </TouchableOpacity>
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

});