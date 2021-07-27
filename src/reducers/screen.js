const screen = (state = {name: 'main', data: {}}, action) => {
	switch (action.type) {
		case 'SCREEN_CHANGE':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

export default screen;
