import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost($postText: String!, $postAuthor: String!) {
    addPost(postText: $postText, postAuthor: $postAuthor) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
