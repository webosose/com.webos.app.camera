import getCameraList from './getCameraList';
import lunaAction from './lunaActions';
import ptzChange from './ptzChange';
export const unload = (mediaId) => {
	return new Promise((resolve) => {
		console.log('unload enter.' + mediaId);
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'unload',
				parameters: {
					mediaId
				},
				resolve: resolve
			},
			(res) => {
				console.log(mediaId + 'unload: ' + JSON.stringify(res));
				resolve();
			}
		);
	});
};

const stopCamera = (handle) => {
	return new Promise((resolve) => {
		console.log(' stopCamera: enter ' + handle);
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'stopCamera',
				parameters: {
					handle
				},
				resolve: resolve
			},
			(res) => {
				console.log(handle + ' stopCamera: ' + JSON.stringify(res));
				resolve();
			}
		);
	});
};
export const closeCamera = (handle, camera_id) => (dispatch, getState) => {
	return stopCamera(handle).then(() => {
		const ptzSupport = getState().ptzSupport[camera_id];
		console.log('ptzSupport supported ' + ptzSupport);
		const closeCameraExecuter = (resolve) => {
			console.log(' closeCamera: enter ' + handle);
			lunaAction(
				{
					service: 'luna://com.webos.service.camera2',
					method: 'close',
					parameters: {
						handle
					},
					resolve: resolve
				},
				(res) => {
					console.log(handle + ' closeCamera: ' + JSON.stringify(res));
					resolve();
				}
			);
		}
		if (ptzSupport) {
			return ptzChange(camera_id, false).then(() => {
				dispatch({
					type: "PTZ_CHANGE",
					payload: {
						[camera_id]: false
					}
				});
				return new Promise(closeCameraExecuter)
			})
		} else {
			return new Promise(closeCameraExecuter)
		}

	});
};
const closeCameras = (refresh, closeApp) => async (dispatch, getState) => {
	const cameraStatus = getState().cameraStatus;
	console.log('closeCameras: ', cameraStatus);
	for (const camera of cameraStatus) {
		await dispatch(closeCamera(camera.handle, camera.id));
	}
	if (closeApp) {
		if (typeof window !== 'undefined') {
			window.close();
		}
	}
	if (refresh) {
		dispatch(getCameraList());
	}else{
		setTimeout(()=>{
			dispatch({
				type:'CHANGE_FOOTER_STATE',
				payload:''
			});
		},1000);
	}
};

export default closeCameras;
