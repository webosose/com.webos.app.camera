import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Image from '@enact/sandstone/Image';
import BodyText from '@enact/sandstone/BodyText';
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
import VideoContainer from './VideoContainer/VideoContainer';

const cx = classNames.bind(css);

class CameraPreview extends React.Component {
	constructor(props) {
		super(props);
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
		if (ratio === '1.33') {
			return '75%';
		} else if (ratio === '1.78') {
			return '100%';
		}
		return '50%';
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
		// console.log('Main Screen cameraOptions: ', JSON.stringify(option));
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
						{!recording ? (
							<Image
								src={fullscreenIcon}
								className={cx('icon')}
								onClick={this.showFullScreenPreview}
							/>
						) : (
							''
						)}
					</div>
				) : (
					''
				)}
				<div className={cx('video_cont')}>
					<div className={cx('header')}>
						<BodyText className={cx('footage')}>
							{this.props.name || this.props.data.id}
						</BodyText>
						{recording ? (
							<Image src={recordingIcon} className={cx('rec_icon')} />
						) : (
							''
						)}
					</div>
					<VideoContainer
						media_id={this.props.data.media_id}
						id={this.props.data.id}
						width={this.getAspectRation()}
						type={type}
						className={cx(this.getAspectRation())}
					/>
				</div>
			</div>
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
