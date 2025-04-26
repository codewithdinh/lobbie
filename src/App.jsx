import { useState, useEffect } from 'react'
import './App.css'
import PostList from './components/PostList'
import { supabase } from './client'

function App() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image_url: '',
    upvotes: 0,
    comments: []
  });

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*');
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPost(data);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="main-content">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <PostList posts={post} />
      )}
    </div>
  )
}

export default App
