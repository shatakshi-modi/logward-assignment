import Comment from "./Common/Comment";
import Sort from "./Sort";
import { useSort } from "./context/SortContext";
import { sortObj } from "./utils";

const ReadComment = ({ comments, updateComments }) => {
  const { sort } = useSort();

  return (
    <div className="read-comment-container">
      <div className="sort-container">
        <Sort />
      </div>
      <div className="comments-container">
        {comments.sort(sortObj[sort]).map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            updateComments={updateComments}
          />
        ))}
      </div>
    </div>
  );
};

export default ReadComment;
