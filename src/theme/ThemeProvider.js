import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme } from '@react-navigation/native';
import { MD3DarkTheme as PaperDark, MD3LightTheme as PaperLight } from 'react-native-paper';

const STORAGE_KEY = 'themePreference';

const baseLight = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  primary: '#3B82F6',
  danger: '#EF4444',
  border: '#E5E7EB',
  card: '#FFFFFF',
};

const baseDark = {
  background: '#0F141A',
  surface: '#111827',
  text: '#E5E7EB',
  muted: '#9CA3AF',
  primary: '#3B82F6',
  danger: '#F87171',
  border: '#1F2937',
  card: '#FFFFFF',
  cardText: '#111827',
};

const Ctx = createContext(null);

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [preference, setPreference] = useState('system');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setPreference(saved);
    })();
  }, []);

  const mode = useMemo(() => {
    if (preference === 'light') return 'light';
    if (preference === 'dark') return 'dark';
    return system === 'dark' ? 'dark' : 'light';
  }, [preference, system]);

  const tokens = mode === 'dark' ? baseDark : baseLight;

  const navTheme = useMemo(() => {
    const base = mode === 'dark' ? NavDarkTheme : NavLightTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: tokens.primary,
        background: tokens.background,
        card: tokens.surface,
        text: tokens.text,
        border: tokens.border,
        notification: tokens.danger,
      },
    };
  }, [mode, tokens]);

  const paperTheme = useMemo(() => {
    const base = mode === 'dark' ? PaperDark : PaperLight;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: tokens.primary,
        background: tokens.background,
        surface: tokens.surface,
        outline: tokens.border,
        onSurfaceVariant: tokens.muted,
      },
    };
  }, [mode, tokens]);

  const value = useMemo(() => ({
    mode,
    tokens,
    preference,
    setPreference: async (pref) => {
      await AsyncStorage.setItem(STORAGE_KEY, pref);
      setPreference(pref);
    },
    navTheme,
    paperTheme,
  }), [mode, tokens, preference, navTheme, paperTheme]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppTheme() {
  return useContext(Ctx);
}
