import React from 'react';
import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image_url: '',
        upvotes: 0,
        comments: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    }

    const createPost = async (e) => {
        e.preventDefault();

        await supabase
            .from("posts")
            .insert([{ title: post.title, content: post.content, image_url: post.image_url, upvotes: post.upvotes, comments: post.comments }])
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error creating post:", error);
                } else {
                    console.log("Post created successfully:", data);
                    navigate('/');
                }
            });
    }

    return (
        <div className="page-container">
            <div className="form-card">
                <h1 className="form-title">Create New Post</h1>
                
                <form onSubmit={createPost} className="post-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enter a catchy title..."
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Share your thoughts..."
                            value={post.content}
                            onChange={handleChange}
                            rows="5"
                        ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL (Optional)</label>
                        <input
                            id="image_url"
                            type="text"
                            name="image_url"
                            placeholder="https://example.com/image.jpg"
                            value={post.image_url}
                            onChange={handleChange}
                        />
                        {post.image_url && (
                            <div className="image-preview">
                                <img src={post.image_url} alt="Preview" onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.style.display = 'none';
                                }} />
                            </div>
                        )}
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="outline" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="primary">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;