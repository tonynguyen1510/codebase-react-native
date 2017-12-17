import { AppRegistry } from 'react-native';
import App from './src/setup';

console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('CodeBase', () => App);
