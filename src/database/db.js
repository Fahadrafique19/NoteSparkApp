import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

const DB_NAME = 'notes.db';

export async function getDB() {
  return SQLite.openDatabase({ name: DB_NAME, location: 'default' });
}

export async function initDB() {
  const db = await getDB();
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      updated_at INTEGER
    );`
  );
  return db;
}

function mapRows(rs) {
  const out = [];
  const len = rs.rows.length;
  for (let i = 0; i < len; i++) out.push(rs.rows.item(i));
  return out;
}

export async function listNotes() {
  const db = await initDB();
  const [res] = await db.executeSql('SELECT * FROM notes ORDER BY updated_at DESC;');
  return mapRows(res);
}

export async function getNoteById(id) {
  const db = await initDB();
  const [res] = await db.executeSql('SELECT * FROM notes WHERE id = ? LIMIT 1;', [id]);
  return mapRows(res)[0] || null;
}

export async function createNote({ title, content }) {
  const db = await initDB();
  const ts = Date.now();
  const [res] = await db.executeSql(
    'INSERT INTO notes (title, content, updated_at) VALUES (?, ?, ?);',
    [title || '', content || '', ts]
  );
  return { id: res.insertId, title, content, updated_at: ts };
}

export async function updateNote(id, { title, content }) {
  const db = await initDB();
  const ts = Date.now();
  await db.executeSql(
    'UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?;',
    [title || '', content || '', ts, id]
  );
  return { id, title, content, updated_at: ts };
}

export async function deleteNote(id) {
  const db = await initDB();
  await db.executeSql('DELETE FROM notes WHERE id = ?;', [id]);
  return true;
}

