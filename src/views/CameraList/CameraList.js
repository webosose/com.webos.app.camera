import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import BodyText from '@enact/sandstone/BodyText';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import css from './CameraList.module.less';

const cx = classNames.bind(css);

class CameraList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCamera: []
		};
	}
	selectAllCamera = (event) => {
		this.setState({selectAll: event.selected});
		if (event.selected) {
			this.setState({
				selectedCamera: [...this.props.cameralist.map((v) => v.id)]
			});
		} else {
			this.setState({selectedCamera: []});
		}
	};
	selectCamera = (event) => {
		const id = event.currentTarget.getAttribute('cameraid');
		const index = this.state.selectedCamera.indexOf(id);
		if (index > -1) {
			this.setState((prevState) => ({
				selectedCamera: [...prevState.selectedCamera.filter((v) => v !== id)]
			}));
		} else {
			this.setState((prevState) => ({
				selectedCamera: [...prevState.selectedCamera, id]
			}));
		}
	};
	render() {
		const {cameralist} = this.props;
		const {selectedCamera} = this.state;
		return (
			<div className={cx('cont')}>
				<BodyText className={cx('camtitle')}>Device</BodyText>
				<div className={cx('checkbox_cont')}>
					<CheckboxItem
						selected={selectedCamera.length === cameralist.length}
						onToggle={this.selectAllCamera}
					>
						Select All
					</CheckboxItem>
					{cameralist.map((v) => (
						<CheckboxItem
							key={v.id}
							cameraid={v.id}
							selected={selectedCamera.indexOf(v.id) > -1}
							onClick={this.selectCamera}
						>
							{v.id}
						</CheckboxItem>
					))}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		cameralist: state.cameralist
	};
};

export default connect(mapStateToProps)(CameraList);
