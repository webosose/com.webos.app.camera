import lunaAction from './lunaActions';
import {showPopup, hidePopup} from './changeScreen';
import syncMedia from './syncMedia';

const getSnapshot =
	(id, popup = true) =>
	(dispatch, getState) => {
		const camera = getState().cameraStatus.find((value) => value.id === id);
		return new Promise((resolve) => {
			lunaAction(
				{
					service: 'luna://com.webos.media',
					method: 'takeCameraSnapshot',
					parameters: {
						mediaId: camera.media_id,
						location: '/media/multimedia/image-',
						format: 'jpg',
						width: 1280,
						height: 720,
						pictureQuality: 30
					},
					resolve: resolve
				},
				() => {
					if (popup) {
						dispatch(showPopup('Snapshot has been taken successfully.'));
						setTimeout(() => syncMedia(), 1000);
						setTimeout(() => dispatch(hidePopup()), 2000);
					}
				}
			);
		});
	};

export default getSnapshot;
