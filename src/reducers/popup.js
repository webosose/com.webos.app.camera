const popup = (state = '', action) => {
	switch (action.type) {
		case 'SHOW_POPUP':
			return action.payload;
		case 'HIDE_POPUP':
			return '';
		default:
			return state;
	}
};

export default popup;
