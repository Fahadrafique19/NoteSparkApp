import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { createNote, updateNote, getNoteById, deleteNote } from '../database/db';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NoteEditorScreen() {
  const nav = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const [noteId, setNoteId] = useState(id || null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteId) {
      getNoteById(noteId).then((n) => {
        if (n) {
          setTitle(n.title);
          setContent(n.content);
        }
      });
    }
  }, [noteId]);

  const handleSave = async () => {
    if (noteId) {
      await updateNote(noteId, { title, content });
    } else {
      const newId = await createNote({ title, content });
      setNoteId(newId);
    }
    nav.goBack();
  };

  const handleDelete = async () => {
    if (noteId) {
      await deleteNote(noteId);
    }
    nav.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => nav.goBack()} />
          <Appbar.Content title={noteId ? 'Edit Note' : 'New Note'} />
          {noteId ? (
            <Appbar.Action icon="delete-outline" iconColor="red" onPress={handleDelete} />
          ) : null}
        </Appbar.Header>

        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#D1D5DB',
                  outline: '#D1D5DB',
                },
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Write your note..."
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              style={[styles.input, { height: 250 }]}
              theme={{
                colors: {
                  primary: '#D1D5DB',
                  outline: '#D1D5DB',
                },
              }}
            />
          </View>
        </ScrollView>

        
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveBtn}
            labelStyle={{ color: '#FFFFFF', fontWeight: '600' }}
          >
            {noteId ? 'Update Note' : 'Save Note'}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { flexGrow: 1, padding: 16 },
  input: { marginBottom: 16, borderRadius: 12 },
  footer: {
    padding: 16,
   
    backgroundColor: '',
  },
  saveBtn: {
    borderRadius: 12,
    paddingVertical: 6,
  },
});
