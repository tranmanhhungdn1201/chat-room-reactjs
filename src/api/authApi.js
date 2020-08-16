const { default: axiosClient } = require("./axiosClient");

const authApi = {
    login: (data) => {
        const url = 'users/login';
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
    register: (data) => {
        const url = 'users/register';
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
    }
}

export default authApi;