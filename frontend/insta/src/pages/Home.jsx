import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPostsAndStories = async () => {
      try {
        const postsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/following`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(postsResponse.data);

        const storiesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stories/following`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStories(storiesResponse.data);
      } catch (error) {
        console.error('Error fetching posts and stories:', error);
      }
    };

    fetchPostsAndStories();
  }, [token]);

  return (
    <div>
      <h1>Home</h1>
      {/* <div className="stories">
        <h2>Stories</h2>
        <div className="stories-list">
          {stories.map(story => (
            <div key={story._id} className="story">
              <img src={story.imageUrl} alt={story.author.username} />
              <p>{story.author.username}</p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="posts flex justify-center  items-center m-[2rem]">
        <div className="posts-list flex flex-col rounded-lg">
          {posts.map(post => (
            <div key={post._id} className="post mt-8 object-contain " style={{width: '30rem'}} >
              <img src={post.imageUrl} alt={post.author.username} />
              <div className="post-info flex gap-2">
                <p >{post.author.username}</p>
                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;