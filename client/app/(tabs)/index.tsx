import React, { useRef, useState } from 'react';
import { ActivityIndicator, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import { useRouter } from "expo-router";
import { LogBox } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Camera() {
  LogBox.ignoreAllLogs();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto = async () => {
    try {
      if (cameraRef.current) {
        const options = { allowsEditing: true, quality: 1, base64: true, exif: false };
        const takenPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(takenPhoto);

        if (takenPhoto) {
          setImageUri(takenPhoto.uri);
          await uploadImage(takenPhoto.uri);
        } else {
          console.error('Error: takenPhoto is undefined');
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadImage = async (imagePath: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imagePath,
      name: 'upload.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      setLoading(true);
      const response = await fetch('http://192.168.135.206:5001/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setLoading(false);
      console.log('Upload result:', result);

      // Ensure we only navigate once upload is complete
      router.push(`/results?plant=${encodeURIComponent(result.plant)}&disease=${encodeURIComponent(result.disease)}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  if (photo) return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleRetakePhoto} />;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.side_button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Entypo name="circle" size={89} color="white" />
          </TouchableOpacity>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <TouchableOpacity style={styles.side_button} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={44} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 790,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 80,
    marginHorizontal: 10,
  },
  button: {
    bottom: 25,           // Align it at the bottom of the screen
    left: 0,             // Align to the left edge
    right: 0,            // Align to the right edge
    height: 100,          // Set a height for the container (adjust as needed)
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 1,
    marginVertical: 5,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
  },
  side_button: {
    bottom: 60,
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 1,
    marginVertical: 1,
    borderRadius: 15,
  }
});
