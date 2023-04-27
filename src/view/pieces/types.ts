export type props = {
  addToCell: (addId: number, piece: JSX.Element) => void;
  removefromCell: (id: number) => void;
  currentId: number;
};
