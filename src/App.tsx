import { useEffect, useState } from "react";

type GridType = number[][];

export const App = () => {
  const [numRow, setNumRow] = useState(35);
  const [numCol, setNumCol] = useState(35);
  const [boxSize, setBoxSize] = useState(25);
  const [generationTime, setTime] = useState<number>(750);
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
    console.log("reseted");
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
      <div className="flex items-center justify-center">
        <button
          onClick={() => resetGame()}
          className="text-2xl bg-blue-500 m-5 p-5 text-white"
        >
          RESET
        </button>

        <button
          onClick={() => setGrid(updateRandomGrid())}
          className="text-2xl bg-blue-500 m-5 p-5 text-white"
        >
          RANDOMIZE GRID
        </button>

        <button
          onClick={() => handleStartButtonClick()}
          className="text-2xl bg-red-500 m-5 p-5 text-white"
        >
          ENDLESS MODE
        </button>

        <button
          onClick={() => calculateNextGeneration()}
          className="text-2xl bg-red-500 m-5 p-5 text-white"
        >
          NEXT GENERATION
        </button>
      </div>

      <div className="flex flex-col items-start ml-16">
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 mb-5">
            Box size in pixels:
          </p>
          <input
            className="border-2 ml-2 mb-4 border-black rounded-lg "
            name="boxSize"
            value={boxSize}
            onChange={({ target }) => setBoxSize(target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 mb-5">Rows:</p>
          <input
            className="border-2 ml-2 mb-4 border-black rounded-lg "
            name="boxSize"
            value={numRow}
            onChange={({ target }) => setNumRow(target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 mb-5">Colums:</p>
          <input
            className="border-2 ml-2 mb-4 border-black rounded-lg "
            name="boxSize"
            value={numCol}
            onChange={({ target }) => setNumCol(target.value)}
          />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 mb-5">
            Generation time:
          </p>
          <input
            className="border-2 ml-2 mb-4 border-black rounded-lg "
            name="boxSize"
            value={generationTime}
            onChange={({ target }) => setTime(target.value)}
          />
        </div>
      </div>
      <p className="text-2xl text-center">Generations: {generations}</p>

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
    </>
  );
};
export default App;
