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
        <div>

            <h1>Edit Post</h1>
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
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}

export default EditPost;