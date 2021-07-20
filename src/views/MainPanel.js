import React from 'react';
import CamerasGrid from './CamerasGrid/CamerasGrid';
import getCameraList from '../actions/getCameraList';
import {connect} from 'react-redux';
class MainPanel extends React.Component {
	constructor (props) {
		super(props);
	}
	componentDidMount = ()=>{
		this.props.getCameraList();
	}
	render () {
		return (
			<React.Fragment>
				<CamerasGrid/>
			</React.Fragment>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	getCameraList: () => dispatch(getCameraList())
});

export default connect(null, mapDispatchToProps)(MainPanel);;
