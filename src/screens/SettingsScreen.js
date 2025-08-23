import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, RadioButton, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../theme/ThemeProvider';

export default function SettingsScreen() {
  const { preference, setPreference } = useAppTheme();
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <List.Section>
        <List.Subheader>Theme</List.Subheader>
        <RadioButton.Group onValueChange={setPreference} value={preference}>
          <List.Item
            title="System"
            left={() => <RadioButton value="system" />}
            onPress={() => setPreference('system')}
          />
          <List.Item
            title="Light"
            left={() => <RadioButton value="light" />}
            onPress={() => setPreference('light')}
          />
          <List.Item
            title="Dark"
            left={() => <RadioButton value="dark" />}
            onPress={() => setPreference('dark')}
          />
        </RadioButton.Group>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
