import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromFavorites } from '@/redux/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }: { navigation: any }) => {
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    const handleRemove = async (productId: number) => {
        dispatch(removeFromFavorites(productId));

        const updatedFavorites = favorites.filter((item) => item.id !== productId);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.productCard}>
            <Image source={// item.image_link
                //   ? { uri: item.image_link }
                //   : 
                require('@/assets/images/cosmetics-holder.png')}
                style={styles.productImage} />

            <View style={styles.productInfo}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>

            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)} >
                <FontAwesome name="heart" size={20} color="#840094" />
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
                    keyExtractor={item => item.toString()}
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
    productCard: {
        flex: 1,
        margin: 8,
        marginBlockStart: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        maxWidth: 160,
    },
    productImage: {
        width: '100%',
        borderRadius: 8,
        marginBottom: 10,
        opacity: 0.3,
        resizeMode: 'contain',
    },
    productInfo: {
        marginBottom: 10,
    },
    brand: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#D1BDD4'
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(244, 227, 241, 0.93)',
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
        borderRadius: 15,
        marginTop: 20,
    },
    shopButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FavoritesScreen;