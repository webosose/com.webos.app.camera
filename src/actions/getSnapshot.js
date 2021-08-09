import lunaAction from './lunaActions';
const getSnapshot = (mediaId) => () => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.media',
				method: 'takeCameraSnapshot',
				parameters: {
					mediaId,
					location: '/media/multimedia/',
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
