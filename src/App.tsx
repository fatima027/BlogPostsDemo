import React from 'react';
import 'antd/dist/reset.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
        <Layout >
        <AppHeader />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ margin: '24px 0', overflow: 'initial' }}>
              <Routes>
              <Route path="/" element={<Navigate to="/blogs" />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
