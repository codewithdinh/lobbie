import { useState } from 'react';
import './PostList.css';

const PostList = ({ posts }) => {
    const [sortBy, setSortBy] = useState('time'); 
    const [searchQuery, setSearchQuery] = useState('');

    // Function to calculate the time since the post was created
    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return interval + (interval === 1 ? " year ago" : " years ago");
        
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return interval + (interval === 1 ? " month ago" : " months ago");
    
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + (interval === 1 ? " day ago" : " days ago");
    
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");
    
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval + (interval === 1 ? " minute ago" : " minutes ago");
    
        return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
    

    // onClick function to direct to the post page
    const handleClick = (postId) => {
        // Redirect to the post page using the postId
        window.location.href = `/posts/${postId}`;
    }

    // Sort posts based on the selected criteria
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy === 'time') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === 'upvotes') {
            return b.upvotes - a.upvotes;
        }
        return 0;
    });

    // Filter posts based on search query
    const filteredPosts = sortedPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const postsList = filteredPosts.map((post) => {
        return (
            <div key={post.id} className="post-card" onClick={() => handleClick(post.id)}>
                <div className="post-time">Posted {timeSince(post.created_at)}</div>
                <h2 className="post-title">{post.title}</h2>
                {post.content && (
                    <p className="post-content">
                        {post.content.length > 150 
                            ? post.content.substring(0, 150) + '...' 
                            : post.content
                        }
                    </p>
                )}
                <div className="post-stats">
                    <div className="upvote-count">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L3 15H21L12 4Z" fill="currentColor" />
                        </svg>
                        {post.upvotes} upvotes
                    </div>
                </div>
            </div>
        )
    });
    
    return (
        <div>
            <div className="sort-controls">
                <button 
                    className={sortBy === 'time' ? 'active' : ''} 
                    onClick={() => setSortBy('time')}
                >
                    Latest Posts
                </button>
                <button 
                    className={sortBy === 'upvotes' ? 'active' : ''} 
                    onClick={() => setSortBy('upvotes')}
                >
                    Most Upvoted
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search posts by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="posts-container">
                {postsList}
            </div>
            {/* Update empty state message to consider search */}
            {filteredPosts.length === 0 && (
                <div className="empty-state">
                    <p>{searchQuery ? 'No posts found matching your search.' : 'No posts available. Be the first to create a post!'}</p>
                </div>
            )}
        </div>
    );
}

export default PostList;