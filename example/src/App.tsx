import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Inspector, { type Result } from '@pakerwreah/react-native-inspector';
import { useCallback, useEffect, useState } from 'react';
import fs, { DocumentDirectoryPath } from 'react-native-fs';

export default function App() {
  useEffect(() => {
    (async () => {
      for (const path of databasePaths) {
        if (!(await fs.exists(path))) {
          Inspector.createDatabase(path);
        }
      }
    })();
    Inspector.setDatabasePaths(databasePaths);
    console.log(DocumentDirectoryPath);
  }, []);

  const [sql, setSQL] = useState('');
  const [result, setResult] = useState<Result>();

  const submit = useCallback(() => {
    const result = Inspector.query(databasePaths[0]!, sql);
    if (!result) {
      console.error('Something went wrong');
      return;
    }
    setResult(result);
  }, [sql]);

  return (
    <View style={styles.container}>
      <Text>Type your SQL</Text>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setSQL}
        value={sql}
      />
      {result && (
        <>
          <View style={styles.rowStyle}>
            {result.headers.map((column, i) => (
              <Text key={i} style={styles.cellStyle}>
                {column}
              </Text>
            ))}
          </View>
          {result.data.map((row, r) => (
            <View key={r} style={styles.rowStyle}>
              {row.map((column, c) => (
                <Text key={c} style={styles.cellStyle}>
                  {column}
                </Text>
              ))}
            </View>
          ))}
        </>
      )}
      <Button title="Submit" onPress={submit} />
    </View>
  );
}

const databasePaths = [`database1.db`, `database2.db`, `database3.db`].map(
  (path) => `${DocumentDirectoryPath}/${path}`
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    height: 150,
    width: '80%',
    padding: 8,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cellStyle: {
    flex: 1,
    margin: 10,
  },
});
