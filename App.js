/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const Logo = () => (
  <Image source={require('./spiro.png')} style={{width: 30, height: 30}} />
);

/* navigation의 navigate는 기록을 초기화 시키고 이동시켜 버린다. */
/* navigation의 push는 기록에 추가하고 이동시킨다. */

const HomeScreen = props => {
  const {navigation} = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    navigation.setParams({
      increaseCount: () => setCount(c => c + 1),
    });
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>Count: {count}</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'how about you?',
          })
        }
      />
    </View>
  );
};

HomeScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Home',
    headerTitle: () => <Logo />,
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    headerRight: () => (
      <Button
        onPress={navigation.getParam('increaseCount')}
        title="+1"
        color="#000"
      />
    ),
  };
};

const DetailScreen = props => {
  const {navigation} = props;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>
        itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
      </Text>
      <Text>
        otherParam:
        {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
      </Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Update"
        onPress={() => navigation.setParams({itemId: 'Updated!'})}
      />
    </View>
  );
};

DetailScreen.navigationOptions = ({navigation, navigationOptions}) => ({
  title: navigation.getParam('itemId', 'Detail'),
  headerStyle: {
    backgroundColor: navigationOptions.headerTintColor,
  },
  headerTintColor: navigationOptions.headerStyle.backgroundColor,
});

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
