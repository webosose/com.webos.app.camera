import {combineReducers} from 'redux';
import cameralist from './cameralist';
import cameraStatus from './cameraStatus';
import screen from './screen';
import selectedCameras from './selectedCameras';

const rootReducer = combineReducers({
	cameralist,
	cameraStatus,
	screen,
	selectedCameras
});

export default rootReducer;
