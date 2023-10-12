/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Geolocation from 'react-native-geolocation-service';

AppRegistry.registerComponent(appName, () => App);
