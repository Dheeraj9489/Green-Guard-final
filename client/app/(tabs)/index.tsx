import React, { useRef, useState } from 'react';
import {ActivityIndicator, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import {useRouter} from "expo-router";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

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
    if (cameraRef.current) {
      const options = { allowsediting: true, quality: 1, base64: true, exif: false };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
      console.log(photo);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  const pickImage = async () => {
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

      const result = await response.json();
      setLoading(false);
      console.log('Upload result:', result);
      router.push(`/results?plant=${encodeURIComponent(result.plant)}&disease=${encodeURIComponent(result.disease)}`); // Correctly navigate to the results tab
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
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name="camera" size={44} color="black" />
          </TouchableOpacity>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <AntDesign name="picture" size={44} color="black" />
              </TouchableOpacity>
            </>
          )}
          {/*<TouchableOpacity style={styles.button} onPress={pickImage}>*/}
          {/*  <AntDesign name="picture" size={44} color="black" />*/}
          {/*</TouchableOpacity>*/}
        </View>
      </CameraView>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 256, height: 256 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});
