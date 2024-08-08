import React from 'react';

const Dashboard: React.FC = () => {

  return (
    <div>
      <h2>My Dashboard</h2>
      <ul>
        {/* {posts.map(post => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Dashboard;
