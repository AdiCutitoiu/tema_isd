import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {useCurrentUserInfo} from '../hooks/useCurrentUserInfo';

export function NameScreen() {
  const [name, setName] = useState('');

  const {setName: commitName} = useCurrentUserInfo();

  const onConfirm = () => {
    const rawName = name.trim();
    if (rawName === '') {
      return;
    }

    commitName(rawName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nume"
      />
      <View style={styles.button}>
        <Button title="Confirm" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 24,
    marginHorizontal: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 30,
  },
});
