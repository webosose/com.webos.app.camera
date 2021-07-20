import lunaAction from './lunaActions';
const open = (id)=> {
    return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'open',
				parameters: {id},
				resolve: resolve
			},
			(res) => {
                console.log(JSON.stringify(res));
				resolve(res.handle);
			}
		);
	});
}
const setFormat = (handle)=> {
	console.log("setFormat"+handle);
    return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'setFormat',
				parameters: {
                    handle,
                    params: {
                        width: 640,
                        height: 480,
                        format: "JPEG",
						fps:30
                }},
				resolve: resolve
			},
			(res) => {
                console.log(JSON.stringify(res));
				resolve(handle);
			}
		);
	});
}
const startPreview = (handle)=> {
    return new Promise((resolve) => {
		lunaAction(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'startPreview',
				parameters: {
                    handle,
                    params: {
                        "type":"sharedmemory",
                        "source":"0"
                }},
				resolve: resolve
			},
			(res) => {
                console.log(JSON.stringify(res));

                resolve({
					handle,
					memsrc:res.key+""
				})
			}
		);
	});
}
const startCamera = (id)  => {
	console.log("startCamera: "+id);
	return new Promise((resolve) => {
		open(id).then((handle)=>{
			return setFormat(handle);
		}).then((handle)=>{
			return startPreview(handle);
		}).then(res=>resolve(res));
	});
};

export default startCamera;
