import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {logout} from '../feature/auth';
import {logoutFinished} from '../store/authSlice';

const HomeScreen = props => {
  const dispatch = useDispatch();

  const showMoreApp = () => props.navigation.navigate('Other');
  const signOutAsync = async () => {
    await logout();
    dispatch(logoutFinished());
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
