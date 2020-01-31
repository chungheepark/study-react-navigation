import React, {useEffect} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';

import storage from '../storage';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const AuthLoadingScreen = props => {
  useEffect(() => {
    const bootstrapAsync = async () => {
      await sleep(1000);
      const userToken = await storage.get('token');
      props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
