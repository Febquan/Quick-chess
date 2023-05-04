export type props = {
  addToCell: (addId: number, piece: JSX.Element) => void;
  removefromCell: (id: number) => void;
  setCellAttackMove: (id: number[], setVal: boolean) => void;
  setCellMovable: (id: number[], setVal: boolean) => void;
  currentId: number;
  firstMove?: boolean;
};
