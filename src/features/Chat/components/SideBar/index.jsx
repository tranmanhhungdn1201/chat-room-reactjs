import React, { useState, useEffect } from 'react';
import {
  CommentOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './SideBar.scss';
import chatApi from 'api/chatApi';
import { Link, useHistory } from 'react-router-dom';

const { Sider } = Layout;

function SiderDemo() {
  const [ collapsed , setCollapsed ] = useState(false);
  const [ rooms , setRooms ] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const rooms = async () => {
        const data = await chatApi.getAllRooms();
        if (data.success) {
            setRooms(data.data);
        }
    }
    rooms();
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleJoinRoom = (roomId) => {
    history.push(`/chatroom/${roomId}`);
  }

  return (
    <Sider className="sideBar" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="sideBar__logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
                rooms.length ? rooms.map(room => (
                    <Menu.Item key={room._id} icon={<CommentOutlined/>} onClick={() => handleJoinRoom(room._id)}>{room.name}</Menu.Item>
                ))
                :
                <Menu.Item>Nothing</Menu.Item>
            }
        </Menu>
    </Sider>
  );
}

export default SiderDemo;