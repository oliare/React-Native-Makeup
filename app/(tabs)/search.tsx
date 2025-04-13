import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchInput from '@/components/search/SearchInput';


export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1');

  const categories = ['1', '2', '3', '4'];

  return (
    <View style={styles.container}>
      <SearchInput />

      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.categoryButton, selectedCategory === item && styles.activeCategory]}
            onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.categoryText, selectedCategory === item && styles.activeCategoryText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
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
});