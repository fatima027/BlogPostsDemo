import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Image, Pagination, Button, Spin } from "antd";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LogoBlog from "../assets/blog-logo.png";
import axios from "axios";
import BlogImage1 from "../assets/blog1.jpg";
import BlogImage2 from "../assets/blog2.jpg";
import BlogImage3 from "../assets/blog3.jpg";
import moment from "moment";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #f0f2f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background: #f0f2f5;
  paddingVertical: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-family: "DM Sans", sans-serif;
`;

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const Tabs = styled(Menu)`
  padding-bottom: 24px;
  border-bottom: none;
  border-radius: 14px 14px 0px 0px;
`;


const BlogCard = styled(Card)`
  margin-bottom: 16px;
  border: none;
  border-radius: 0;
  padding: 0px;
`;

const BlogContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const BlogInfo = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const BlogRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;


const BlogTitle = styled.h2`
  margin: 0;
`;

const BlogExcerpt = styled.p`
  color: rgba(0, 0, 0, 0.65);
`;

const Date = styled.span`
  color: rgba(0, 0, 0, 0.45);
  margin-right: 15px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const SubTitle = styled.span`
  color: rgba(0, 0, 0, 0.45);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    BlogImage1,
    BlogImage2,
    BlogImage3,
    BlogImage3,
    BlogImage2,
    BlogImage1,
    BlogImage3,
    BlogImage2,
    BlogImage1,
    BlogImage1,
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = Math.floor(Math.random() * 10) + 1;
      await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/posts`
      ).then((response)=>{
        console.log("response.dataresponse.data", response.data);
        setPosts(response.data);
        setIsLoading(false);  
      }).catch(err => {
        console.log('err', err);
        setIsLoading(false);
      });
    };

    fetchPosts();
  }, []);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * 5;
  const indexOfFirstPost = indexOfLastPost - 5;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <StyledContent>
      <Header>
        <HeaderLeft>
          <Icon src={LogoBlog} alt="Icon" />
          <div>
            <Title>All Blog Posts</Title>
            <SubTitle>Qatar Development Bank</SubTitle>
          </div>
        </HeaderLeft>
        <FilterButton>
          Filter/Sort by <DownOutlined />
        </FilterButton>
      </Header>
      <Tabs mode="horizontal" defaultSelectedKeys={["all"]}>
        <Menu.Item key="all">All Posts</Menu.Item>
        <Menu.Item key="latest">Latest Posts</Menu.Item>
        <Menu.Item key="archived">Archived</Menu.Item>
      </Tabs>

      {!isLoading ? (
        <>
          {currentPosts.map((blog, index) => (
            <BlogCard key={index} bodyStyle={{padding: "0px"}}>
              <BlogContent>
                <Image src={images[index]} width={220} height={150} />
                <BlogInfo>
                  <BlogRow>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <Date>{moment().format("D MMMM, YYYY")}</Date>
                  </BlogRow>
                  <BlogExcerpt>{blog.body}</BlogExcerpt>
                  <Link
                    to={`/blog/${blog.id}`}
                    state={{ image: images[index] }}
                  >
                    Read more
                  </Link>
                </BlogInfo>
              </BlogContent>
            </BlogCard>
          ))}
          <PaginationWrapper>
            <Pagination
              current={currentPage}
              pageSize={5}
              total={posts?.length}
              onChange={handlePaginationChange}
            />
          </PaginationWrapper>
        </>
      ) : (
        <Container>
          <Spin />
        </Container>
      )}
    </StyledContent>
  );
};

export default Blogs;
