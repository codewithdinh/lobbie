import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

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

    const handleUpvote = async () => {
        if (post) {
            const updatedPost = { ...post, upvotes: post.upvotes + 1 };
            const { error } = await supabase
                .from('posts')
                .update({ upvotes: updatedPost.upvotes })
                .eq('id', post.id);
            if (error) {
                console.error('Error updating post:', error);
            } else {
                setPost(updatedPost);
            }
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        if (post) {
            // Create a new array with existing comments plus the new one
            const updatedComments = [...post.comments, newComment];

            // Update post in Supabase
            const { error } = await supabase
                .from('posts')
                .update({ comments: updatedComments })
                .eq('id', post.id);

            if (error) {
                console.error('Error adding comment:', error);
            } else {
                // Update local state to show the new comment
                setPost({ ...post, comments: updatedComments });
                // Clear the comment input
                setNewComment('');
            }
        }
    }

    const handleDeletePost = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', post.id);
            if (error) {
                console.error('Error deleting post:', error);
            } else {
                navigate('/'); // Redirect to posts page after deletion
            }
        }
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : post ? (
                <div className="post-details">
                    <div>
                        <h1>{post.title}</h1>
                        {post.image_url && <img src={post.image_url} alt={post.title} />}
                        <p>{post.content}</p>
                        <p>Upvotes: {post.upvotes}</p>
                    </div>

                    <div>
                        <h2>Comments:</h2>
                        <ul>
                            {post.comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="comment-form">
                        <h3>Add a Comment</h3>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                rows="3"
                                required
                            ></textarea>
                            <button type="submit">Post Comment</button>
                        </form>
                    </div>

                    <div>
                        <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit Post</button>
                        <button onClick={handleDeletePost}>Delete Post</button>
                        <button onClick={handleUpvote}>Upvote</button>
                    </div>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    )
}

export default PostDetail;