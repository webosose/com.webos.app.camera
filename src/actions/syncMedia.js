import lunaAction from './lunaActions';
const syncMedia = () => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.mediaindexer',
				method: 'requestMediaScan',
				parameters: {path: '/media/multimedia'},
				resolve: resolve
			},
			(res) => {
				console.log('SyncMedia:', res);
			}
		);
	});
};

export default syncMedia;
