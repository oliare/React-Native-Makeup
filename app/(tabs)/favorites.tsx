import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Product {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: any;
}

const FavoritesScreen = ({ navigation }: { navigation: any }) => {
    const [favorites, setFavorites] = useState<Product[]>([
        // {
        //   id: '1',
        //   name: 'Matte Liquid Lipstick',
        //   brand: 'Luxury Cosmetics',
        //   price: '$24.99',
        //   image: require('@/assets/images/splash-icon.png'),
        // },
        // {
        //   id: '2',
        //   name: 'Hydrating Foundation',
        //   brand: 'Skin Perfect',
        //   price: '$34.99',
        //   image: require('@/assets/images/splash-icon.png'),
        // },
    ]);

    const handleRemove = (productId: string) => {
        setFavorites(prev => prev.filter(item => item.id !== productId));
    };

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />

            <View style={styles.productInfo}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)} >
                <FontAwesome name="heart" size={20} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <FontAwesome name="heart" size={60} color="#ccc" />
                    <Text style={styles.noFav}>No favorites yet</Text>
                    <Text style={styles.emptySubText}>Start adding your favorite products</Text>
                    <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Shop')} >
                        <Text style={styles.shopButtonText}>Explore Products</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList data={favorites} renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper} />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    productCard: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    productInfo: {
        marginBottom: 10,
    },
    brand: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#007bff',
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    listContent: {
        paddingHorizontal: 8,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noFav: {
        fontSize: 18,
        marginTop: 16,
    },
    emptySubText: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },
    shopButton: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    shopButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FavoritesScreen;