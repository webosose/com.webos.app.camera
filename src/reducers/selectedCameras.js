const selectedCameras = (state = [], action) => {
	switch (action.type) {
		case 'SELECTED_CAMERAS':
			return [...action.payload];
		default:
			return state;
	}
};
export default selectedCameras;