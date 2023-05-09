const footerAction = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_FOOTER_STATE':
			return action.payload;
		default:
			return state;
	}
};

export default footerAction;
