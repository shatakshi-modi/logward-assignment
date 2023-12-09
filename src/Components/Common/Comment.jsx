import { useState, useEffect } from "react";
import CommentsInput from "./Input";
import Reply from "../Reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatDateString, sortObj } from "../utils";
import { useSort } from "../context/SortContext";

const Comment = ({ commentData, updateComments, isReply = false }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { sort } = useSort();

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const deleteComment = (commentId, parentId) => {
    const storedComments = localStorage.getItem("comments");
    let commentList = storedComments ? JSON.parse(storedComments) : [];

    if (commentId !== undefined && parentId == undefined) {
      commentList = commentList.filter((item) => item.id !== commentId);
    } else if (parentId !== undefined) {
      commentList = commentList.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            replies: item.replies
              ? item.replies.filter((reply) => reply.id !== commentId)
              : [],
          };
        }
        return item;
      });
    }

    localStorage.setItem("comments", JSON.stringify(commentList));
    return commentList;
  };

  const handleDelete = () => {
    const updatedComments = deleteComment(commentData.id, commentData.parentId);
    updateComments(updatedComments);
  };
  return (
    <>
      <div className={`comment-container full-width pt-2 pl-2 pb-2`}>
        <div className="title-container pr-3">
          <div className="name">{commentData.name}</div>
          <div className="date">{formatDateString(commentData.date)}</div>
        </div>
        {isEditing ? (
          <CommentsInput
            initialName={commentData.name}
            initialComment={commentData.comment}
            commentId={commentData.id}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateComments={updateComments}
          />
        ) : (
          <div className="delete-container">
            <div className="comment">{commentData.comment}</div>
            <div className="delete-btn">
              <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashCan} size="2xs" />
              </button>
            </div>
          </div>
        )}
        <div className="btn">
          {!isReply && (
            <div className="reply-btn" onClick={handleReply}>
              <button>Reply</button>
            </div>
          )}
          <div className="edit-btn" onClick={handleEdit}>
            <button>{isEditing ? "Cancel" : "Edit"}</button>
          </div>
        </div>
      </div>
      {isReplying && (
        <Reply
          parentId={commentData.id}
          depth={commentData.depth + 1}
          updateComments={updateComments}
        />
      )}
      {commentData.replies && (
        <div className="replies">
          {commentData.replies.sort(sortObj[sort]).map((reply) => (
            <div className="reply" key={reply.id}>
              <Comment
                commentData={reply}
                updateComments={updateComments}
                isReply={true}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
