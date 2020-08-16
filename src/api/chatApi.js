const { default: axiosClient } = require("./axiosClient");

const chatApi = {
    createRoom: (data) => {
        const url = 'chatroom';
        return axiosClient.post(url, data).then((res) => {
            if(res.success) {
                const token = res.token
				// sets token as an included header for all subsequent api requests
				axiosClient.setToken(token);
			}
            return res;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    },
    getAllRooms: (params) => {
        const url = 'chatroom';
        return axiosClient.get(url, { params }).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    },
}

export default chatApi;