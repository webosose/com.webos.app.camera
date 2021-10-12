import getCameraList from './getCameraList';
import lunaAction from './lunaActions';
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

const stopPreview = (handle) => {
	return new Promise((resolve) => {
		console.log(' stopPreview: enter ' + handle);
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'stopPreview',
				parameters: {
					handle
				},
				resolve: resolve
			},
			(res) => {
				console.log(handle + ' stopPreview: ' + JSON.stringify(res));
				resolve();
			}
		);
	});
};
export const closeCamera = (handle) => () => {
	return stopPreview(handle).then(() => {
		return new Promise((resolve) => {
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
		});
	});
};
const closeCameras = (refresh, closeApp) => async (dispatch, getState) => {
	const cameraStatus = getState().cameraStatus;
	console.log('closeCameras: ', cameraStatus);
	for (const camera of cameraStatus) {
		await dispatch(closeCamera(camera.handle, camera.media_id));
	}
	if (closeApp) {
		if (typeof window !== 'undefined') {
			window.close();
		}
	}
	if (refresh) {
		dispatch(getCameraList());
	}
};

export default closeCameras;
