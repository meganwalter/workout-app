import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Router } from './src/routes';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default App;
