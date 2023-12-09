import { useState } from "react";
import CommentsInput from "./Common/Input";

const Reply = ({ parentId, depth, updateComments }) => {
  const [isReplying, setIsReplying] = useState(true);

  return (
    <>
      {isReplying && (
        <div className="reply-input pr-3 pl-2 pb-3">
          <CommentsInput
            parentId={parentId}
            depth={depth}
            updateComments={updateComments}
            setIsReplying={setIsReplying}
            isReplying={isReplying}
          />
        </div>
      )}
    </>
  );
};

export default Reply;
