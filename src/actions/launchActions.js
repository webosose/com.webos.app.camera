import lunaAction from './lunaActions';
const getList = (type) => {
	let name = 'getVideoList';
	let id = 'com.webos.app.videoplayer';
	if (type === 'imageList') {
		name = 'getImageList';
		id = 'com.webos.app.imageviewer';
	}
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.mediaindexer',
				method: name,
				parameters: {
					uri: 'storage:///media/multimedia'
				},
				resolve: resolve
			},
			(res) => {
				delete res.errorCode;
				delete res.returnValue;
				delete res.errorText;
				const list = res[type]['results'];
				const returnValue = {
					id
				};
				if (list.length > 0) {
					returnValue.params = {
						[type]: {
							results: [list[list.length - 1]],
							count: 1
						}
					};
				}
				resolve(returnValue);
			}
		);
	});
};
const launch = (type) => (dispatch) => {
	getList(type, dispatch).then((value) => {
		return new Promise((resolve) => {
			lunaAction(
				{
					service: 'luna://com.webos.applicationManager',
					method: 'launch',
					parameters: {
						...value
					},
					resolve: resolve
				},
				(res) => {
					console.log(type + ' App_LAUNCH', res);
				}
			);
		});
	});
};

export default launch;
