const ptzStatus = (state = {}, action) => {
	switch (action.type) {
		case 'PTZ_CHANGE':
			return {...state,...action.payload};
		default:
			return state;
	}
};

export const ptzSupport = (state = {}, action) => {
	switch (action.type) {
		case 'PTZ_SUPPORT':
			return {...state,...action.payload};
		default:
			return state;
	}
};

export default ptzStatus;
