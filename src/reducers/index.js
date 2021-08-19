import {combineReducers} from 'redux';
import cameralist from './cameralist';
import cameraStatus from './cameraStatus';
import screen from './screen';
import selectedCameras from './selectedCameras';
import popup from './popup';
const rootReducer = combineReducers({
	cameralist,
	cameraStatus,
	screen,
	selectedCameras,
	popup
});

export default rootReducer;
