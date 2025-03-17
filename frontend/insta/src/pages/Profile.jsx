import React, { useEffect, useState } from "react";
import CreatePost from './CreatePost'
import axios from "axios";


const Profile = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(postsResponse.data);

        
      } catch (error) {
        console.error('Error fetching posts and stories:', error);
      }
    };

    fetchUserPosts();
  }, [token]);
  
  return (
    <>
      <div>
      <div className="posts">
        <h2>Posts</h2>
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post">
              <img src={post.imageUrl} alt={post.author.username} />
              <div className="post-info">
                <p>{post.author.username}</p>
                <p>{post.caption}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}

export default Profile