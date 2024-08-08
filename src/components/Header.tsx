import React from 'react';
import { Layout, Input } from 'antd';
import { SearchOutlined, BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px #f0f1f2;

  .search-bar {
    width: 300px;
  }

  .icons {
    display: flex;
    gap: 20px;
    font-size: 20px;
    color: black;
    cursor: pointer;
  }
`;

const AppHeader: React.FC = () => {
  return (
    <StyledHeader>
      <Input
        className="search-bar"
        prefix={<SearchOutlined />}
        placeholder="Search..."
      />
      <div className="icons">
        <BellOutlined />
        <SettingOutlined />
        <UserOutlined />
      </div>
    </StyledHeader>
  );
};

export default AppHeader;
