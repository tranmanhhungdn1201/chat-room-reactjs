import { Menu } from 'antd';
import { logOut } from 'utils/auth';
import ModalCreateRoom from 'features/Chat/components/ModalCreateRoom';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RightMenu.scss';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu({isHorizontal}) {
  const [ showModal, setShowModal ] = useState(false);
  const history = useHistory();
  const toggle = () => {
    setShowModal(!showModal);
  };

  const onLogout = () => {
    logOut();
    history.push('/login');
  }

  return (
    <>
      <Menu mode={`${!isHorizontal ? 'horizontal' : 'vertical'}`} className="navMenu">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <a href="#" onClick={toggle}>Create room</a>
        </Menu.Item>
        <SubMenu title={<span>anhboy2002,</span>}>
          <MenuItemGroup>
            <Menu.Item key="setting:1">Profile</Menu.Item>
            <Menu.Item key="setting:2" onClick={onLogout}>Logout</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
      <ModalCreateRoom visible={showModal} toggle={toggle}/>
    </>
  );
}
export default RightMenu;