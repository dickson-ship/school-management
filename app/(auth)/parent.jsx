import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {Colors} from '../../constants/colors';
import { router } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {

    if (!email || !password) {
      Alert.alert(
        'Missing Information',
        'Please enter your email/phone and password.'
      );

      return;
    }

    // Firebase login will be added here later.

    console.log({
      email,
      password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* Header */}
          <View style={styles.header}>

            <Text style={styles.schoolName}>
              RYDIMMA EDUCATIONAL
            </Text>

            <Text style={styles.schoolName}>
              COMPLEX
            </Text>

            <Image
              source={require('../../assets/images/crest.png')}
              style={styles.crest}
              resizeMode="contain"
            />

          </View>

          {/* Welcome */}
          <View style={styles.titleContainer}>

            <Text style={styles.title}>
              Welcome Back!
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue
            </Text>

          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Email */}
            <View style={styles.inputContainer}>

              <Ionicons
                name="mail-outline"
                size={21}
                color={Colors.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

            </View>

            {/* Password */}
            <View style={styles.inputContainer}>

              <Ionicons
                name="lock-closed-outline"
                size={21}
                color={Colors.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={
                    showPassword
                      ? 'eye-outline'
                      : 'eye-off-outline'
                  }
                  size={21}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>

            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => router.push('/(auth)/forgot-password')}
            >
              <Text style={styles.forgot}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>

              <View style={styles.line} />

              <Text style={styles.or}>
                OR
              </Text>

              <View style={styles.line} />

            </View>

            <Text style={styles.continueText}>
              Continue with
            </Text>

            {/* Social login */}
            <View style={styles.socialContainer}>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons
                  name="logo-google"
                  size={24}
                  color="#DB4437"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons
                  name="logo-apple"
                  size={24}
                  color={Colors.black}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons
                  name="logo-facebook"
                  size={24}
                  color="#1877F2"
                />
              </TouchableOpacity>

            </View>

            {/* Register */}
            <View style={styles.registerContainer}>

              <Text style={styles.noAccount}>
                Don't have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/register')}
              >
                <Text style={styles.register}>
                  Register
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  header: {
    alignItems: 'center',
    marginTop: 25,
  },

  schoolName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  crest: {
    width: 150,
    height: 150,
    marginTop: 8,
  },

  titleContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 28,
  },

  title: {
    fontSize: 29,
    fontWeight: '800',
    color: Colors.text,
  },

  subtitle: {
    marginTop: 5,
    color: Colors.textSecondary,
    fontSize: 15,
  },

  form: {
    width: '100%',
  },

  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: Colors.white,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: Colors.text,
    fontSize: 15,
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  forgot: {
    color: Colors.warning,
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  or: {
    marginHorizontal: 15,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  continueText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: 15,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },

  socialButton: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },

  noAccount: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  register: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },

});