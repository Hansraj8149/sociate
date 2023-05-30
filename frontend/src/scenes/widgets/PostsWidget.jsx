import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts) || [
    {
      _id: "6475cd71b39f2a144ef93f6a",
      userId: "6475cd71b39f2a144ef93f64",
      firstName: "Harvey",
      lastName: "Dunn",
      location: "Los Angeles, CA",
      description:
        "This is the last really long random description. This one is longer th…",
      picturePath: "post4.jpeg",
      userPicturePath: "p7.jpeg",

      likes: {},

      comments: [
        "I lied again, one more random comment",

        "Why am I doing this?",

        "I'm bored",
        "I'm still bored",
        "All I want to do is play video games",
        "I'm going to play video games",
      ],
    },
  {
    
_id:
"6475cd71b39f2a144ef93f6b",
userId:
"6475cd71b39f2a144ef93f65",
firstName:
"Carly",
lastName:
"Vowel",
location:
"Chicago, IL",
description:
"Just a short description. I'm tired of typing. I'm going to play video…",
picturePath:
"post5.jpeg",
userPicturePath:
"p8.jpeg",

likes: {},

comments:
[
"I lied again, one more random comment"
,
"Why am I doing this?"
,
"Man I'm bored"
,
"What should I do?"
,
"I'm going to play video games"],
  },
  {
    _id: "6475cd71b39f2a144ef93f6a",
    userId: "6475cd71b39f2a144ef93f64",
    firstName: "Harvey",
    lastName: "Dunn",
    location: "Los Angeles, CA",
    description:
      "This is the last really long random description. This one is longer th…",
    picturePath: "post4.jpeg",
    userPicturePath: "p7.jpeg",

    likes: {},

    comments: [
      "I lied again, one more random comment",

      "Why am I doing this?",

      "I'm bored",
      "I'm still bored",
      "All I want to do is play video games",
      "I'm going to play video games",
    ],
  },

  ]; // Initialize as empty array if null or undefined
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      dispatch(setPosts(data));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      dispatch(setPosts(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!Array.isArray(posts)) {
  //   return null; // Render null or a loading indicator while posts are being fetched
  // }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
