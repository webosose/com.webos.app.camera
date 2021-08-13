import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Image from '@enact/sandstone/Image';
import fullscreenIcon from '../../public/Icons/full screen.svg';
import stopRecordIcon from '../../public/Icons/StopRecording.svg';
import recordingIcon from '../../public/Icons/recording.svg';
import startRecordIcon from '../../public/Icons/StarRecording.svg';
import snapshoIcon from '../../public/Icons/snapshot.svg';
import changeScreen from '../actions/changeScreen';
import startRecord from '../actions/startRecord';
import stopRecord from '../actions/stopRecord';
import getSnapshot from '../actions/getSnapshot';
import {updateMediaID} from '../actions/updateCameraStatus';
import css from './CameraPreview.module.less';

const cx = classNames.bind(css);

class CameraPreview extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
		// console.log("props.data..",props.data)
		this.option = {
			mediaTransportType: 'CAMERA',
			option: {
				...props.data
			}
		};
		this.state = {
			showOption: false
		};
	}
	openOptions = () => {
		const {screen} = this.props;
		const disable = screen.data.disablPreviewOption;
		if (!disable) {
			this.setState((state) => {
				return {
					showOption: !state.showOption
				};
			});
		}
	};
	startRecording = () => {
		const {recording} = this.props.data;
		if (recording) {
			this.props.stopRecord(this.props.data.id);
		} else {
			this.props.startRecord(this.props.data.id);
		}
	};
	takeSnapShot = () => {
		this.props.getSnapshot(this.media_id);
	};
	showFullScreenPreview = () => {
		this.props.changeScreen({
			name: 'fullscreen',
			data: {...this.props.data}
		});
	};

	render = () => {
		//debugger;
		const showOption =
			this.state.showOption && !this.props.screen.data.disablPreviewOption;
		const {recording} = this.props.data;
		const cameraOptions = escape(JSON.stringify(this.option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		console.log('cameraOptions:  ', this.props.data);
		// console.log('cameraOptions escape:  ', cameraOptions);
		return (
			<div className={cx('videocont')} onClick={this.openOptions}>
				{showOption ? (
					<div className={cx('videooption')}>
						<Image
							src={recording ? stopRecordIcon : startRecordIcon}
							className={cx('icon')}
							onClick={this.startRecording}
						/>
						<Image
							src={snapshoIcon}
							className={cx('icon')}
							onClick={this.takeSnapShot}
						/>
						<Image
							src={fullscreenIcon}
							className={cx('icon')}
							onClick={this.showFullScreenPreview}
						/>
					</div>
				) : (
					''
				)}
				{recording ? (
					<Image src={recordingIcon} className={cx('rec_icon')} />
				) : (
					''
				)}
				<video ref={this.videoRef}>
					<source src='camera://com.webos.service.camera2/' type={type} />
					{/* <source src='file:///media/multimedia/Record05082021-23260371.mp4'/> */}
				</video>
			</div>
		);
	};
	getupdatecamerastate = (e) => {
		const obj = JSON.parse(e.detail);
		console.log('detail msg :: ' + obj.mediaId);
		if (this.props.data.media_id !== obj.mediaId) {
			this.props.updateMediaID({
				id: this.props.data.id,
				media_id: obj.mediaId
			});
		}
	};
	componentDidMount = () => {
		this.videoRef.current.load();
		this.videoRef.current.addEventListener(
			'updatecamerastate',
			this.getupdatecamerastate
		);
	};
	componentWillUnmount = () => {
		this.videoRef.current.removeEventListener(
			'updatecamerastate',
			this.getupdatecamerastate
		);
	};
}
const mapStateToProps = ({screen}) => {
	return {
		screen
	};
};
const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data)),
	startRecord: (mediaID, cameraID) => dispatch(startRecord(mediaID, cameraID)),
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID)),
	updateMediaID: (data) => dispatch(updateMediaID(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraPreview);
