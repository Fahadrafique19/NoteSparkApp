import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../theme/ThemeProvider';

export default function LoginScreen() {
  const nav = useNavigation();
  const { tokens } = useAppTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 

  const handleLogin = () => {
    const fixedEmail = "verge@example.com";   
    const fixedPassword = "admin123";          

    if (email === fixedEmail && password === fixedPassword) {
      setError('');
      nav.replace('Home'); 
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.background }]}>
      
      <Text style={[styles.title, { color: tokens.text }]}>Note Spark</Text>

      <TextInput
        mode="outlined"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        theme={{
          colors: {
            primary: tokens.border,
            outline: tokens.border,
            text: tokens.text,
            placeholder: tokens.muted,
            background: tokens.surface,
          },
        }}
      />

      <TextInput
        mode="outlined"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off-outline" : "eye-outline"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        theme={{
          colors: {
            primary: tokens.border,
            outline: tokens.border,
            text: tokens.text,
            placeholder: tokens.muted,
            background: tokens.surface,
          },
        }}
      />

      <TouchableOpacity onPress={() => console.log("Forgot Password pressed")}>
        <Text style={[styles.forgot, { color: tokens.primary }]}>Forgot Password?</Text>
      </TouchableOpacity>

      
      {error ? (
        <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.loginBtn, { backgroundColor: tokens.primary }]}
        labelStyle={{ color: '#fff', fontWeight: '600' }}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50, 
    textAlign: 'center',
  },
  input: { marginBottom: 16, borderRadius: 12 },
  forgot: { textAlign: 'right', marginBottom: 16, fontWeight: '500' },
  loginBtn: { marginTop: 8, borderRadius: 12, paddingVertical: 6 },
  errorText: { textAlign: 'center', marginBottom: 12, fontWeight: '500' },
});
