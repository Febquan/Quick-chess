import React, { useState, useEffect, useRef, useCallback } from "react";

interface DraggableProps {
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [parentPosition, setParentPosition] = useState({ x: 0, y: 0 });
  const [rectPosition, setRectPosition] = useState({ x: 0, y: 0 });
  const myElementRef = useRef<HTMLDivElement>(null);

  function setInitPos() {
    if (myElementRef.current && myElementRef.current.offsetParent) {
      const { x, y } = myElementRef.current.getBoundingClientRect();
      const { x: px, y: py } =
        myElementRef.current.offsetParent.getBoundingClientRect();
      setParentPosition({ x: px, y: py });
      setOffSet({ x: x - px, y: y - py });
    }
  }
  const handleMouseUp = useCallback(() => {
    setInitPos(); //will change soon
    setIsDragging(false);
  }, []);
  useEffect(() => {
    setInitPos();
  }, []);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setOffSet({
          x: event.clientX - parentPosition.x - rectPosition.x,
          y: event.clientY - parentPosition.y - rectPosition.y,
        });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp, isDragging, parentPosition, rectPosition]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseXInRect = event.clientX - rect.left;
    const mouseyInRect = event.clientY - rect.top;
    setRectPosition({ x: mouseXInRect, y: mouseyInRect });
    setIsDragging(true);
  };

  return (
    <div
      ref={myElementRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: isDragging ? "absolute" : undefined,
        left: offSet.x,
        top: offSet.y,

        background: "red",
        cursor: "move",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
