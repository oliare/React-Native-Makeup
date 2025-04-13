import React from 'react';
import { View, Text, Image, FlatList, Pressable, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import SearchInput from '@/components/search/SearchInput';

const categories = [
  { id: '1', name: 'Eye', icon: 'eye' },
  { id: '2', name: 'Lips', icon: 'smile-o' },
  { id: '3', name: 'Face', icon: 'user-circle' },
  { id: '4', name: 'Body', icon: 'child' },
  { id: '5', name: 'Nails', icon: 'hand-peace-o' },
  { id: '6', name: 'Hair', icon: 'cut' },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Shadows palette PRO',
    price: '₴1200',
    image: require('@/assets/images/icon.png'),
    rating: 4.8
  },
  {
    id: '2',
    name: 'Lipstick Set',
    price: '₴850',
    image: require('@/assets/images/icon.png'),
    rating: 4.9
  },
  {
    id: '3',
    name: 'Foundation',
    price: '₴650',
    image: require('@/assets/images/icon.png'),
    rating: 4.7
  },
];


export default function HomePage() {

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView style={styles.container}>
        <SearchInput />

        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/splash-icon.png')}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>-50% </Text>
            <Link href="/search" asChild>
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Explore Products</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => (
              <Link href={`/`} asChild>
                <Pressable style={styles.categoryCard}>
                  <FontAwesome
                    name={item.icon as any}
                    size={32}
                    color={'#840094'}
                  />
                  <Text style={styles.categoryName}>{item.name}</Text>
                </Pressable>
              </Link>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hits</Text>
          <FlatList
            horizontal
            data={featuredProducts}
            renderItem={({ item }) => (
              <Link href={`/`} asChild>
                <Pressable style={styles.productCard}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </Pressable>
              </Link>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productsContainer}
          />
        </View>

        <View style={styles.saleBanner}>
          <Text style={styles.saleText}>DISCOUNTS UP TO -70%</Text>
          <Text style={styles.saleSubtext}>This week only</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    position: 'relative',
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 3,
  },
  shopButton: {
    backgroundColor: '#fff',
    opacity: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
    alignSelf: 'flex-start',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  shopButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
  },
  categoriesContainer: {
    paddingLeft: 5,
  },
  categoryCard: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  categoryName: {
    marginTop: 8,
    color: Colors.light.text,
    fontWeight: '500',
  },
  productsContainer: {
    paddingLeft: 5,
  },
  productCard: {
    width: 220,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  saleBanner: {
    margin: 20,
    padding: 30,
    backgroundColor: "#e3bcdc",
    borderRadius: 15,
    alignItems: 'center',
    color: 'black',

    shadowColor: 'violet',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  saleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  saleSubtext: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
});