import Image from '@enact/sandstone/Image';
import PTZ_Disable from '../../../public/Icons/PTZ_Disable.svg';
import PTZ_Enable from '../../../public/Icons/PTZ_Enable.png';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import css from './PTZControl.module.less';
import classNames from 'classnames/bind';
import ptzChange from '../../actions/ptzChange';

const cx = classNames.bind(css);
const PTZControl = ({ camera_id, mainscreen }) => {
    const value = useSelector(state => state.ptzStatus)[camera_id];
    console.log(value + "   " + camera_id + "  ", useSelector(state => state.ptzStatus))
    const dispatch = useDispatch();
    const togglePTZ = useCallback(() => {
        let _value = !value;
        ptzChange(camera_id, _value).then(() => {
            dispatch({
                type: "PTZ_CHANGE",
                payload: {
                    [camera_id]: _value
                }
            });
        });
    }, [value, camera_id, dispatch])
    return mainscreen ? <Image
        src={value ? PTZ_Enable : PTZ_Disable}
        className={cx('main_screen_icon')}
        onClick={togglePTZ}
    /> : <img
        alt=''
        src={value ? PTZ_Enable : PTZ_Disable}
        className={cx('icon')}
        onClick={togglePTZ}
    />
}
export default PTZControl;