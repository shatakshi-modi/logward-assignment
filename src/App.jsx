import React from "react";
import { SortProvider } from "./Components/context/SortContext";
import CommentApp from "./Components/CommentApp";

const App = () => {
  return (
    <SortProvider>
      <CommentApp />
    </SortProvider>
  );
};

export default App;
