import React from 'react';
import Heading from '@enact/sandstone/Heading';
import startCamera from '../actions/startCamera';
import {connect} from 'react-redux';
import css from './CameraCont.module.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(css);
class CameraCont extends React.Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
        this.option = {
            mediaTransportType : "CAMERA",
            option:{

            }
        }
        this.state = {
            loading:true,
            startPreview:false,

        }
    }
   render = () => {
       //debugger;
        const cameraOptions = escape(JSON.stringify(this.option));
        const type = 'service/webos-camera;cameraOption=' + cameraOptions
        console.log("cameraOptions:  ",this.option);
        console.log("cameraOptions escape:  ",cameraOptions);
        return(
            <div className={cx("videocont")}>
                <Heading
                    size="large"
                    spacing="small"
                    >
                    {this.props.cameraID}
                    </Heading>
                <video ref={this.videoRef}>
                    <source src="camera://com.webos.service.camera2/" type={type}/>
                </video>
            </div>)
    }
    componentDidUpdate = ()=>{
        if(this.state.startPreview && !this.videoLoaded){
            this.videoLoaded = true;
            console.log("Video load.....")
            this.videoRef.current.load()
        }
    }
    componentDidMount = ()=>{
        const {cameraID} = this.props;
        this.videoLoaded = false;
        startCamera(cameraID).then(res=>{
            console.log("CameraCont componentDidMount: ",res)
            this.option.option = {
                width : 840,
                height : 630,
                frameRate : 30,
                format : "JPEG",
                streamType : "JPEG",
                memType : "shmem",
                memSrc:res.memsrc
            }
            this.setState({
                startPreview:true,
                loading:false
            })
        })
    }
}

export default connect()(CameraCont);;

