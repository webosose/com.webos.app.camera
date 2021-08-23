import React from 'react';
import classNames from 'classnames/bind';
import Icon from '@enact/sandstone/Icon';
import CameraList from '../CameraList/CameraList';
import CamerasGrid from '../CamerasGrid/CamerasGrid';
import Footer from '../Footer/Footer';
import css from './MainScreen.module.less';

const cx = classNames.bind(css);

class MainScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClose = () => {
		if (typeof window !== 'undefined') {
			window.close();
		}
	};
	render() {
		return (
			<div>
				<Icon className={cx('closeIcon')} onClick={this.handleClose}>
					closex
				</Icon>
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
