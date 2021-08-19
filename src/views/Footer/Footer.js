import Image from '@enact/sandstone/Image';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import closeCameras from '../../actions/closeCameras';
import getCameraList from '../../actions/getCameraList';
import refreshIcon from '../../../public/Icons/refresh.svg';
import power_on from '../../../public/Icons/power_on.svg';
import power_off from '../../../public/Icons/power_off.svg';
import startRecordIcon from '../../../public/Icons/StarRecording.svg';
import stopRecordIcon from '../../../public/Icons/StopRecording.svg';
import startRecord from '../../actions/startRecord';
import stopRecord from '../../actions/stopRecord';
import getSnapshot from '../../actions/getSnapshot';
import changeScreen from '../../actions/changeScreen';
import snapshoIcon from '../../../public/Icons/snapshot.svg';
import videoPlayerIcon from '../../../public/Icons/Video player.svg';
import imagePlayerIcon from '../../../public/Icons/Image viewer.svg';
import css from './Footer.module.less';

const cx = classNames.bind(css);

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recording: false,
			cameraPower: true
		};
	}
	refresh = () => {
		this.props.closeCameras(true);
	};
	powerONandOff = () => {
		if (this.state.cameraPower) {
			this.setState({
				cameraPower: false
			});
			this.props.closeCameras(false);
		} else {
			this.setState({
				cameraPower: true
			});
			this.props.getCameraList();
		}
	};
	record = () => {
		const disable =
			this.props.selectedCameras.length === 0 ||
			this.props.screen.data.disablFooterRecording;
		if (!disable) {
			const {recording} = this.state;
			if (recording) {
				this.props.selectedCameras.forEach((camera) => {
					this.props.stopRecord(camera, 'footer');
				});
				this.setState({
					recording: false
				});
			} else {
				this.props.selectedCameras.forEach((camera) => {
					this.props.startRecord(camera, 'footer');
				});
				this.setState({
					recording: true
				});
			}
		}
	};
	takeSnapShot = () => {
		this.props.cameraStatus.forEach((camera, index) => {
			this.props.getSnapshot(
				camera.id,
				index !== this.props.cameraStatus.length
			);
		});
	};
	render() {
		const disable =
			this.props.selectedCameras.length === 0 ||
			this.props.screen.data.disablFooterRecording ||
			false;
		const {recording, cameraPower} = this.state;
		console.log('cameraPower:  ' + cameraPower);
		return (
			<div>
				<div className={cx('row')}>
					<Image
						src={refreshIcon}
						onClick={this.refresh}
						className={cx('icon')}
					/>
					<Image
						src={cameraPower ? power_off : power_on}
						onClick={this.powerONandOff}
						className={cx('icon')}
					/>
					<Image
						disabled={disable}
						src={recording ? stopRecordIcon : startRecordIcon}
						onClick={this.record}
						className={cx('icon')}
					/>
					<Image
						src={snapshoIcon}
						onClick={this.takeSnapShot}
						className={cx('icon')}
					/>
					<Image src={videoPlayerIcon} className={cx('icon')} />
					<Image src={imagePlayerIcon} className={cx('icon')} />
				</div>
				<div className={cx('row')} />
			</div>
		);
	}
}
const mapStateToProps = ({selectedCameras, cameraStatus, screen}) => {
	return {
		selectedCameras,
		cameraStatus,
		screen
	};
};
const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data)),
	closeCameras: (handle) => dispatch(closeCameras(handle)),
	getCameraList: () => dispatch(getCameraList()),
	startRecord: (mediaID, cameraID) => dispatch(startRecord(mediaID, cameraID)),
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID))
});
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
