import React from 'react';
import classNames from 'classnames/bind';
import css from './VideoContainer.module.less';
import {connect} from 'react-redux';
import {updateMediaID} from '../../actions/updateCameraStatus';

const cx = classNames.bind(css);

class VideoContainer extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	render() {
		const {type, width} = this.props;

		return (
			<div className={cx('video_cont')}>
				<video id={this.props.id} width={width} ref={this.videoRef}>
					<source src='camera://com.webos.service.camera2/' type={type} />
					{/* <source src='file:///media/multimedia/Record05082021-23260371.mp4'/> */}
				</video>
			</div>
		);
	}
	getupdatecamerastate = (e) => {
		const obj = JSON.parse(e.detail);
		if (this.props.media_id !== obj.mediaId && obj.cameraState === 'playing') {
			console.log('detail msg :: ', obj);
			this.props.updateMediaID({
				id: this.props.id,
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
		// this.videoRef.current.style.visibility = 'hidden';
		// this.videoRef.current.style.display = 'none';
		this.videoRef.current.src = '';
		// this.videoRef.current.width = '0px';
		// this.videoRef.current.remove();

		// console.log('Video container componentWillUnmount: enter ');
		// var video = document.getElementById('video-id');
		// video.src = '';
		// console.log('Video container componentWillUnmount: end');
	};
}

const mapDispatchToProps = (dispatch) => ({
	updateMediaID: (data) => dispatch(updateMediaID(data))
});
export default connect(null, mapDispatchToProps)(VideoContainer);
