import chatApi from 'api/chatApi';
import Navbar from 'components/Navbar';
import ChatBox from 'features/Chat/components/ChatBox';
import SideBar from 'features/Chat/components/SideBar';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser } from 'utils/auth';
import { setupSocket } from 'utils/socket';
import './MainPage.scss';
import ListOnline from 'features/Chat/components/ListOnline';

let socket;
function MainPage({ match }) {
    const user = getCurrentUser();
    const chatroomId = match?.params?.id;
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState({});
    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatroomExist, setChatroomExist] = useState(true);

    useEffect( () => {
        if(!chatroomId) return;
        const setup = async () => {
            setMessages([]);
            setReload(false);
            const room = await chatApi.checkRoomExist(chatroomId);
            if (room.success) {
                socket = setupSocket();
                setReload(true);
                setChatroomExist(true);
                setRoom(room.chatroom);
            } else {
                setChatroomExist(false);
                toast.error('Chatroom is not exist.');
                return;
            }
            if (socket) {
                socket.emit("joinRoom", {
                    room: room.chatroom,
                    chatroomId,
                    user
                });
            }
        }

        setup();

        return () => {
            if (socket) {
                socket.emit("leaveRoom", {
                chatroomId,
                user
                });
            }
        };
    }, [chatroomExist, chatroomId]);

    const sendMessage = () => {
        console.log('sendMessage')
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

            socket.on("roomData", ({ users }) => {
                setUsers(users);
            });
        }
    }, [messages, reload]);

    return (
        <div className="main">
            <Navbar />
            <div className="main__containerChat">
                <SideBar />
                <div className="main__chatBox">
                    {
                        (chatroomId && chatroomExist) &&
                        <ChatBox
                            room={room}
                            message={message}
                            messages={messages}
                            sendMessage={sendMessage}
                            setMessage={setMessage}
                        />
                    }
                </div>
                <div className="main__usersOnline">
                   <ListOnline users={users} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;