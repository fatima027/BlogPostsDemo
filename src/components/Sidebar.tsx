import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useFetchUser from '../hooks/useFetchUser';
import Logo from '../assets/logo-trans.jpg'
import UserImage from '../assets/grey-user.png'

const { Sider } = Layout;


const StyledSider = styled(Sider)`
  background: white !important;
  color: black;
  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background: white;
    height: 64px;
    box-shadow: 0 2px 8px #f0f1f2;
    .logo-img {
      height: 40px;
    }
    .menu-icon {
      font-size: 24px;
      cursor: pointer;
    }
  }
  .user-info {
    padding: 20px;
    text-align: center;
    img {
      width: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    h2, p {
      color: black;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }
  }
  .ant-menu-light .ant-menu-item-selected {
    background-color: #e6f7ff;
  }
`;

const Sidebar: React.FC = () => {
  const user = useFetchUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledSider theme={"light"} width={collapsed ? 80 : 250} collapsible collapsed={collapsed} trigger={null}>
      <div className="logo">
        <img src={Logo} alt="Company Logo" className="logo-img" />
        {collapsed ? (
          <MenuOutlined className="menu-icon" onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <CloseOutlined className="menu-icon" onClick={() => setCollapsed(!collapsed)} />
        )}
      </div>
      {!collapsed && user && (
        <div className="user-info">
          <img src={UserImage} alt="User" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <Menu mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/dashboard">{collapsed ? 'D' : 'Dashboard'}</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/blogs">{collapsed ? 'B' : 'Blogs'}</Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
