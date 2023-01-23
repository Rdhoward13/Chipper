import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  if (!posts.length) {
    return <h3 className="text-center">No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link className="text-dark" to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    had this chirp on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You had this chirp on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-med p-2">
              <p>{post.postText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Add your comment
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
