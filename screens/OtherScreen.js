import React from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';

import {logout} from '../feature/auth';
import {logoutFinished} from '../store/authSlice';

const OtherScreen = props => {
  const dispatch = useDispatch();

  const signOutAsync = async () => {
    await logout();
    dispatch(logoutFinished());
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OtherScreen;
