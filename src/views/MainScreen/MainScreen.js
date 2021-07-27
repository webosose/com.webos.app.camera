import React from 'react';
import classNames from 'classnames/bind';
import CameraList from '../CameraList/CameraList';
import CamerasGrid from '../CamerasGrid/CamerasGrid';
import Footer from '../Footer/Footer';
import css from './MainScreen.module.less';

const cx = classNames.bind(css);

class MainScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div className={cx('row')}>
					<div className={cx('list')}>
						<CameraList />
					</div>
					<div className={cx('grid')}>
						<CamerasGrid />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default MainScreen;
