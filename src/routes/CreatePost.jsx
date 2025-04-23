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
                    // Optionally reset the form or redirect
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
        <div>
            <h1>Create New Post</h1>
            {/* Add form or other components here */}
            <form onSubmit={createPost}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={post.title}
                    onChange={handleChange}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={post.content}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="image_url"
                    placeholder="Image URL"
                    value={post.image_url}
                    onChange={handleChange}
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;