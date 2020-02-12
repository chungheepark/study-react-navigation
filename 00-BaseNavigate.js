import React, {useState} from 'react';
import {Text, View, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function LogoTitle() {
  return (
    <Image style={{width: 50, height: 50}} source={require('./spiro.png')} />
  );
}

function HomeScreen({navigation}) {
  const [count, setCount] = useState(0);

  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => setCount(c => c + 1)}
        title="Update count"
        color="#fff"
      />
    ),
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Text>count {count}</Text>
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  /* 2. Get the param */
  const {itemId} = route.params;
  const {otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route}) => ({title: route.params.itemId})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
