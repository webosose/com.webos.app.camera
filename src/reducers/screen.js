const screen = (
	state = {
		name: 'main',
		data: {
			disablPreviewOption: false,
			disableCamList: false,
			disablFooterRecording: false
		}
	},
	action
) => {
	switch (action.type) {
		case 'SCREEN_CHANGE':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

export default screen;
