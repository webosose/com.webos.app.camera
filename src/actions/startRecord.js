import lunaAction from './lunaActions';
import changeScreen from './changeScreen';
const startRecord = (id, ui) => (dispatch, getState) => {
	const camera = getState().cameraStatus.find((value) => value.id === id);
	if (ui === 'footer') {
		dispatch(
			changeScreen({
				data: {
					disableCamList: true,
					disablPreviewOption: true
				}
			})
		);
	} else {
		dispatch(
			changeScreen({
				data: {
					...camera,
					disableCamList: true,
					disablFooterRecording: true
				}
			})
		);
	}
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'startCameraRecord',
				parameters: {
					mediaId: camera.media_id,
					location: '/media/multimedia/video-',
					format: 'MP4',
					audio: true,
					audioSrc: 'record'
				},
				resolve: resolve
			},
			(res) => {
				console.log('startRecord:', res);
				if (res.returnValue) {
					dispatch({
						type: 'START_RECORDING',
						payload: id
					});
				}
			}
		);
	});
};

export default startRecord;
