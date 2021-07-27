import {combineReducers} from 'redux';
import cameralist from './cameralist';
import cameraStatus from './cameraStatus';
import screen from './screen';

const rootReducer = combineReducers({
	cameralist,
	cameraStatus,
	screen
});

export default rootReducer;
