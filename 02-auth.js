import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const genRandomString = length => {
  const result = [];
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }
  return result.join('');
};

const SignInScreen = props => {
  const _signInAsync = async () => {
    const userToken = genRandomString(15);
    await AsyncStorage.setItem('userToken', userToken);
    props.navigation.navigate('App');
  };

  return (
    <View style={styles.container}>
      <Button title="로그인하기" onPress={_signInAsync} />
    </View>
  );
};

SignInScreen.navigationOptions = {
  title: '로그인 하세요!',
};

const HomeScreen = props => {
  const showMoreApp = () => props.navigation.navigate('Other');
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <Button title="Show me more of the app" onPress={showMoreApp} />
      <Button title="Actually, sign me out :)" onPress={signOutAsync} />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Welcome to the app!',
};

const OtherScreen = props => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <View style={styles.container}>
      <Button title="I'm done, sign me out" onPress={signOutAsync} />
      <StatusBar barStyle="default" />
    </View>
  );
};

OtherScreen.navigationOptions = {
  title: 'Lots of features here',
};

const AuthLoadingScreen = props => {
  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
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

const AppStack = createStackNavigator({Home: HomeScreen, Other: OtherScreen});
const AuthStack = createStackNavigator({SignIn: SignInScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
