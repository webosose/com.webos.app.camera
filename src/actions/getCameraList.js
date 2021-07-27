import lunaAction from './lunaActions';
import startCamera from './startCamera';
import {addCameraStatus} from './updateCameraStatus';
const updateCameraStatus = (list) => (dispatch) => {
	list.forEach(({id}) => {
		startCamera(id).then((res) => {
			console.log('CameraCont componentDidMount: ', res);
			dispatch(
				addCameraStatus({
					id: id,
					width: 1280,
					height: 720,
					frameRate: 30,
					format: 'JPEG',
					streamType: 'JPEG',
					memType: 'shmem',
					memSrc: res.memsrc
				})
			);
		});
	});
};
const getCameraList = () => (dispatch) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'getCameraList',
				parameters: {},
				resolve: resolve
			},
			(res) => {
				console.log('res.deviceList:', res.deviceList);
				if (res.returnValue) {
					dispatch(updateCameraStatus(res.deviceList));
					dispatch({
						type: 'CAMERALIST_LOADED',
						payload: res.deviceList
					});
				}
			}
		);
	});
};

export default getCameraList;
