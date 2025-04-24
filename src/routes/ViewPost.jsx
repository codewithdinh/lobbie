import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : post ? (
                <div className="post-details">
                    <h1>{post.title}</h1>
                    {post.image_url && <img src={post.image_url} alt={post.title} />}
                    <p>{post.content}</p>
                    <p>Upvotes: {post.upvotes}</p>
                    <h2>Comments:</h2>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
}

export default ViewPost;