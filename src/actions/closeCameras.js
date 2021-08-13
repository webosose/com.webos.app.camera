import getCameraList from './getCameraList';
import lunaAction from './lunaActions';
const closePreview = (handle) => {
	return new Promise((resolve) => {
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
				console.log('stopPreview:', handle);
				console.log('stopPreview:', res);
				resolve();
			}
		);
	});
};
const closeCamera = (handle) => {
	return closePreview(handle).then(() => {
		return new Promise((resolve) => {
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
					console.log('closeCamera:', handle);
					console.log('closeCamera:', res);
					resolve();
				}
			);
		});
	});
};
const closeCameras = (refresh) => async (dispatch, getState) => {
	const cameraStatus = getState().cameraStatus;
	for (const camera of cameraStatus) {
		await closeCamera(camera.handle);
	}
	if (refresh) {
		dispatch(getCameraList());
	}
};

export default closeCameras;
