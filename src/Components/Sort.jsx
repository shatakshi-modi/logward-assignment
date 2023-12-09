import React from "react";
import { useSort } from "./context/SortContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Sort = () => {
  const { sort, setSort } = useSort();
  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };
  return (
    <div className="sort">
      <button onClick={handleSort}>
        Sort By: Date and Time{" "}
        {sort == "asc" ? (
          <FontAwesomeIcon icon={faArrowDown} />
        ) : (
          <FontAwesomeIcon icon={faArrowUp} />
        )}
      </button>
    </div>
  );
};

export default Sort;
