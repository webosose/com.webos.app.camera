const selectedCameras = (state = [], action) => {
	console.log("action:",action.payload);
	switch (action.type) {
		case 'SELECTED_CAMERAS':
			return [...action.payload];
		default:
			return state;
	}
};
export default selectedCameras;