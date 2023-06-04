import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Sqlite from 'react-native-sqlite-storage';
import Stack from './src/stack';

global.db = Sqlite.openDatabase({
  name: 'Oceanica',
  location: 'default'
},
() => {},
error => {
  console.log('ERRO:'+error)
})

const App = () => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  )
}

export default App;
