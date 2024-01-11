import { useEffect, useState } from "react";

type GridType = number[][];

export const App = () => {
  const [numRow, setNumRow] = useState(50);
  const [numCol, setNumCol] = useState(50);
  const [boxSize, setBoxSize] = useState(25);
  const [generationTime, setTime] = useState<number>(1000);
  const [generations, setGenerations] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [emptyGrid, setEmptyGrid] = useState<GridType>([]);

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

  function updateRandomGrid() {
    if (isRunning) return grid;
    const initialGrid = Array.from({ length: numRow }, () =>
      Array.from({ length: numCol }, () => Math.round(Math.random())),
    );
    setGenerations(0);
    return initialGrid;
  }

  function updateGrid() {
    if (isRunning) return grid;
    const initialGrid = Array.from({ length: numRow }, () =>
      Array.from({ length: numCol }, () => 0),
    );
    setGenerations(0);
    setEmptyGrid(initialGrid);
    return initialGrid;
  }

  function resetGame() {
    window.location.reload();
  }

  useEffect(() => {
    setGrid(updateGrid());
  }, [numRow, numCol, generationTime]);

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
      if (grid === emptyGrid || isRunning) return grid;
      setGenerations((prevGenerations) => prevGenerations + 1);
      return prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = countAliveNeighbors(prevGrid, rowIndex, colIndex);
          // Game rules
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

  const handleStartButtonClick = () => {
    if (grid !== emptyGrid) {
      setIsRunning(true);
    } else {
      return grid;
    }

    let intervalId = setInterval(() => {
      calculateNextGeneration();
    }, generationTime); // Adjust the interval as needed

    return intervalId;
  };

  return (
    <>
      <button
        onClick={() => resetGame()}
        className="text-4xl bg-blue-500 ml-10 p-5 text-white"
      >
        RESET
      </button>

      <button
        onClick={() => setGrid(updateRandomGrid())}
        className="text-4xl bg-blue-500 ml-10 p-5 text-white"
      >
        RANDOMIZE GRID
      </button>

      <button
        onClick={() => setGrid(updateGrid())}
        className="text-4xl bg-blue-500 ml-10 p-5 text-white"
      >
        CLEAR GRID
      </button>

      <button
        onClick={() => handleStartButtonClick()}
        className="text-4xl bg-red-500 ml-5 p-5 text-white"
      >
        ENDLESS MODE
      </button>

      <button
        onClick={() => calculateNextGeneration()}
        className="text-4xl bg-red-500 ml-5 p-5 text-white"
      >
        NEXT GENERATION
      </button>

      <p className="text-4xl text-center mt-10">Generations: {generations}</p>

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
                {/* {cell} */}
                <br />
                {/* Display the indices */}
                {/* [ {rowIndex}, {colIndex} ] */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
