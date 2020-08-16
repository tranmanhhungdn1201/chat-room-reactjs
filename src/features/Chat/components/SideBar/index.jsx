import React, { useState, useEffect } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './SideBar.scss';
import chatApi from 'api/chatApi';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo() {
  const [ collapsed , setCollapsed ] = useState(false);
  const [ rooms , setRooms ] = useState([]);

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

  return (
    <Sider className="sideBar" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="sideBar__logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<TeamOutlined />}>
                Rooms
            </Menu.Item>
            {
                rooms.length ? rooms.map(room => (
                    <SubMenu key={room._id} icon={<UserOutlined />} title={room.name}>
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                ))
                :
                <SubMenu title="Nothing" />
            }
        </Menu>
    </Sider>
  );
}

export default SiderDemo;