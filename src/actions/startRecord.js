import lunaAction from './lunaActions';
const startRecord = (mediaId, cameraID) => (dispatch) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'startCameraRecord',
				parameters: {
					mediaId,
					location: '/media/multimedia/',
					format: 'MP4',
					audio: false,
					audioSrc: 'pcm_input'
				},
				resolve: resolve
			},
			(res) => {
				console.log('startRecord:', res);
				if (res.returnValue) {
					dispatch({
						type: 'START_RECORDING',
						payload: cameraID
					});
				}
			}
		);
	});
};

export default startRecord;
