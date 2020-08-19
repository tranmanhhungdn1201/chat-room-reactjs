import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbar';
import SideBar from 'features/Chat/components/SideBar';
import { setupSocket } from 'utils/socket';
import './MainPage.scss';
import ChatBox from 'features/Chat/components/ChatBox';
import { getToken } from 'utils/auth';
import io from "socket.io-client";

let socket;
function MainPage({ match }) {
    const chatroomId = match?.params?.id;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const setup = () => {
            socket = setupSocket();
            if (socket && chatroomId) {
                socket.emit("joinRoom", {
                  chatroomId,
                });
            }
        }
        setup();
        return () => {
            if (socket) {
                socket.emit("leaveRoom", {
                chatroomId,
                });
            }
        };
    }, [chatroomId]);

    const sendMessage = () => {
        if (socket && chatroomId) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message
            });
            setMessage('');
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (message) => {
                setMessages([...messages, message]);
            });
        }
    }, [messages]);

    return (
        <div className="main">
            <Navbar />
            <div className="main__containerChat">
                <SideBar />
                <div className="main__chatBox">
                    {
                        (chatroomId) &&
                        <ChatBox
                            message={message}
                            messages={messages}
                            sendMessage={sendMessage}
                            setMessage={setMessage}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;