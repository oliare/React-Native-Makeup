import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: any;
  joinedDate: string;
  ordersCount: number;
  favoritesCount: number;
}

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const mockUser: UserProfile = {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "+1 234 567 890",
      avatar: require('@/assets/images/splash-icon.png'),
      joinedDate: "March 2022",
      ordersCount: 15,
      favoritesCount: 23
    };
    setUser(mockUser);
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.ordersCount}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.favoritesCount}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.hr} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>
        <View style={styles.hr} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since:</Text>
          <Text style={styles.infoValue}>{user.joinedDate}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionContent}>
            <FontAwesome name="history" size={20} color="#666" style={styles.actionIcon} />
            <Text style={styles.actionText}>Order History</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionContent}>
            <FontAwesome name="map-marker" size={20} color="#666" style={styles.actionIcon} />
            <Text style={[styles.actionText, { marginLeft: 5 }]}>Shipping Addresses</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionContent}>
            <FontAwesome name="credit-card" size={20} color="#666" style={styles.actionIcon} />
            <Text style={styles.actionText}>Payment Methods</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
          <Text style={[styles.actionText, styles.logoutText, { textAlign: 'center' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  editButton: {
    borderWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#f5f5f5'
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
  },
  separator: {
    width: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  actionsContainer: {
    margin: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ffeeee',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0.3,
  },
  logoutText: {
    color: '#ff4444',
    textAlign: 'center',
  },
  hr: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
});

export default ProfileScreen;