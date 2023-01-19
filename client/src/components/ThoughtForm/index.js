import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_ME, QUERY_POSTS } from "../../utils/queries";

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    postText: "",
    postAuthor: "",
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POST });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: {posts, [addPost, posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.post, addPost] } },
      });
    },
  });

  // const [addPost, { error }] = useMutation(ADD_POST, {
  //   update(cache, { data: { addPOST } }) {
  //     try {
  //       const { posts } = cache.readQuery({ query: QUERY_ME });

  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: { ...me, posts: [...me.post, addPost] } },
  //     })

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: { ...formState },
      });

      setFormState({
        postText: "",
        postAuthor: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== "postText") {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3>You got something to chirp about?</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? "text-danger" : ""
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="postText"
            placeholder="Here's a new thought..."
            value={formState.postText}
            className="form-input w-100"
            style={{ lineHeight: "1.5" }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="postAuthor"
            placeholder="Don't forget to put your name so everyone knows..."
            value={formState.postAuthor}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Post
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default PostForm;
