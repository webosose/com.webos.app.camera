const cameraStatus = (state = [], action) => {
	console.log('action: ', action.payload);
	switch (action.type) {
		case 'ADD_CAMERA_STATUS':
			return [...state, action.payload];
		case 'START_RECORDING':
			return state.map((v) => {
				if (v.id === action.payload) {
					v.recording = true;
				}
				return v;
			});
		case 'STOP_RECORDING':
			return state.map((v) => {
				if (v.id === action.payload) {
					v.recording = false;
				}
				return v;
			});
		case 'CLEAR_CAMERA_STATUS':
			return [];
		default:
			return state;
	}
};

export default cameraStatus;
