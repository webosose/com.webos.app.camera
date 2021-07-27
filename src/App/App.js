import React from 'react';
import classNames from 'classnames/bind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import MainPanel from '../views/MainPanel';
import {_get} from '../utils/common';
import css from './App.module.less';

const cx = classNames.bind(css);

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	onLaunch = () => {
		let launchParams = JSON.parse(_get(window, 'PalmSystem.launchParams'));
		console.log('launchParams', launchParams);
	};

	componentDidMount = () => {
		document.addEventListener('webOSLaunch', this.onLaunch);
		document.addEventListener('webOSRelaunch', this.onLaunch);
		document.addEventListener('webOSLocaleChange', () => {
			window.location.reload();
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className={cx('app')}>
					<MainPanel />
				</div>
			</React.Fragment>
		);
	}
}
export default ThemeDecorator(App);
