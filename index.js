/**
 * @format
 */
import 'react-native-gesture-handler';
import {useScreens} from 'react-native-screens';
import {AppRegistry} from 'react-native';

import App from './12-WithRedux';
import {name as appName} from './app.json';

useScreens();

AppRegistry.registerComponent(appName, () => App);
