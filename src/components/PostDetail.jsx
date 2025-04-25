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
            const updatedComments = [...post.comments, newComment];
            const { error } = await supabase
                .from('posts')
                .update({ comments: updatedComments })
                .eq('id', post.id);

            if (error) {
                console.error('Error adding comment:', error);
            } else {
                setPost({ ...post, comments: updatedComments });
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
                navigate('/');
            }
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="error-container">
                <h2>Post not found</h2>
                <p>The post you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/')} className="primary">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail-card">
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <span className="post-time">Posted {new Date(post.created_at).toLocaleDateString()}</span>
                        <div className="post-actions">
                            <button 
                                onClick={() => navigate(`/posts/edit/${post.id}`)} 
                                className="icon-button"
                                title="Edit Post"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 00-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 000-2.621 1.853 1.853 0 00-2.621 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 15v3a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button 
                                onClick={handleDeletePost} 
                                className="icon-button danger"
                                title="Delete Post"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {post.image_url && (
                    <div className="post-image">
                        <img src={post.image_url} alt={post.title} />
                    </div>
                )}

                <div className="post-content">
                    <p>{post.content}</p>
                </div>

                <div className="post-interactions">
                    <button onClick={handleUpvote} className="upvote-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L3 15H21L12 4Z" fill="currentColor" />
                        </svg>
                        <span>{post.upvotes} Upvotes</span>
                    </button>
                </div>

                <div className="comments-section">
                    <h2>Comments ({post.comments.length})</h2>
                    {post.comments.length > 0 ? (
                        <ul className="comments-list">
                            {post.comments.map((comment, index) => (
                                <li key={index} className="comment-item">
                                    <div className="comment-content">
                                        <p>{comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    )}

                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                            rows="3"
                            required
                        ></textarea>
                        <button type="submit" className="primary">Post Comment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;