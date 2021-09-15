const settings = (state = [], action) => {
	switch (action.type) {
		case 'ADD_SETTINGS':
			return [...state, action.payload];
		case 'SELECTED_RESOLUTION':
			return state.map((v) => {
				if (v.id === action.payload.id) {
					v.selRes = {
						width: action.payload.width,
						height: action.payload.height,
						fps: action.payload.fps
					};
				}
				return v;
			});
		case 'SELECTED_NAME':
			return state.map((v) => {
				if (v.id === action.payload.id) {
					v.name = action.payload.name;
				}
				return v;
			});
		case 'CLEAR_SETTINGS':
			return [];
		default:
			return state;
	}
};

export default settings;
