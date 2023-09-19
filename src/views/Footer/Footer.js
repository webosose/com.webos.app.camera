import Image from '@enact/sandstone/Image';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import getCameraList from '../../actions/getCameraList';
import refreshIcon from '../../../public/Icons/refresh.svg';
import power_on from '../../../public/Icons/power_on.svg';
import power_off from '../../../public/Icons/power_off.svg';
import startRecordIcon from '../../../public/Icons/StarRecording.svg';
import stopRecordIcon from '../../../public/Icons/StopRecording.svg';
import startRecord from '../../actions/startRecord';
import stopRecord from '../../actions/stopRecord';
import getSnapshot from '../../actions/getSnapshot';
import launch from '../../actions/launchActions';
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
			cameraPower: true,
			inprogressdisable : false
		};
	}
	refresh = () => {
		if(!this.state.inprogressdisable){
			console.log("refresh   refresh")
			this.props.turnOffCamera(true);
			this.props.changeFooterState();
		}
	};
	closeCameras = () => {
		if(!this.state.inprogressdisable){
			this.props.turnOffCamera();
			this.props.changeFooterState("stopcamera");
		}
	};
	openCameras = () => {
		if(!this.state.inprogressdisable){
			this.props.getCameraList();
			this.props.changeFooterState();
		}
	};
	UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.footerAction);
        this.setState({
			inprogressdisable: nextProps.footerAction === 'inprogress' || nextProps.footerAction === 'stopcamera'
		});
    }
	powerONandOff = () => {
		if(!this.state.inprogressdisable){
			this.setState({
				inprogressdisable:true
			});
			if (this.state.cameraPower) {
				this.setState({
					cameraPower: false
				});
				this.closeCameras();
			} else {
				this.setState({
					cameraPower: true
				});
				this.openCameras();
			}
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
	launchVideoPalyer = () => {
		this.props.launch('videoList');
	};
	launchImageViewer = () => {
		this.props.launch('imageList');
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
						disabled = {this.state.inprogressdisable}
						src={refreshIcon}
						onClick={this.refresh}
						className={cx('icon')}
					/>
					<Image
						disabled = {this.state.inprogressdisable}
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
					<Image
						src={videoPlayerIcon}
						onClick={this.launchVideoPalyer}
						className={cx('icon')}
					/>
					<Image
						src={imagePlayerIcon}
						onClick={this.launchImageViewer}
						className={cx('icon')}
					/>
				</div>
				<div className={cx('row')} />
			</div>
		);
	}
}
const mapStateToProps = ({selectedCameras, cameraStatus, screen,footerAction}) => {
	return {
		selectedCameras,
		cameraStatus,
		screen,
		footerAction
	};
};
const mapDispatchToProps = (dispatch) => ({
	getCameraList: () => dispatch(getCameraList()),
	startRecord: (mediaID, ui) => dispatch(startRecord(mediaID, ui)),
	stopRecord: (mediaID, ui) => dispatch(stopRecord(mediaID, ui)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID)),
	launch: (type) => dispatch(launch(type)),
	changeFooterState:(stopcamera) => dispatch({
		type:'CHANGE_FOOTER_STATE',
		payload:stopcamera || 'inprogress'
	}),
});
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
