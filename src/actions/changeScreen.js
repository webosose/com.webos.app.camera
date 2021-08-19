const changeScreen = (data) => ({
	type: 'SCREEN_CHANGE',
	payload: data
});
export const showPopup = (message) => ({
	type: 'SHOW_POPUP',
	payload: message
});
export const hidePopup = () => ({
	type: 'HIDE_POPUP'
});
export default changeScreen;
