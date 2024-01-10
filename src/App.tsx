import { useEffect, useState } from "react";

type GridType = number[][];

export const App = () => {
  const [numRow, setNumRow] = useState(20);
  const [numCol, setNumCol] = useState(20);
  const [boxSize, setBoxSize] = useState(60);

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

  const calculateNextGeneration = () => {
    setGrid((prevGrid) => {
      return prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = countAliveNeighbors(prevGrid, rowIndex, colIndex);
          // Apply Conway's Game of Life rules
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0; // Cell dies due to underpopulation or overpopulation
          } else if (cell === 0 && neighbors === 3) {
            return 1; // Cell becomes alive due to reproduction
          } else {
            return cell; // Cell stays the same
          }
        }),
      );
    });
  };

  const countAliveNeighbors = (
    currentGrid: GridType,
    row: number,
    col: number,
  ) => {
    const neighborsOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return neighborsOffsets.reduce((count, [offsetRow, offsetCol]) => {
      const newRow = row + offsetRow;
      const newCol = col + offsetCol;

      if (
        newRow >= 0 &&
        newRow < currentGrid.length &&
        newCol >= 0 &&
        newCol < currentGrid[0].length
      ) {
        count += currentGrid[newRow][newCol];
      }

      return count;
    }, 0);
  };

  const [generationTime, setTime] = useState<number>(1000);

  const handleStartButtonClick = (time: number) => {
    time = generationTime;
    let intervalId = setInterval(() => {
      calculateNextGeneration();
      setTime(generationTime);
      time = generationTime;
    }, time); // Adjust the interval as needed

    return intervalId;
  };

  const handleStopButtonClick = () => {
    setTime(900000);
  };

  return (
    <>
      <button
        onClick={() => setGrid(updateGrid())}
        className="text-4xl bg-blue-500 ml-10 p-5 text-white"
      >
        RESET
      </button>

      <button
        onClick={() => handleStartButtonClick(generationTime)}
        className="text-4xl bg-red-500 ml-5 p-5 text-white"
      >
        START
      </button>

      <button
        onClick={() => handleStopButtonClick()}
        className="text-4xl bg-red-500 ml-5 p-5 text-white"
      >
        STOP
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
