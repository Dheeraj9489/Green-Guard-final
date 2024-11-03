import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

type MarkerData = {
  plant: string;
  disease: string;
  latitude: number;
  longitude: number;
};

export function MapInterface() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return false;
    }
    return true;
  };

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
  };

  const fetchMarkers = async () => {
    try {
      const response = await fetch('http://192.168.135.206:5001/get_reports'); // CHANGE WHEN SERVER CHANGES
      if (response.ok) {
        const data = await response.json();

        // Format the data to ensure latitude and longitude are numbers
        const formattedData: MarkerData[] = data.map((item: { plant: string; disease: string; latitude: string; longitude: string }) => ({
          plant: item.plant,
          disease: item.disease,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }));

        // Filter out duplicates based on latitude and longitude
        const newMarkers = formattedData.filter((newMarker: MarkerData) =>
          !markers.some(existingMarker =>
            existingMarker.latitude === newMarker.latitude &&
            existingMarker.longitude === newMarker.longitude
          )
        );

        // Update state only if there are new, unique markers
        if (newMarkers.length > 0) {
          setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
        }
      } else {
        console.error('Failed to fetch markers:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        await getUserLocation();
        await fetchMarkers();
        setLoading(false);

        // Set up interval for live marker updates every 30 seconds
        const intervalId = setInterval(fetchMarkers, 4);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
      }
    };

    initializeMap();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D6FFA3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 34.945850, // Default to Mizzou
          longitude: userLocation ? userLocation.longitude : -92.329531,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.plant}
            description={marker.disease}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapInterface;
