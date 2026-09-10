import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack,Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { auth, db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        setUser(newUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', newUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());

        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });
    return unsubscribe;
    
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!isAuthenticated && (
        <Redirect href="/(auth)" />
      )}
       {/* PARENT */}
      {isAuthenticated && user?.role === 'parent' && (
        <Redirect href="/(parent)" />
      )}


      {/* TEACHER */}
      {isAuthenticated && user?.role === 'teacher' && (
        <Redirect href="/(teacher)" />
      )}

      {/* ADMIN */}
      {isAuthenticated && user?.role === 'admin' && (
        <Redirect href="/(admin)" />
      )}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="add-student" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
