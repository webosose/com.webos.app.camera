import lunaAction from './lunaActions';
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
				console.log("res.deviceList:",res.deviceList)
				if (res.returnValue) {
					dispatch({
                        type:"CAMERALIST_LOADED",
                        payload:res.deviceList
                    });
				}
			}
		);
	});
};
export default getCameraList;
