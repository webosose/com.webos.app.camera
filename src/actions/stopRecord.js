import lunaAction from './lunaActions';
import changeScreen from './changeScreen';
import syncMedia from './syncMedia';
const stopRecord = (id, ui) => (dispatch, getState) => {
	const camera = getState().cameraStatus.find((value) => value.id === id);
	if (ui === 'footer') {
		dispatch(
			changeScreen({
				data: {
					disableCamList: false,
					disablPreviewOption: false
				}
			})
		);
	} else {
		dispatch(
			changeScreen({
				data: {
					disableCamList: false,
					disablFooterRecording: false
				}
			})
		);
	}
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'stopCameraRecord',
				parameters: {mediaId: camera.media_id},
				resolve: resolve
			},
			(res) => {
				console.log('stopRecord:', res);
				syncMedia();
				if (res.returnValue) {
					dispatch({
						type: 'STOP_RECORDING',
						payload: id
					});
				}
			}
		);
	});
};

export default stopRecord;
