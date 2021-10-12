import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import Spinner from '@enact/sandstone/Spinner';
import changeScreen from '../../actions/changeScreen';
import startRecord from '../../actions/startRecord';
import stopRecord from '../../actions/stopRecord';
import getSnapshot from '../../actions/getSnapshot';
import startCamera from '../../actions/startCamera';
import {closeCamera} from '../../actions/closeCameras';
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
import settingsIcon from '../../../public/Icons/settings.svg';
import Settings from '../../components/Settings/Settings';
import VideoContainer from '../../components/VideoContainer/VideoContainer';

const cx = classNames.bind(css);

class FullScreenPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recording: false,
			showSettings: false,
			loading: false
		};
		this.videoRef = React.createRef();
	}
	goToMainScreen = () => {
		//getting black screen when remove the video so first removed container
		let video_cont = document.getElementById('video_cont');
		video_cont.remove();
		setTimeout(() => {
			this.props.changeScreen({
				name: 'main',
				data: {}
			});
		});
	};
	takePhoto = () => {
		this.props.getSnapshot(this.props.details.id);
	};
	recordVideo = () => {
		if (this.state.recording) {
			this.setState({recording: false});
			this.props.stopRecord(this.props.details.id);
		} else {
			this.setState({recording: true});
			this.props.startRecord(this.props.details.id);
		}
	};
	launchVideoPalyer = () => {
		this.props.launch('videoList');
	};
	launchImageViewer = () => {
		this.props.launch('imageList');
	};
	openSettings = () => {
		this.setState({
			showSettings: true
		});
	};
	closeSettings = () => {
		this.setState({
			loading: false,
			showSettings: false
		});
	};
	showLoading = () => {
		// //getting black screen when remove the video so first removed container
		// let video_cont = document.getElementById('video_cont');
		// video_cont.style.display = 'none';
		this.setState(
			{
				loading: true,
				showSettings: false
			},
			() => {
				const {handle, media_id, id} = this.props.details;
				setTimeout(() => {
					this.props.closeCamera(handle, media_id).then(() => {
						this.props.startCamera(id).then(() => {
							this.closeSettings();
						});
					});
				}, 500);
			}
		);
	};
	getAspectRation = () => {
		const {width, height} = this.props.details;
		const ratio = (width / height).toFixed(2);
		if (ratio === '1.33') {
			return '69%';
		} else if (ratio === '1.78') {
			return '100%';
		}
		return '50%';
	};
	render() {
		const option = {
			mediaTransportType: 'CAMERA',
			option: {
				...this.props.details
			}
		};
		const {recording, showSettings, loading} = this.state;
		const cameraOptions = escape(JSON.stringify(option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		// console.log('Full Screen cameraOptions:  ', JSON.stringify(option));
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
						<img
							src={settingsIcon}
							alt=''
							className={cx('icon')}
							onClick={this.openSettings}
						/>

						{showSettings ? (
							<Settings
								id={this.props.data.id}
								showLoading={this.showLoading}
								closeSettings={this.closeSettings}
							/>
						) : (
							''
						)}
					</div>
				</div>

				{loading ? (
					<div className={cx('spinner_cont')}>
						<Spinner>Video Loading...</Spinner>
					</div>
				) : (
					<div id='video_cont' className={cx('video_cont')}>
						<VideoContainer
							media_id={this.props.data.media_id}
							id={this.props.data.id}
							width={this.getAspectRation()}
							type={type}
							className={cx(this.getAspectRation())}
						/>
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = ({cameraStatus}, ownProps) => {
	const details = cameraStatus.find((v) => v.id === ownProps.data.id);
	return {
		details
	};
};
const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data)),
	startRecord: (mediaID, cameraID) => dispatch(startRecord(mediaID, cameraID)),
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID)),
	updateMediaID: (data) => dispatch(updateMediaID(data)),
	getSnapshot: (mediaID) => dispatch(getSnapshot(mediaID)),
	launch: (type) => dispatch(launch(type)),
	startCamera: (id) => dispatch(startCamera(id, true)),
	closeCamera: (handle, media_id) => dispatch(closeCamera(handle, media_id))
});
export default connect(mapStateToProps, mapDispatchToProps)(FullScreenPreview);
