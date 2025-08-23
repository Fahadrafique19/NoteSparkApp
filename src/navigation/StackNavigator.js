import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function HomeHeader() {
  const nav = useNavigation();
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Content title="Notes" />
      <Appbar.Action icon="cog-outline" onPress={() => nav.navigate('Settings')} />
    </Appbar.Header>
  );
}

export function EditorHeader({ onSave, onDelete }) {
  const nav = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => nav.goBack()} />
      <Appbar.Content title="Note" />
      <Appbar.Action icon="content-save-outline" onPress={onSave} />
      <Appbar.Action icon="delete-outline" onPress={onDelete} />
    </Appbar.Header>
  );
}

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Editor" component={NoteEditorScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
