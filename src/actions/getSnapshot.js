import lunaAction from './lunaActions';
const getSnapshot = (id) => (dispatch, getState) => {
	const camera = getState().cameraStatus.find((value) => value.id === id);
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'takeCameraSnapshot',
				parameters: {
					mediaId: camera.media_id,
					location: '/media/multimedia/image-',
					format: 'jpg',
					width: 1280,
					height: 720,
					pictureQuality: 30
				},
				resolve: resolve
			},
			(res) => {
				console.log('getSnapshot:', res);
			}
		);
	});
};

export default getSnapshot;
