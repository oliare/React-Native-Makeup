import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import SearchInput from '@/components/search/SearchInput';
import { fetchMakeupProducts, fetchProductBrands } from '@/lib/api';

const BANNER_IMAGES = [
  require('@/assets/images/img_1.jpg'),
  require('@/assets/images/img_2.jpg'),
  require('@/assets/images/img_3.avif'),
  require('@/assets/images/img_4.jpg'),
];


export default function HomePage() {
  const [products, setProducts] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMakeupProducts();
        setProducts(data);
        const brandsData = await fetchProductBrands(data);
        setBrands(brandsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const renderBannerItem = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={[styles.bannerImage, { width, height: 400 }]}
      resizeMode="cover"
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SearchInput />

        <View style={styles.bannerContainer}>

          <FlatList
            horizontal
            pagingEnabled
            data={BANNER_IMAGES}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveBannerIndex(index);
            }}
          />

          <View style={styles.pagination}>
            {BANNER_IMAGES.map((_, index) => (
              <View key={index}
                style={[
                  styles.paginationDot,
                  index === activeBannerIndex && styles.activeDot
                ]}
              />
            ))}
          </View>

          {/* <Image source={require('@/assets/images/splash-icon.png')} style={styles.heroImage} /> */}
          <View style={styles.heroContent}>
            <Link href="/search" asChild>
              <TouchableOpacity style={styles.shopButton}>
                <Text style={styles.shopButtonText}>Explore Products</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brands</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#840094" />
          ) : (
            <FlatList
              horizontal
              data={brands}
              renderItem={({ item }) => (
                <Link href={`/`} asChild>
                  <Pressable style={styles.brandCard}>
                    {item.logo ? (
                      <Image
                        source={{ uri: item.logo }}
                        style={{ width: 50, height: 50, resizeMode: 'contain' }}
                      />
                    ) : (
                      <FontAwesome
                        name="shopping-bag"
                        size={32}
                        color={'#840094'}
                      />
                    )}
                    <Text style={styles.brandName}>
                      {item.name ? (item.name.length > 10 ? `${item.name.slice(0, 10)}...` : item.name) : ''}
                    </Text>
                  </Pressable>
                </Link>
              )}
              keyExtractor={(item) => item.name}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hits</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#840094" />
          ) : (
            <FlatList
              horizontal
              data={products}
              renderItem={({ item }) => (
                <Link href={`/`} asChild>
                  <Pressable style={styles.productCard}>
                    <Image
                      source={
                        // item.image_link
                        //   ? { uri: item.image_link }
                        //   : 
                        require('@/assets/images/cosmetics-holder.png')
                      }
                      style={styles.productImage}
                    />
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating ? item.rating : '0.0'}</Text>
                    </View>
                    <Text style={styles.priceText}>${item.price}</Text>
                  </Pressable>
                </Link>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
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
  bannerContainer: {
    position: 'relative',
    height: 400,
  },
  bannerImage: {
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
  shopButton: {
    backgroundColor: '#fff',
    opacity: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 20,
    alignSelf: 'flex-start',
    shadowOffset: { width: 6, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  shopButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
  brandCard: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    marginTop: 8,
    color: Colors.light.text,
    fontWeight: '500',
  },
  productCard: {
    width: 180,
    marginRight: 25
  },
  productImage: {
    backgroundColor: '#ccc',
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    opacity: 0.2,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
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
  // banner
  pagination: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: 5
  },
  activeDot: {
    backgroundColor: '#fff'
  },
});