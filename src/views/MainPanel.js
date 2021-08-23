import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Popup from '@enact/sandstone/Popup';
import MainScreen from './MainScreen/MainScreen';
import getCameraList from '../actions/getCameraList';
import FullScreenPreview from './FullScreenPreview/FullScreenPreview';
import css from './MainPanel.module.less';

const cx = classNames.bind(css);

class MainPanel extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount = () => {
		this.getCameraList();
	};
	getCameraList = () => {
		this.props.getCameraList();
	};
	render() {
		const {name, data} = this.props.screen;
		const popupMessage = this.props.popup;
		return (
			<div className={cx('mainpanel')}>
				{name === 'main' ? (
					<MainScreen />
				) : (
					<FullScreenPreview data={{...data}} />
				)}
				<Popup open={popupMessage !== ''}>{popupMessage}</Popup>
			</div>
		);
	}
}
const mapStateToProps = ({screen, popup}) => ({screen, popup});
const mapDispatchToProps = (dispatch) => ({
	getCameraList: () => dispatch(getCameraList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
