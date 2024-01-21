import { GridType } from "../App";
import { useGridStore } from "../store";
interface Props {
  grid: GridType;
  updateCellValue: (x: number, y: number, value: number) => void;
  generations: number;
}
const unselectedClass =
  "`border-solid bg-emerald-500 border-2 border-black text-center`";
const selectedClass =
  "`border-solid bg-red-500 border-2 border-black text-center`";

export const MainGrid = ({ grid, updateCellValue, generations }: Props) => {
  const boxSize: number = useGridStore((state) => state.boxSize);
  const boxBorder: boolean = useGridStore((state) => state.boxBorder);
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <p className="text-2xl text-center">Generations: {generations}</p>
      <div className="flex justify-center items-center py-10">
        {/* Display the grid using the map function */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: `${boxSize}px`,
                  height: `${boxSize}px`,
                  border: `${boxBorder ? "1px solid black" : "none"}`,
                }}
                className={cell === 1 ? selectedClass : unselectedClass}
                onClick={() => updateCellValue(rowIndex, colIndex, cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
