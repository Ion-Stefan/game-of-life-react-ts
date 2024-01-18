import { GridType } from "../App";
import { useGridStore } from "../store";
interface Props {
  grid: GridType;
  updateCellValue: (x: number, y: number, value: number) => void;
}
const unselectedClass =
  "`border-solid bg-emerald-500 border-2 border-black text-center`";
const selectedClass =
  "`border-solid bg-red-500 border-2 border-black text-center`";

export const MainGrid = ({ grid, updateCellValue }: Props) => {
  const boxSize: number = useGridStore((state) => state.boxSize);
  return (
    <div className=" flex justify-center items-start py-10">
      {/* Display the grid using the map function */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
              className={cell === 1 ? selectedClass : unselectedClass}
              onClick={() => updateCellValue(rowIndex, colIndex, cell)}
            >
              {/* Display the value of each cell */}
              {/* {cell} */}
              <br />
              {/* Display the indices */}
              {/* [ {rowIndex}, {colIndex} ] */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
