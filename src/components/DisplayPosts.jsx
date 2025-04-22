const DisplayPosts = ( {posts} ) => {

    const postsList = posts.map((post) => {
        return (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image_url && <img src={post.image_url} alt="Post" />}
                <p>Upvotes: {post.upvotes}</p>
                <p>Comments: {post.comments.join(", ")}</p>
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