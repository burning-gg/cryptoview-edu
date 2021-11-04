import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [currentMenu, setCurrentMenu] = useState('home');
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const onToggleCurrentMenu = (e) => {
    setCurrentMenu(e);
  };

  const onToggleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/' onClick={() => onToggleCurrentMenu('home')}>
            CryptoView
          </Link>
        </Typography.Title>
        <Button className='menu-control-container' onClick={onToggleActiveMenu}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          onClick={(e) => onToggleCurrentMenu(e.key)}
          selectedKeys={[currentMenu]}
          theme='dark'
        >
          <Menu.Item icon={<HomeOutlined />} key='home'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key='cryptocurrencies'>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key='exchanges'>
            <Link to='/exchanges'>Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key='news'>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
