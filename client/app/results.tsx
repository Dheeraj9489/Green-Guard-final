import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from "expo-router";

const PlantInfoComponent = () => {
  // State for plant data and loading
  const [plantData, setPlantData] = useState({ plant: '', disease: '' });
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const { plant, disease } = useLocalSearchParams();
  console.log('Plant:', plant,'Disease:', disease);

  useEffect(() => {
    const plantString = Array.isArray(plant) ? plant[0] : plant;
    const diseaseString = Array.isArray(disease) ? disease[0] : disease;

    // Set the plant data and change loading to false
    setPlantData({ plant: plantString, disease: diseaseString });
    setLoading(false); // Update loading state
  }, [plant, disease]);

  const handleGetLocationAndSubmit = async () => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Prepare data for the API call
    const payload = {
      plant: plantData.plant,
      disease: plantData.disease,
      latitude,
      longitude,
    };

    // Replace with your API endpoint
    const apiEndpoint = 'http://192.168.135.206:5001/report';

    try {
      // Make the API call
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        Alert.alert('Error', `Failed to submit data: ${errorData.message || response.statusText}`);
      } else {
        const responseData = await response.json();
        Alert.alert('Success', responseData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while submitting the data.');
    }

    // Navigate back to the previous tab
    router.back();
  };

  const handleGoBack = () => {
    // Just navigate back to the previous tab
    router.back();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Plant Information</Text>
      {loading ? ( // Conditional rendering based on loading state
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Plant: {plantData.plant}</Text>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Disease: {plantData.disease}</Text>
        </>
      )}

      <View style={{ marginVertical: 20 }}>
        <Button title="Report Disease" onPress={handleGetLocationAndSubmit} />
      </View>
      <Button title="Ignore" onPress={handleGoBack} />
    </View>
  );
};

export default PlantInfoComponent;
