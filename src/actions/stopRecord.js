import lunaAction from './lunaActions';
const startRecord = (mediaId, cameraID) => (dispatch) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'stopCameraRecord',
				parameters: {mediaId},
				resolve: resolve
			},
			(res) => {
				console.log('stopRecord:', res);
				if (res.returnValue) {
					dispatch({
						type: 'STOP_RECORDING',
						payload: cameraID
					});
				}
			}
		);
	});
};

export default startRecord;
