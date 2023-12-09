import { useState, useEffect } from "react";
import { generateUniqueId } from "../utils";

const CommentsInput = ({
  parentId,
  initialName,
  initialComment,
  isEditing,
  setIsEditing,
  updateComments,
  setIsReplying,
  isReplying,
  commentId,
}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState(initialComment || "");

  useEffect(() => {
    setComment(initialComment || "");
  }, [initialComment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedComments = localStorage.getItem("comments");
    const commentList = storedComments ? JSON.parse(storedComments) : [];

    const data = {
      name: name,
      comment: comment,
      id: isEditing ? commentId : generateUniqueId(),
      parentId: parentId,
      date: Date.now(),
    };

    let payload;

    if (commentId !== undefined) {
      payload = commentList.map((item) => {
        if (item.id === commentId) {
          return {
            ...item,
            comment: comment,
          };
        } else if (item.replies) {
          return {
            ...item,
            replies: item.replies.map((reply) =>
              reply.id === commentId ? { ...reply, comment: comment } : reply
            ),
          };
        }
        return item;
      });
    } else if (parentId !== undefined) {
      payload = commentList.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: item.replies
              ? [...item.replies, { ...data, id: generateUniqueId() }]
              : [{ ...data, id: generateUniqueId() }],
          };
        }
        return item;
      });
    } else {
      payload = [...commentList, { ...data, id: generateUniqueId() }];
    }

    localStorage.setItem("comments", JSON.stringify(payload));
    updateComments(payload);

    setName("");
    setComment("");

    if (isEditing) {
      setIsEditing(false);
    }
    if (isReplying) {
      setIsReplying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-container ${isEditing && "pr-3"}`}>
        {!isEditing && (
          <>
            <div className="label">
              {parentId === undefined ? "Comment" : "Reply"}
            </div>

            <div className="full-width">
              <input
                className="full-width pb-2 pt-2 pl-1"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="full-width">
          <textarea
            className="full-width pb-3 pt-2 pl-1"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="pl-4 pr-4 pt-1 pb-1">
          {isEditing ? "Edit" : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CommentsInput;
