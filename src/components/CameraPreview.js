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
			showOption: false,
			recording: false
		};
	}
	openOptions = () => {
		this.setState((state) => {
			return {
				showOption: !state.showOption
			};
		});
	};
	startRecording = () => {
		if (this.state.recording) {
			this.setState({recording: false});
			this.props.stopRecord(this.media_id, this.props.data.id);
		} else {
			this.setState({recording: true});
			this.props.startRecord(this.media_id, this.props.data.id);
		}
	};
	showFullScreenPreview = () => {
		this.props.changeScreen({
			name: 'fullscreen',
			data: {...this.props.data}
		});
	};
	render = () => {
		//debugger;
		const {showOption, recording} = this.state;
		const cameraOptions = escape(JSON.stringify(this.option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		console.log('cameraOptions:  ', this.option);
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
						<Image src={snapshoIcon} className={cx('icon')} />
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
				</video>
			</div>
		);
	};
	getupdatecamerastate = (e) => {
		const obj = JSON.parse(e.detail);
		console.log('detail msg :: ' + obj.mediaId);
		this.media_id = obj.mediaId;
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
	stopRecord: (mediaID, cameraID) => dispatch(stopRecord(mediaID, cameraID))
});
export default connect(null, mapDispatchToProps)(CameraPreview);
