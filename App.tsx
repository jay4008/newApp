/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from './src/assets/literals/Literals';
import RootStackNav from './src/navigation/RootStackNav';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const App = () => {


  return (
    <SafeAreaView style={styles.container}>
      <RootStackNav/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container :{
  flex : 1,
  backgroundColor : Colors.white
}
});

export default App;
