import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function SearchScreen() {
    const [isTouched, setIsTouched] = useState(false);

    return (
        <View style={[styles.searchContainer, isTouched && styles.isActiveSearchInput]}>
            <FontAwesome name="search" size={20} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#999"
                onTouchStart={() => setIsTouched(true)}
                onBlur={() => setIsTouched(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        marginVertical: 15,
        borderWidth: 2,
        borderColor: '#F5F5F5',
    },
    searchIcon: {
        marginRight: 10,
        color: "#666",
    },
    searchInput: {
        flex: 1,
        height: 35,
        fontSize: 16,
        color: Colors.light.text,
    },
    isActiveSearchInput: {
        borderWidth: 0.2,
        borderColor: '#ebebeb',
        shadowColor: '#bebebe',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
});