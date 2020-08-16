import React from 'react';
import Navbar from 'components/Navbar';
import SiderDemo from 'features/Chat/components/SideBar';
import io from "socket.io-client";
import { getToken } from 'utils/auth';

function MainPage({ match }) {
    const chatRoomId = match?.params?.id;
    if (chatRoomId) {
        const socket = io(process.env.REACT_APP_URL, {
            query: {
                token: getToken(),
            }
        });
    }
    return (
        <div>
            <Navbar />
            <SiderDemo />
        </div>
    );
}

export default MainPage;