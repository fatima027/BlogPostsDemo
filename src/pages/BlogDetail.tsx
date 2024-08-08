import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Input, Layout, message, Modal, Spin } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #f0f2f5;
`;

const BlogTitle = styled.h1`
  margin-bottom: 16px;
`;

const BlogBody = styled.p`
  color: rgba(0, 0, 0, 0.65);
`;

const BlogImage = styled.img`
  width: 50%;
  height: auto;
  justify-content: center;
  margin-bottom: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;


interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Container><Spin /></Container>;
  }

  const handleEdit = () => {
    form.setFieldsValue({ title: post?.title, body: post?.body });
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/posts/${id}`);
      message.success('Post deleted successfully');
      navigate('/blogs');
    } catch (error) {
      console.error('Error deleting the post:', error);
      message.error('Failed to delete the post');
    }
  };

  const handleFormSubmit = async (values: { title: string; body: string }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_API_URL}/posts/${id}`, values);
      setPost(response.data);
      message.success('Post updated successfully');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating the post:', error);
      message.error('Failed to update the post');
    }
  };

  return (
    <StyledContent>
      {location.state?.image && <BlogImage src={location.state.image} alt="Blog" />}
      {post && (
        <>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogBody>{post.body}</BlogBody>
          <Button type="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button danger={true} onClick={handleDelete} style={{ marginLeft: '8px' }}>
            Delete
          </Button>
        </>
      )}
      <Modal
        title="Edit Post"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please input the body!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </StyledContent>
  );
};

export default BlogDetail;
