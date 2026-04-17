import { useState, useEffect } from "react";
import Post from "./Post";

  const newPost = () => {
    fetch("/api/posts", {
      method: "POST",
      body: new URLSearchParams({
        title: "New post",
        abstract: "Write an abstract here",
        content: "Write some content in here",
        userId: 1,
      }),
    })
      .then((response) => response.json())
      .then((response) => setPosts([...posts, response]));
  };

  const deletePost = (id) => {
    fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) =>
        setPosts(posts.filter((post) => post.id !== response.id)),
      );
  };

  const updatePost = (id) => {
    fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: new URLSearchParams({
        title: title,
        abstract: abstract,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((response) =>
        setPosts(
          posts.map((post) => (post.id === response.id ? response : post)),
        ),
      );
  };


const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((response) => setPosts(response));
  }, []);

  return (
    <>
      {posts && (
        <ul>
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </ul>
      )}
    </>
  );
};

export default Posts;
