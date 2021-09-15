const cameraStatus = (state = [], action) => {
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
		case 'UPDATE_MEDIA_ID':
			return state.map((v) => {
				if (v.id === action.payload.id) {
					v.media_id = action.payload.media_id;
				}
				return v;
			});
		case 'UPDATE_PREVIEW_RESOLUTION':
			return state.map((v) => {
				if (v.id === action.payload.id) {
					return {...action.payload};
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
