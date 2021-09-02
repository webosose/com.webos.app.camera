import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import BodyText from '@enact/sandstone/BodyText';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import setSelectedCamers from '../../actions/setSelectedCamers';

import css from './CameraList.module.less';

const cx = classNames.bind(css);

class CameraList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCamera: props.selectedCameras || []
		};
	}
	selectAllCamera = (event) => {
		this.setState({selectAll: event.selected});
		let selectedCameras = [];
		if (event.selected) {
			selectedCameras = [...this.props.cameralist.map((v) => v.id)];
		}
		this.props.setSelectedCamers(selectedCameras);
	};
	selectCamera = (event) => {
		const id = event.currentTarget.getAttribute('cameraid');
		const old_selectedCameras = this.props.selectedCameras;
		const index = old_selectedCameras.indexOf(id);
		let selectedCameras = [];
		if (index > -1) {
			selectedCameras = [...old_selectedCameras.filter((v) => v !== id)];
		} else {
			selectedCameras = [...old_selectedCameras, id];
		}
		this.props.setSelectedCamers(selectedCameras);
	};
	render() {
		const {cameralist, selectedCameras, screen} = this.props;
		const isAllSelected =
			selectedCameras.length === cameralist.length &&
			selectedCameras.length > 0;
		const disable = screen.data.disableCamList || false;
		return (
			<div className={cx('cont')}>
				<BodyText className={cx('camtitle')}>Device</BodyText>
				<div className={cx('checkbox_cont')}>
					<CheckboxItem
						className={cx('checkbox_item')}
						selected={isAllSelected}
						onToggle={this.selectAllCamera}
						disabled={disable}
					>
						Select All
					</CheckboxItem>
					{cameralist.map((v) => (
						<CheckboxItem
							className={cx('checkbox_item')}
							key={v.id}
							cameraid={v.id}
							selected={selectedCameras.indexOf(v.id) > -1}
							onClick={this.selectCamera}
							disabled={disable}
						>
							{v.id}
						</CheckboxItem>
					))}
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({cameralist, selectedCameras, screen}) => {
	console.log(screen);
	return {
		cameralist,
		selectedCameras,
		screen
	};
};
const mapDispatchToProps = (dispatch) => ({
	setSelectedCamers: (data) => dispatch(setSelectedCamers(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraList);
