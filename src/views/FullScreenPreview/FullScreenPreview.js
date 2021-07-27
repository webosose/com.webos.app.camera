import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
// import Image from '@enact/sandstone/Image';
import changeScreen from '../../actions/changeScreen';
import css from './FullScreenPreview.module.less';
import backIcon from '../../../public/Icons/Back.svg';
// import recordIcon from '../../../public/Icons/StarRecording.svg';
// import stopRecordIcon from '../../../public/Icons/StopRecording.svg';
// import recordingIcon from '../../../public/Icons/recording.svg';

// import snapshoIcon from '../../../public/Icons/snapshot.svg';
// import videoPlayerIcon from '../../../public/Icons/Video player.svg';
// import imagePlayerIcon from '../../../public/Icons/Image viewer.svg';
const cx = classNames.bind(css);

class FullScreenPreview extends React.Component {
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
	}
	goToMainScreen = (event) => {
		console.log(event);
		this.props.changeScreen({
			name: 'main',
			data: {}
		});
	};
	render() {
		const cameraOptions = escape(JSON.stringify(this.option));
		const type = 'service/webos-camera;cameraOption=' + cameraOptions;
		console.log('cameraOptions:  ', this.option);
		return (
			<div className={cx('cont')}>
				<img
					src={backIcon}
					alt=''
					className={cx('backicon')}
					onClick={this.goToMainScreen}
				/>
				<video ref={this.videoRef}>
					{/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/> */}
					<source src='camera://com.webos.service.camera2/' type={type} />
				</video>
			</div>
		);
	}
	componentDidMount = () => {
		// this.videoRef.current.load();
	};
}

const mapDispatchToProps = (dispatch) => ({
	changeScreen: (data) => dispatch(changeScreen(data))
});
export default connect(null, mapDispatchToProps)(FullScreenPreview);
