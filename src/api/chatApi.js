const { default: axiosClient } = require("./axiosClient");

const chatApi = {
    createRoom: (data) => {
        const url = 'chatroom';
        return axiosClient.post(url, data).then((res) => {
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
    checkRoomExist: (chatroomId, params) => {
        const url = `/chatroom/check/${chatroomId}`;
        return axiosClient.get(url, { params }).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return err;
        });
    },
}

export default chatApi;