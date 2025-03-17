import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts/create`, {
        imageUrl,
        caption
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        setImageUrl('');
        setCaption('');
      }
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="button submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Post</button>

        {/* <button type="submit">Create Post</button> */}
      </form>
    </div>
  );
};

export default CreatePost;