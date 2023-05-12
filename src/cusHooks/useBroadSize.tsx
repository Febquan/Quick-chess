import { useState, useEffect } from "react";
import { getBoardSize } from "../view/broad/utility/helper";

function useBoardSize() {
  const [boardSize, setBoardSize] = useState(getBoardSize());

  useEffect(() => {
    function handleResize() {
      setBoardSize(getBoardSize());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return boardSize;
}

export default useBoardSize;
