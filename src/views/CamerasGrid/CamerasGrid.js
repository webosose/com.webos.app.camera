import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import CameraPreview from '../../components/CameraPreview';
import css from './CamerasGrid.module.less';

const cx = classNames.bind(css);

class CamerasGrid extends React.Component {
	constructor(props) {
		super(props);
	}
	render = () => {
		const {cameraStatus} = this.props;
		// console.log('CamerasGrid render: ' + JSON.stringify(cameraStatus));
		return (
			<div>
				<div className={cx('grid')}>
					{cameraStatus.map((value) => {
						return (
							<div className={cx('gridItem1')} key={value.id}>
								<CameraPreview data={{...value}} />
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}

const mapStateToProps = ({cameraStatus}) => {
	return {
		cameraStatus: cameraStatus
	};
};
export default connect(mapStateToProps)(CamerasGrid);
