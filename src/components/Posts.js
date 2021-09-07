import React, { useState, useEffect } from "react";

const url = "https://jsonplaceholder.typicode.com/posts";
const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("Use effect");
    fetch(url)
      .then((resp) => {
        console.log(resp.status);
        if (199 < resp.status && resp.status < 300) {
          return resp.json();
        }
        setIsError(true);
        setIsLoading(false);
        console.log("error found");
        throw new Error(resp.statusText);
      })
      .then((data) => {
        //console.log("here" + data);
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error ....</>;
  }

  return (
    <>
      <h1>Posts</h1>
      {posts.map((p) => {
        return (
          <div key={p.id} className="card">
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        );
      })}
    </>
  );
};
export default Posts;
