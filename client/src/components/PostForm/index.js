import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_ME, QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";

const PostForm = () => {
  const [postText, setPostText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

  return (

    <div color= "#223b45">
      <h3>Get to Chirping!</h3>
 {/* e3653a84a51087eefac50ece4f8d100f090833fd */}
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="postText"
                placeholder="The latest Chirp..."

                
/* >>>>>>> e3653a84a51087eefac50ece4f8d100f090833fd */
                value={postText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>

          You need to be logged in to Chirp, bud. Please{" "}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>

          You need to be logged in to share your chirps. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
{/*  e3653a84a51087eefac50ece4f8d100f090833fd */}
        </p>
      )}
    </div>
  );
};

export default PostForm
