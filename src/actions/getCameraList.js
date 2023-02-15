import lunaAction from './lunaActions';
import { clearSettings } from './settings';
import startCamera from './startCamera';

const updateCameraStatus = (list) => (dispatch) => {
	const faceDetectionDefault = {};
	const faceDetectionSupport= {}
	list.forEach(({ id }) => {
		dispatch(startCamera(id));
		faceDetectionDefault[id] = false;
		faceDetectionSupport[id] = true;
	});
	dispatch({
		type: "PTZ_CHANGE",
		payload: {
			...faceDetectionDefault
		}
	});
	dispatch({
		type: "PTZ_SUPPORT",
		payload: {
			...faceDetectionSupport
		}
	});
};
const getCameraList = () => (dispatch) => {
	dispatch({
		type: 'CLEAR_CAMERA_STATUS'
	});
	dispatch(clearSettings());
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'getCameraList',
				parameters: {},
				resolve: resolve
			},
			(res) => {
				console.log('res.deviceList:', res.deviceList);
				if (res.returnValue) {
					dispatch(updateCameraStatus(res.deviceList));
					dispatch({
						type: 'CAMERALIST_LOADED',
						payload: res.deviceList
					});
				}
			}
		);
	});
};

export default getCameraList;
