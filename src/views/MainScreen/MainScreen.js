import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Icon from '@enact/sandstone/Icon';
import closeCameras from '../../actions/closeCameras';
import CameraList from '../CameraList/CameraList';
import CamerasGrid from '../CamerasGrid/CamerasGrid';
import Footer from '../Footer/Footer';
import css from './MainScreen.module.less';

const cx = classNames.bind(css);

class MainScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	emptySrc = () => {
		this.props.cameraStatus.forEach((v) => {
			let video = document.getElementById(v.id);
			video.src = '';
			video = null;
		});
	};
	turnOffCamera = (refresh = false, closeApp = false) => {
		this.emptySrc();
		setTimeout(() => {
			this.props.closeCameras(refresh, closeApp);
		}, 500);
	};
	handleClose = () => {
		this.turnOffCamera(false, true);
	};
	render() {
		return (
			<div>
				<Icon className={cx('closeIcon')} onClick={this.handleClose}>
					closex
				</Icon>
				<div className={cx('row')}>
					<div className={cx('list')}>
						<CameraList />
					</div>
					<div className={cx('grid')}>
						<CamerasGrid />
					</div>
				</div>
				<Footer turnOffCamera={this.turnOffCamera} />
			</div>
		);
	}
}
const mapStateToProps = ({cameraStatus}) => {
	return {
		cameraStatus
	};
};
const mapDispatchToProps = (dispatch) => ({
	closeCameras: (refresh, closeApp) => dispatch(closeCameras(refresh, closeApp))
});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
