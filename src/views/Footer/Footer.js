import Image from '@enact/sandstone/Image';
import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import refreshIcon from '../../../public/Icons/refresh.svg';
import powerIcon from '../../../public/Icons/power.svg';
import recordIcon from '../../../public/Icons/StarRecording.svg';
// import stopRecordIcon from '../../../public/Icons/StopRecording.svg';
// import recordingIcon from '../../../public/Icons/recording.svg';
import snapshoIcon from '../../../public/Icons/snapshot.svg';
import videoPlayerIcon from '../../../public/Icons/Video player.svg';
import imagePlayerIcon from '../../../public/Icons/Image viewer.svg';
import css from './Footer.module.less';

const cx = classNames.bind(css);

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<div className={cx('row')}>
					<Image src={refreshIcon} className={cx('icon')} />
					<Image src={powerIcon} className={cx('icon')} />
					<Image src={recordIcon} className={cx('icon')} />
					<Image src={snapshoIcon} className={cx('icon')} />
					<Image src={videoPlayerIcon} className={cx('icon')} />
					<Image src={imagePlayerIcon} className={cx('icon')} />
				</div>
				<div className={cx('row')} />
			</div>
		);
	}
}

export default connect()(Footer);
