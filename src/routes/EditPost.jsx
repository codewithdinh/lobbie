import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image_url: ''
    });

    // Fetch post data when component mounts
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();
                
            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
        };
        fetchPost();
    }, [id]);

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
            .update({ title: post.title, content: post.content, image_url: post.image_url })
            .eq('id', id)
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error updating post:", error);
                } else {
                    console.log("Post updated successfully:", data);
                    // Optionally reset the form or redirect
                    alert("Post updated successfully!");
                    navigate('/'); //Redirect to home page
                }
            });
    }

    return (
        <div className="page-container">
            <div className="form-card">
                <h1 className="form-title">Edit Post</h1>
                
                <form onSubmit={createPost} className="post-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enter a descriptive title"
                            value={post.title}
                            onChange={handleChange}
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
                        ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL</label>
                        <input
                            id="image_url"
                            type="text"
                            name="image_url"
                            placeholder="https://example.com/image.jpg"
                            value={post.image_url}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="secondary" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="primary">Update Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPost;