import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import './Navbar.scss';
import RightMenu from './RightMenu';
import { Link } from 'react-router-dom';

function Navbar() {
  const [ visible, setVisible ]= useState(false);
  const toggle = () => {
    setVisible(!visible);
  };

  return (
      <nav className="menu">
        <div className="menu__logo">
          <Link to="/">Chatroom</Link>
        </div>
        <div className="menu__nav">
          <div className="rightMenu">
              <RightMenu />
          </div>
          <Button className="menu__barsMenu" onClick={toggle}>
            <span className="menu__barsBtn"></span>
          </Button>
          <Drawer
            title="Chatroom"
            placement="right"
            closable={false}
            onClose={toggle}
            visible={visible}
          >
            <RightMenu isHorizontal={visible}/>
          </Drawer>
        </div>
      </nav>
  );
}
export default Navbar;