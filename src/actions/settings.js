export const addSettings = (id, resolutions) => {
	const resolutionsFiltered = resolutions.filter((v) => {
		const [w, h] = v.split(',');
		const ratio = (w / h).toFixed(2);
		if (ratio === '1.33' || ratio === '1.78') {
			return true;
		}
		return false;
	});
	const resolutionsUniqued = [...new Set(resolutionsFiltered.map((v) => {
		const [w, h] = v.split(',');
		const f = w <= 900 ? 15 : 10;
		return [w, h, f].toString();
	}))];
	const selectResolution =
		resolutionsUniqued.length > 0 ? resolutionsUniqued[resolutionsUniqued.length - 1] : '640,480,15';
	const [width, height, fps] = selectResolution
		.split(',')
		.map((v) => parseInt(v));
	return {
		type: 'ADD_SETTINGS',
		payload: {
			id,
			resolutions: [...resolutionsUniqued],
			name: '',
			selRes: {
				width,
				height,
				fps
			}
		}
	};
};
export const setSelectedResolution = (data) => ({
	type: 'SELECTED_RESOLUTION',
	payload: data
});
export const setSelectedName = (data) => ({
	type: 'SELECTED_NAME',
	payload: data
});
export const clearSettings = () => ({
	type: 'CLEAR_SETTINGS'
});
