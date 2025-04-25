import { useState } from 'react';

const DisplayPosts = ({ posts }) => {
    const [sortBy, setSortBy] = useState('time'); 

    // Function to calculate the time since the post was created
    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return interval + " years ago";
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + " months ago";
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return interval + " days ago";
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return interval + " hours ago";
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + " minutes ago";
        return seconds + " seconds ago";
    }

    // onClick function to direct to the post page
    const handleClick = (postId) => {
        // Redirect to the post page using the postId
        window.location.href = `/posts/${postId}`;
    }

    // Sort posts based on the selected criteria
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortBy == 'time') {
            return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy == 'upvotes') {
            return b.upvotes - a.upvotes;
        }
    })

    const postsList = sortedPosts.map((post) => {
        return (
            <div key={post.id} onClick={() => handleClick(post.id)}>
                <p>Posted {timeSince(post.created_at)}</p>
                <h2><strong>{post.title}</strong></h2>
                <p>{post.upvotes} upvotes</p>
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
                    Sort by Time
                </button>
                <button 
                    className={sortBy === 'upvotes' ? 'active' : ''} 
                    onClick={() => setSortBy('upvotes')}
                >
                    Sort by Upvotes
                </button>
            </div>
            <div className="posts-container">
                {postsList}
            </div>
            {/* Add a message if there are no posts */}
            {posts.length === 0 && <p>No posts available.</p>}
        </div>
    );
}

export default DisplayPosts;