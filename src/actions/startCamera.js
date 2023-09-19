import lunaAction from './lunaActions';
import { getPTZState } from './ptzChange';
import { addSettings } from './settings';
import { addCameraStatus, updatPreviewResolution } from './updateCameraStatus';
const MEDIA_TYPES = {
	JPEG: 'JPEG',
	YUV: 'YUV'
};

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
const getCameraInfoById = (id) => {
	return new Promise((resolve, reject) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'getInfo',
				parameters: {
					id
				},
				resolve: resolve
			},
			(res) => {
				if (res?.returnValue) {
					resolve(res?.info);
				} else {
					console.log('getInfo by Id: ' + id + ' has error: ' + JSON.stringify(res));
					reject({
						method: 'getInfo',
						response: res
					});
				}
			}
		);
	});
}
const setFormat = (handle, selRes) => {
	return new Promise((resolve) => {
		const params = {
			format: MEDIA_TYPES.JPEG,
			...selRes
		};
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'setFormat',
				parameters: {
					handle,
					params
				},
				resolve: resolve
			},
			(res) => {
				console.log(
					handle + ' setFormat: ' + JSON.stringify(params) + '' + JSON.stringify(res)
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
	dispatch({
		type:'CHANGE_FOOTER_STATE',
		payload:'inprogress'
	});
	return new Promise((resolve) => {
		Promise.all([getCameraInfoById(id), open(id)])
			.then((response) => {
				const cameraInfo = response[0];
				const handle = response[1];
				const cameraResolution = cameraInfo?.resolution || {};

				dispatch(getPTZState(id));
				if (!changeResolution) {
					dispatch(addSettings(id, cameraResolution[MEDIA_TYPES.JPEG] || []));
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
							format: MEDIA_TYPES.JPEG,
							streamType: MEDIA_TYPES.JPEG,
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
							format: MEDIA_TYPES.JPEG,
							streamType: MEDIA_TYPES.JPEG,
							memType: 'shmem',
							memSrc: res.memsrc,
							handle: res.handle
						})
					);
				}
				if(getState().cameralist.length === getState().cameraStatus.length){
					setTimeout(()=>{
						dispatch({
							type:'CHANGE_FOOTER_STATE',
							payload:''
						});
					},1000);
				}
				resolve();
			})
			.catch((err) => {
				console.log('Start camera error: ', JSON.stringify(err));
			});
	});
};

export default startCamera;
