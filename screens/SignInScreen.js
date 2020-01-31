import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {login} from '../feature/auth';
import {loginSuccess, loginFailure} from '../store/authSlice';

const SignInScreen = props => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const signinAsync = async username => {
    try {
      const result = await login(username.trim());
      dispatch(loginSuccess(result));
    } catch (err) {
      dispatch(loginFailure(err));
    }
  };

  const isUsernameValidate = username =>
    username && username.length >= 2 && username.length <= 15;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.loginInput}
        onChangeText={text => setUsername(text)}
        value={username}
        maxLength={15}
        placeholder="사용자이름"
        placeholderTextColor="#bdbdbd"
      />

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Button
          title="로그인"
          onPress={() => signinAsync(username)}
          disabled={!isUsernameValidate(username)}
        />

        <Button
          color="#ff5c5c"
          title="취소"
          onPress={() => {
            setUsername('');
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

SignInScreen.navigationOptions = {
  title: '로그인',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginInput: {
    width: '100%',
    height: 40,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default SignInScreen;
