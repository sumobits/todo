/**
 * @format
 */

 /*
  * This is needed for debugging purposes only.
  */
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
	window.FETCH_SUPPORT.blob = false;
} else {
	global.Blob = global.originalBlob || global.Blob;
	global.FileReader = global.originalFileReader || global.FileReader;
}
/** */
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
