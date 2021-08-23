import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
// import Image from '@enact/sandstone/Image';
import changeScreen from '../../actions/changeScreen';
import startRecord from '../../actions/startRecord';
import stopRecord from '../../actions/stopRecord';
import getSnapshot from '../../actions/getSnapshot';
import {updateMediaID} from '../../actions/updateCameraStatus';
import launch from '../../actions/launchActions';
import css from './FullScreenPreview.module.less';
import backIcon from '../../../public/Icons/Back.svg';
import recordingIcon from '../../../public/Icons/recording.svg';
import videoPlayerIcon from '../../../public/Icons/Video player.svg';
import imagePlayerIcon from '../../../public/Icons/Image viewer.svg';
import snapshoIcon from '../../../public/Icons/snapshot.svg';
import stopRecordIcon from '../../../public/Icons/StopRecording.svg';
import StarRecording from '../../../public/Icons/StarRecording.svg';

const cx = classNames.bind(css);

class FullScreenPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recording: false
		};
		this.videoRef = React.createRef();
		// console.log("props.data..",props.data)
		this.option = {
			mediaTransportType: 'CAMERA',
			option: {
				...props.data
			}
		};
	}
	goToMainScreen = () => {
		this.props.changeScreen({
			name: 'main',
			data: {}
		});
	};
	takePhoto = () => {
		this.props.getSnapshot(this.option.option.id);
	};
	recordVideo = () => {
		if (this.state.recording) {
			this.setState({recording: false});
			this.props.stopRecord(this.option.option.id);
		} else {
			this.setState({recording: true});
			this.props.startRecord(this.option.option.id);
		}
	};
	launchVideoPalyer = () => {
		this.props.launch('videoList');
	};
	launchImageViewer = () => {
		this.props.launch('imageList');
	};
	render() {
		const {recording} = this.state;
		const cameraOptions = escape(JSON.stringify(this.option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		console.log('cameraOptions:  ', this.option);
		return (
			<div className={cx('cont')}>
				<div className={cx('inner_con')}>
					<div className={cx('icon_top_con')}>
						<img
							src={backIcon}
							alt=''
							className={cx('icon')}
							onClick={this.goToMainScreen}
						/>
						<div className={cx('recoding_cont')}>
							{recording ? (
								<img
									src={recordingIcon}
									alt=''
									className={cx('icon')}
									onClick={this.goToMainScreen}
								/>
							) : (
								''
							)}
						</div>
					</div>
					<div className={cx('righicon_con')}>
						<img
							src={videoPlayerIcon}
							onClick={this.launchVideoPalyer}
							alt=''
							className={cx('icon')}
						/>
						<img
							src={imagePlayerIcon}
							onClick={this.launchImageViewer}
							alt=''
							className={cx('icon')}
						/>
						<img
							src={recording ? stopRecordIcon : StarRecording}
							alt=''
							className={cx('icon')}
							onClick={this.recordVideo}
						/>
						<img
							src={snapshoIcon}
							alt=''
							className={cx('icon')}
							onClick={this.takePhoto}
						/>
					</div>
				</div>
				<video ref={this.videoRef}>
					{/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/> */}
					<source src='camera://com.webos.service.camera2/' type={type} />
				</video>
			</div>
		);
	}
	getupdatecamerastate = (e) => {
		const obj = JSON.parse(e.detail);
		this.props.updateMediaID({
			id: this.option.option.id,
			media_id: obj.mediaId
		});
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

const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data)),
	startRecord: (mediaID, cameraID) => dispatch(startRecord(mediaID, cameraID)),
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID)),
	updateMediaID: (data) => dispatch(updateMediaID(data)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID)),
	launch: (type) => dispatch(launch(type))
});
export default connect(null, mapDispatchToProps)(FullScreenPreview);
