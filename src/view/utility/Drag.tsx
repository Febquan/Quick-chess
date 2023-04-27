import React, { useState, useEffect, useRef, useCallback } from "react";
import Pawn from "../pieces/Pawn";
interface DraggableProps {
  children: React.ReactNode;
  addToCell: (id: number, piece: JSX.Element) => void;
  removefromCell: (id: number) => void;
  currentId: number;
}

const convertOffSetToCellId = (X: number, Y: number) => {
  const x = Math.floor((X / 600) * 8);
  const y = Math.floor((Y / 600) * 8);
  const cellId = y * 8 + x + 1;
  return cellId;
};

const Draggable: React.FC<DraggableProps> = ({
  children,
  addToCell,
  removefromCell,
  currentId,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [parentPosition, setParentPosition] = useState({ x: 0, y: 0 });
  const [rectPosition, setRectPosition] = useState({ x: 0, y: 0 });
  const myElementRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function setInitPos() {
    if (myElementRef.current && myElementRef.current.offsetParent) {
      const { x, y } = myElementRef.current.getBoundingClientRect();
      const { x: px, y: py } =
        myElementRef.current.offsetParent.getBoundingClientRect();
      setParentPosition({ x: px, y: py });
      setOffSet({ x: x - px, y: y - py });
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseXInRect = event.clientX - rect.left;
    const mouseyInRect = event.clientY - rect.top;
    setRectPosition({ x: mouseXInRect, y: mouseyInRect });
    setIsDragging(true);
  };
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        setOffSet({
          x: event.clientX - parentPosition.x - rectPosition.x,
          y: event.clientY - parentPosition.y - rectPosition.y,
        });
      }
    },
    [
      isDragging,
      parentPosition.x,
      parentPosition.y,
      rectPosition.x,
      rectPosition.y,
    ]
  );

  const handleMouseUp = useCallback(() => {
    //will change soon
    if (isDragging == false) return;
    const cellId = convertOffSetToCellId(offSet.x, offSet.y);

    removefromCell(currentId);
    addToCell(
      cellId,
      <Draggable
        removefromCell={removefromCell}
        addToCell={addToCell}
        currentId={cellId}
      >
        {children}
      </Draggable>
    );

    setIsDragging(false);
    console.log(currentId, cellId);
  }, [
    isDragging,
    offSet.x,
    offSet.y,
    removefromCell,
    currentId,
    addToCell,
    children,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty dependency array ensures the effect only runs once

  useEffect(() => {
    setInitPos();
  }, [windowSize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    handleMouseUp,
    isDragging,
    parentPosition,
    rectPosition,
    handleMouseMove,
  ]);

  return (
    <div
      ref={myElementRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: isDragging ? "absolute" : undefined,
        left: offSet.x,
        top: offSet.y,
        height: "var(--piece-size)",
        width: "var(--piece-size)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
