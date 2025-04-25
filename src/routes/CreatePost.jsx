import React from 'react';
import { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {
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
                    setPost({
                        title: '',
                        content: '',
                        image_url: '',
                        upvotes: 0,
                        comments: []
                    });
                    alert("Post created successfully!");
                }
            });
    }

    return (
        <div className="card">
            <h1>Create New Post</h1>
            <form onSubmit={createPost}>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter a catchy title..."
                    value={post.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Share your thoughts..."
                    value={post.content}
                    onChange={handleChange}
                    rows="5"
                ></textarea>
                <input
                    type="text"
                    name="image_url"
                    placeholder="Add an image URL (optional)"
                    value={post.image_url}
                    onChange={handleChange}
                />
                <button type="submit">Post to Community</button>
            </form>
        </div>
    );
}

export default CreatePost;