import ProductList from './src/components/products/product';
import AddProductImages from './src/components/products/addProductImages';
import ProfileEdit from './src/components/shop/ProfileEdit';
import MainSwitch from './src/components/navigation';
import Example from './src/components/Test';
import CreateShop from './src/components/superuser/createUser';
import React from 'react';
import { StyleSheet, Text, View ,StatusBar} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MainSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
