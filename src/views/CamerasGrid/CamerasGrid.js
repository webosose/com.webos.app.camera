import React from 'react';
import {connect} from 'react-redux';
import CameraCont from '../../components/CameraCont';
import css from './CamerasGrid.module.less';
import classNames from 'classnames/bind';
import Heading from '@enact/sandstone/Heading';

const cx = classNames.bind(css);
class CamerasGrid extends React.Component{
    constructor(props){
        super(props);
    }
   render = () => {
       const {cameralist} = this.props;
       console.log("CamerasGrid render: "+JSON.stringify(cameralist))
        return(
            <div>
                <Heading
                    size="large"
                    spacing="small"
                    >
                    Two camera Demo
                    </Heading>
                    <div className={cx("grid")}>
                    {cameralist.map(value=>{
                        return (<div className={cx("gridItem1")}>
                            <CameraCont cameraID={value.id}/>
                        </div>)
                    })}
                </div>
            </div>)

    }
}


const mapStateToProps = ({cameralist}) => {
    console.log(cameralist);
	return {
        cameralist:cameralist
	};
};
export default connect(mapStateToProps)(CamerasGrid);

