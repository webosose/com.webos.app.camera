import lunaAction from './lunaActions';

export const getPTZState = (camera_id) => (dispatch) => {
    console.log("getPTZState :: ", camera_id);
    return new Promise((resolve) => {
        lunaAction(
            {
                service: 'luna://com.webos.service.camera2',
                method: 'getSolutions',
                parameters: {
                    id: camera_id
                },
                resolve: resolve
            },
            (res) => {
                console.log("getPTZState res :: ", res);
                if (res.returnValue) {
                    const FaceDetection = res.solutions.find((value) => value.name === "FaceDetection")
                    if (FaceDetection) {
                        dispatch({
                            type: "PTZ_CHANGE",
                            payload: {
                                [camera_id]: FaceDetection.params.enable
                            }
                        });
                    }else {
                        dispatch({
                            type: "PTZ_SUPPORT",
                            payload: {
                                [camera_id]: false
                            }
                        });
                    }
                }
            }
        );
    });
}
const ptzChange = (camera_id, value) => {
    console.log('ptzChange: ',camera_id+"   "+value);
    return new Promise((resolve) => {
        lunaAction(
            {
                service: 'luna://com.webos.service.camera2',
                method: 'setSolutions',
                parameters: {
                    id: camera_id,
                    solutions: [{
                        name: "FaceDetection",
                        params: { enable: value }
                    }]
                },
                resolve: resolve
            },
            (res) => {
                console.log("ptzChange", res)
                resolve();
            }
        );
    });
};

export default ptzChange;
