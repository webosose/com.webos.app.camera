import {combineReducers} from 'redux';
import cameralist from './cameralist';
import cameraStatus from './cameraStatus';
import screen from './screen';
import selectedCameras from './selectedCameras';
import popup from './popup';
import settings from './settings';
import ptzStatus, { ptzSupport } from './ptzStatus';
import footerAction from './footerAction';
const rootReducer = combineReducers({
	cameralist,
	cameraStatus,
	screen,
	selectedCameras,
	popup,
	settings,
	ptzStatus,
	ptzSupport,
	footerAction
});

export default rootReducer;
