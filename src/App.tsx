import { useEffect, useState } from "react";

type GridType = number[][];

export const App = () => {
  const [numRow, setNumRow] = useState(5);
  const [numCol, setNumCol] = useState(5);
  const [boxSize, setBoxSize] = useState(80);

  const unselectedClass =
    "`border-solid bg-emerald-500 border-2 border-black text-center`";
  const selectedClass =
    "`border-solid bg-red-500 border-2 border-black text-center`";
  const [grid, setGrid] = useState<GridType>(() => {
    const initialGrid = Array.from({ length: numRow }, () =>
      Array.from({ length: numCol }, () => 0),
    );
    return initialGrid;
  });

  function updateGrid() {
    const initialGrid = Array.from({ length: numRow }, () =>
      Array.from({ length: numCol }, () => 0),
    );
    return initialGrid;
  }

  useEffect(() => {
    setGrid(updateGrid());
  }, [numRow, numCol]);

  const updateCellValue = (row: number, col: number, cell: number) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...prevGrid[row]];
      cell === 0 ? (cell = 1) : (cell = 0);
      newGrid[row][col] = cell;
      return newGrid;
    });
  };

  return (
    <>
      <button
        onClick={() => console.log(grid)}
        className="text-4xl bg-red-500 p-5 text-white"
      >
        DEBUG!
      </button>

      <button
        onClick={() => setGrid(updateGrid())}
        className="text-4xl bg-blue-500 ml-10 p-5 text-white"
      >
        RESET
      </button>
      <div className=" h-[85vh] flex justify-center items-center">
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
                {cell}
                <br />
                {/* Display the indices */}[ {rowIndex}, {colIndex} ]
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
