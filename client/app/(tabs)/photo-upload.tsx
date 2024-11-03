import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/GG.png')}
          style={styles.reactLogo}
          resizeMode="cover" // Makes the image fill the entire container without distortion
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to GreenGuard!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Capture the Leaf Image</ThemedText>
        <ThemedText>
          Select the <ThemedText type="defaultSemiBold">Upload Photo</ThemedText> tab to upload photos for diagnosis. Take a clear picture of one leaf with a solid dark background to help our machine learning model accurately analyze it. A dark background improves focus on the leaves, making it easier to detect any signs of disease.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Diagnosis</ThemedText>
        <ThemedText>
          Once you have uploaded or taken an image, our AI will analyze the data, identify any diseases present, and provide you with its name.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Share with the Community</ThemedText>
        <ThemedText>
          Connect with others in your community by sharing the diagnosis! Visit our
          <ThemedText type="defaultSemiBold"> Explore </ThemedText>
            tab to see nearby disease reports, to stay ahead of the wave.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%', // Fill the height of the header container
    width: '100%',  // Fill the width of the header container
    position: 'absolute',
  },
});
