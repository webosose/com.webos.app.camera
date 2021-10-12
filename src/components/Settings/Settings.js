import React from 'react';
import classNames from 'classnames/bind';
import Input from '@enact/sandstone/Input';
import BodyText from '@enact/sandstone/BodyText';
import Dropdown from '@enact/sandstone/Dropdown';
import Button from '@enact/sandstone/Button';

import {setSelectedResolution, setSelectedName} from '../../actions/settings';
import closeIcon from '../../../public/Icons/Close.svg';
import css from './Settings.module.less';
import {connect} from 'react-redux';

const cx = classNames.bind(css);

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: this.props.name,
			selectedIndex: this.props.selectedIndex,
			saveEnable: false
		};
	}
	closeSetting = () => {
		this.props.closeSettings();
	};
	saveSettings = () => {
		const resolutionsChange =
			this.props.selectedIndex !== this.state.selectedIndex;
		const nameChange = this.props.name !== this.state.inputText;
		const {id} = this.props;
		if (resolutionsChange) {
			if (this.state.selectedIndex > -1) {
				const [width, height, fps] = this.props.resolutions[
					this.state.selectedIndex
				]
					.split(',')
					.map((v) => parseInt(v));
				this.props.setSelectedResolution({
					id,
					width,
					height,
					fps
				});
				this.props.showLoading();
			}
		}
		if (nameChange) {
			const {inputText: name} = this.state;
			this.props.setSelectedName({
				id,
				name
			});
			if (!resolutionsChange) {
				this.props.closeSettings();
			}
		}
	};

	resolutionSelectionHandler = (value) => {
		this.setState({
			selectedIndex: value.selected,
			saveEnable: true
		});
	};
	handleInputComplete = ({value}) => {
		this.setState({
			inputText: value,
			saveEnable: true
		});
	};
	render() {
		const {resolutions} = this.props;
		const {selectedIndex, saveEnable} = this.state;
		return (
			<div className={cx('cont')}>
				<div className={cx('header')}>
					<BodyText>Settings</BodyText>
					<img
						src={closeIcon}
						onClick={this.closeSetting}
						alt=''
						className={cx('icon')}
					/>
				</div>
				<div className={cx('row')}>
					<BodyText className={cx('label')}>Name :</BodyText>
					<Input
						className={cx('input')}
						onComplete={this.handleInputComplete}
						placeholder='Enter Camera name'
						title='Camera Name'
						value={this.state.inputText}
						maxLength={18}
					/>
				</div>
				<div className={cx('row')}>
					<BodyText className={cx('label')}>Video Formate: </BodyText>
					<Dropdown
						defaultSelected={selectedIndex}
						onSelect={this.resolutionSelectionHandler}
						className={cx('input')}
					>
						{resolutions}
					</Dropdown>
				</div>
				<div className={cx('footer')}>
					<Button
						className={cx(['button', 'ok_button'])}
						disabled={!saveEnable}
						onClick={this.saveSettings}
					>
						Ok
					</Button>
					<Button className={cx('button')} onClick={this.closeSetting}>
						Cancel
					</Button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({settings, cameraStatus}, ownProps) => {
	const {resolutions, selRes, name} = settings.find(
		(v) => v.id === ownProps.id
	);
	const selectedIndex = resolutions.indexOf(Object.values(selRes).join(','));
	const {handle, media_id} = cameraStatus.find((v) => v.id === ownProps.id);
	return {
		resolutions,
		selectedIndex,
		handle,
		media_id,
		name
	};
};
const mapDispatchToProps = (dispatch) => ({
	setSelectedResolution: (resolutions) =>
		dispatch(setSelectedResolution(resolutions)),
	setSelectedName: (name) => dispatch(setSelectedName(name))
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
