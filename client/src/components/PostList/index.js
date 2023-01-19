import React from "react";
// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from "react-router-dom";

const PostList = ({ post, title }) => {
  console.log(post);
  if (!post.length) {
    return <h3>No posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {post &&
        post.map((posts) => (
          <div key={posts._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {posts.postAuthor} <br />
              <span style={{ fontSize: "1rem" }}>
                had this post on {posts.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{posts.postText}</p>
            </div>
            {/* Create a link to this post's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${posts._id}`}
            >
              Join the discussion on this post.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
