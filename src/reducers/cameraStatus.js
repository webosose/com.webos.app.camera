const cameraStatus = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_CAMERA_STATUS':
			return {...state,...action.payload}
		default:
			return state;
	}
};

export default cameraStatus;