
const cameralist = (state = [], action) => {
	switch (action.type) {
		case 'CAMERALIST_LOADED':
			return [...action.payload];
		default:
			return state;
	}
};

export default cameralist;
