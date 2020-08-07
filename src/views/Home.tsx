import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CounterStoreContext } from '../stores/CounterStore';

const Home = observer(() => {
  const counterStore = useContext(CounterStoreContext);

  return (
    <View style={styles.body}>
      <Text>Hello React</Text>
      <Text>Count: {counterStore.count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => counterStore.count++}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;
