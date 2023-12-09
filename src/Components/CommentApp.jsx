import { useState, useEffect } from "react";
import Input from "./Common/Input";
import ReadComment from "./ReadComment";

const CommentApp = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  return (
    <div className="app-container pt-4 pb-2 ">
      <div className="comment-write pl-3 pr-4 pb-2 pt-2">
        <Input updateComments={updateComments} />
      </div>
      <div className="comment-read pb-2 pt-2">
        <ReadComment comments={comments} updateComments={updateComments} />
      </div>
    </div>
  );
};

export default CommentApp;
