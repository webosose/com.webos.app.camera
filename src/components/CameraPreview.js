import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Image from '@enact/sandstone/Image';
import Item from '@enact/sandstone/Item';
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
import launch from '../actions/launchActions';
import css from './CameraPreview.module.less';

const cx = classNames.bind(css);

class CameraPreview extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
		// console.log("props.data..",props.data)
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
		this.props.getSnapshot(this.props.data.id);
	};
	showFullScreenPreview = () => {
		this.props.changeScreen({
			name: 'fullscreen',
			data: {...this.props.data}
		});
	};
	launchVideoPalyer = () => {
		this.props.launch('videoList');
	};
	launchImageViewer = () => {
		this.props.launch('imageList');
	};
	getAspectRation = () => {
		const {width, height} = this.props.data;
		const ratio = (width / height).toFixed(2);
		console.log(ratio);
		if (ratio === '1.33') {
			return 'video_4_3';
		} else if (ratio === '1.78') {
			return 'video_16_9';
		}
		return 'video_default';
	};
	render = () => {
		//debugger;
		const option = {
			mediaTransportType: 'CAMERA',
			option: {
				...this.props.data
			}
		};
		const showOption =
			this.state.showOption && !this.props.screen.data.disablPreviewOption;
		const {recording} = this.props.data;
		const cameraOptions = escape(JSON.stringify(option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		console.log('Main Screen:  ', JSON.stringify(option));
		return (
			<div className={cx('cont')} onClick={this.openOptions}>
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
				<div className={cx('video_cont')}>
					<div className={cx('header')}>
						<Item className={cx('footage')}>
							{this.props.name || this.props.data.id}
						</Item>
						{recording ? (
							<Image src={recordingIcon} className={cx('rec_icon')} />
						) : (
							''
						)}
					</div>
					<video ref={this.videoRef} className={cx(this.getAspectRation())}>
						<source src='camera://com.webos.service.camera2/' type={type} />
						{/* <source src='file:///media/multimedia/Record05082021-23260371.mp4'/> */}
					</video>
				</div>
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
const mapStateToProps = ({screen, settings}, ownProps) => {
	const {name} = settings.find((v) => v.id === ownProps.data.id);
	return {
		screen,
		name
	};
};
const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data)),
	startRecord: (mediaID, cameraID) => dispatch(startRecord(mediaID, cameraID)),
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID)),
	updateMediaID: (data) => dispatch(updateMediaID(data)),
	launch: (type) => dispatch(launch(type))
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraPreview);
