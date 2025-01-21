import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  // Load fonts
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  // Handle splash screen and initial navigation
  useEffect(() => {
    const handleInitialLoad = async () => {
      if (loaded && isAuthenticated !== null) {
        await SplashScreen.hideAsync();
        
        // Navigate based on authentication status
        if (!isAuthenticated) {
          router.replace('/login');
        }
      }
    };

    handleInitialLoad();
  }, [loaded, isAuthenticated]);

  // Show nothing while loading
  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          // Prevent going back to login
          gestureEnabled: false
        }} 
      />
    </Stack>
  );
}