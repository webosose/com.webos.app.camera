import lunaAction from './lunaActions';
import {addSettings} from './settings';
import {addCameraStatus, updatPreviewResolution} from './updateCameraStatus';

const open = (id) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'open',
				parameters: {id},
				resolve: resolve
			},
			(res) => {
				console.log(JSON.stringify(res));
				resolve(res.handle);
			}
		);
	});
};
const getProperties = (handle) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'getProperties',
				parameters: {
					handle
				},
				resolve: resolve
			},
			(res) => {
				if (res.returnValue) {
					resolve({handle, res});
				}
			}
		);
	});
};
const setFormat = (handle, selRes) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'setFormat',
				parameters: {
					handle,
					params: {
						format: 'JPEG',
						...selRes
					}
				},
				resolve: resolve
			},
			(res) => {
				console.log(
					handle+'  setFormat: ' + JSON.stringify(selRes) + '' + JSON.stringify(res)
				);
				resolve(handle);
			}
		);
	});
};
const startPreview = (handle) => {
	return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'startPreview',
				parameters: {
					handle,
					params: {
						type: 'sharedmemory',
						source: '0'
					}
				},
				resolve: resolve
			},
			(res) => {
				resolve({
					handle,
					memsrc: res.key + ''
				});
			}
		);
	});
};
const startCamera = (id, changeResolution) => (dispatch, getState) => {
	return new Promise((resolve) => {
		open(id)
			.then((handle) => {
				if (changeResolution) {
					return {handle, res: false};
				}
				return getProperties(handle);
			})
			.then(({handle, res}) => {
				if (res instanceof Object) {
					dispatch(addSettings(id, res.params.resolution['JPEG']));
				}
				const {selRes} = getState().settings.find((v) => v.id === id);
				return setFormat(handle, selRes);
			})
			.then((handle) => {
				return startPreview(handle);
			})
			.then((res) => {
				console.log('CameraCont componentDidMount: ', res);
				const {
					width,
					height,
					fps: frameRate
				} = getState().settings.find((v) => v.id === id).selRes;

				if (changeResolution) {
					dispatch(
						updatPreviewResolution({
							id: id,
							width,
							height,
							frameRate,
							format: 'JPEG',
							streamType: 'JPEG',
							memType: 'shmem',
							memSrc: res.memsrc,
							handle: res.handle
						})
					);
				} else {
					dispatch(
						addCameraStatus({
							id: id,
							width,
							height,
							frameRate,
							format: 'JPEG',
							streamType: 'JPEG',
							memType: 'shmem',
							memSrc: res.memsrc,
							handle: res.handle
						})
					);
				}
				resolve();
			});
	});
};

export default startCamera;
