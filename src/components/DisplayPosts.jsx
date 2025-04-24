const DisplayPosts = ( {posts} ) => {

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

    const postsList = posts.map((post) => {
        return (
            <div key={post.id} onClick={() => handleClick(post.id)}>
            <h2>{post.title}</h2>
            <p>Posted {timeSince(post.created_at)}</p>
            <p>Upvotes: {post.upvotes}</p>
            </div>
        )
    })
    
    return (
        <div>
            {postsList} {/* Render the list of posts */}
        </div>
    )
}

export default DisplayPosts