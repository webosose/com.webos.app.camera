import {combineReducers} from 'redux';
import cameralist from './cameralist';
import cameraStatus from './cameraStatus';
import screen from './screen';
import selectedCameras from './selectedCameras';
import popup from './popup';
import settings from './settings';
const rootReducer = combineReducers({
	cameralist,
	cameraStatus,
	screen,
	selectedCameras,
	popup,
	settings
});

export default rootReducer;
