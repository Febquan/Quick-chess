import React, { useState, useEffect, useRef, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../control/gameState";
import { locationSlice } from "../../control/gameState";
import {
  PieceName,
  chessLocations,
  color,
} from "../../control/utility/GameData";
import { props } from "../pieces/types";

import Pointer from "./Pointer";

import { getBoardSize } from "./helper";
type DraggableProps = {
  children: React.ReactNode;
  name: PieceName;
  pcolor: color;
  firstMove?: boolean;
  checkAvailableMove: (
    allPieceLoc: chessLocations,
    currentId: number,
    site: color,
    pcolor: color,
    firstMove?: boolean
  ) => {
    validMove: number[];
    atackMove: number[];
  };
} & props;
let broadSize = 0;

const convertOffSetToCellId = (X: number, Y: number) => {
  const x = Math.floor((X / broadSize) * 8);
  const y = Math.floor((Y / broadSize) * 8);
  const cellId = y * 8 + x;
  return cellId;
};

const Draggable: React.FC<DraggableProps> = ({
  children,
  addToCell,
  removefromCell,
  currentId,
  name,
  pcolor,
  checkAvailableMove,
  setCellAttackMove,
  setCellMovable,
  firstMove,
}) => {
  const { allPieceLoc, site } = useSelector((state: RootState) => ({
    allPieceLoc: state.allPieceLoc,
    site: state.site,
  }));
  const dispatch = useDispatch();
  const [dragDisplay, setDragDisplay] = useState<{
    validMove: number[];
    atackMove: number[];
  }>({
    validMove: [],
    atackMove: [],
  });
  const [isDragging, setIsDragging] = useState(false);
  const [pointerOffSet, setPointerOffSet] = useState({ x: 0, y: 0 });
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
    setInitPos();
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseXInRect = event.clientX - rect.left;
    const mouseyInRect = event.clientY - rect.top;
    setRectPosition({ x: mouseXInRect, y: mouseyInRect });
    setIsDragging(true);
    const { validMove, atackMove } = checkAvailableMove(
      allPieceLoc,
      currentId,
      site,
      pcolor,
      firstMove
    );
    setDragDisplay({ validMove, atackMove });
    setCellAttackMove(atackMove, true);
    setCellMovable(validMove, true);
  };
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const px = event.clientX - parentPosition.x - rectPosition.x;
        const py = event.clientY - parentPosition.y - rectPosition.y;
        setOffSet({
          x: px,
          y: py,
        });
        setPointerOffSet({
          x: (Math.floor((px / broadSize) * 8) * broadSize) / 8,
          y: (Math.floor((py / broadSize) * 8) * broadSize) / 8,
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
    if (isDragging == false) return;
    const { validMove, atackMove } = dragDisplay;
    const cellId = convertOffSetToCellId(offSet.x, offSet.y);

    if (validMove.includes(cellId) || atackMove.includes(cellId)) {
      removefromCell(currentId);
      addToCell(
        cellId,
        <Draggable
          name={name}
          pcolor={pcolor}
          removefromCell={removefromCell}
          addToCell={addToCell}
          currentId={cellId}
          checkAvailableMove={checkAvailableMove}
          setCellAttackMove={setCellAttackMove}
          setCellMovable={setCellMovable}
          firstMove={false}
        >
          {children}
        </Draggable>
      );

      dispatch(
        locationSlice.actions.updateLoc({
          name,
          pcolor,
          newLoc: cellId,
          oldLoc: currentId,
        })
      );
    }

    setCellMovable(validMove, false);
    setCellAttackMove(atackMove, false);
    setIsDragging(false);
  }, [
    isDragging,
    dragDisplay,
    offSet.x,
    offSet.y,
    setCellMovable,
    setCellAttackMove,
    removefromCell,
    currentId,
    addToCell,
    name,
    pcolor,
    checkAvailableMove,
    children,
    dispatch,
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

    broadSize = getBoardSize();
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
    <>
      <div
        ref={myElementRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          position: isDragging ? "absolute" : "static",
          left: offSet.x,
          top: offSet.y,
          height: "var(--piece-size)",
          width: "var(--piece-size)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "grab",
          zIndex: 3,
        }}
      >
        {children}
      </div>
      {isDragging && <Pointer pos={pointerOffSet} />}
    </>
  );
};

export default Draggable;
