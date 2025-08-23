import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, FAB, Text, IconButton } from 'react-native-paper';
import { listNotes, deleteNote } from '../database/db';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { formatTs } from '../utils/date';
import { HomeHeader } from '../navigation/StackNavigator';
import { useAppTheme } from '../theme/ThemeProvider';

export default function HomeScreen() {
  const nav = useNavigation();
  const focused = useIsFocused();
  const { tokens, mode } = useAppTheme();
  const [notes, setNotes] = useState([]);

  const load = useCallback(async () => {
    try {
      const rows = await listNotes();
      setNotes(rows);
    } catch (e) {
      console.warn('load notes failed', e);
    }
  }, []);

  useEffect(() => {
    if (focused) load();
  }, [focused, load]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    load();
  };

  const renderItem = ({ item }) => (
    <Card
      mode="elevated"
      style={[
        styles.card,
        { backgroundColor: mode === 'dark' ? '#1E293B' : '#FFFFFF' },
      ]}
    >
      <Card.Content style={styles.cardRow}>

        <View style={styles.cardText}>
          <Text
            style={[
              styles.title,
              { color: mode === 'dark' ? '#F3F4F6' : tokens.text },
            ]}
          >
            {item.title || 'Untitled'}
          </Text>
          {item.content ? (
            <Text
              style={[
                styles.preview,
                { color: mode === 'dark' ? '#9CA3AF' : '#6B7280' },
              ]}
              numberOfLines={2}
            >
              {item.content.replace(/\n/g, ' ')}
            </Text>
          ) : null}
          <Text style={styles.date}>{formatTs(item.updated_at)}</Text>
        </View>


        <View style={styles.actions}>
          <IconButton
            icon="note-edit-outline"
            style={{ margin: 0 }}  
            size={22}
            onPress={() => nav.navigate('Editor', { id: item.id })}
          />
          <IconButton
            icon="delete-outline"
            size={22}
            iconColor="red"
            style={{ margin: 0, marginLeft: -4 }}
            onPress={() => handleDelete(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      {notes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No notes yet. Tap + to add one.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={notes}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
        />
      )}
      <FAB
        icon="plus"
        onPress={() => nav.navigate('Editor')}
        style={[styles.fab, { backgroundColor: tokens.primary }]} 
         color="#FFFFFF"
         
        customSize={64}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 120 },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: { flex: 1, paddingRight: 8 },
  title: { fontWeight: '700', fontSize: 18 },
  preview: { marginTop: 6, fontSize: 14 },
  date: { marginTop: 10, color: '#9CA3AF', fontSize: 12 },
  actions: { flexDirection: 'row',alignItems: 'center' },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { color: '#6B7280', fontSize: 14 },
  fab: { position: 'absolute', right: 20, bottom: 30,  },
});
