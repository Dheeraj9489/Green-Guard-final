import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="photo-upload"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (

            <Feather name='map-pin' size={24} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="photo-upload"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => (
            <Feather name="info" size={24} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="index"
        options={{
          title: 'Upload Photo',
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera-outline" size={24} color={color}/>
          ),
        }}
      />

    </Tabs>
  );
}
