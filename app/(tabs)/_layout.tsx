import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#222',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: { backgroundColor: Colors['light'].background },
        headerStyle: { backgroundColor: Colors['light'].background },
        headerTintColor: Colors['light'].text,
        headerTitleStyle: { fontWeight: 'bold', color: '#999999' },
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Basket',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-basket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
