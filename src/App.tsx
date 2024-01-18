import { useEffect, useState } from "react";
import { useGridStore } from "./store";
import { Options } from "./components/Options";
import { MainGrid } from "./components/MainGrid";
import { Buttons } from "./components/Buttons";
export type GridType = number[][];

export const App = () => {
  const numRow: number = useGridStore((state) => state.numRow);
  const numCol: number = useGridStore((state) => state.numCol);
  const generationTime: number = useGridStore((state) => state.generationTime);
  const generations: number = useGridStore((state) => state.generations);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [emptyGrid, setEmptyGrid] = useState<GridType>([]);

  const setGenerations = useGridStore((state) => state.setGenerations);
  const incrementGenerations = useGridStore(
    (state) => state.incrementGenerations,
  );

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

  function randomizeGrid() {
    setGrid(updateRandomGrid());
  }

  function resetGame() {
    window.location.reload();
    console.log("reseted");
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
      if (grid === emptyGrid || isRunning) return grid;
      incrementGenerations(generations);
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

    setInterval(() => {
      calculateNextGeneration();
    }, generationTime); // Adjust the interval as needed
  };

  return (
    <>
      <Buttons
        resetGame={resetGame}
        handleStartButtonClick={handleStartButtonClick}
        calculateNextGeneration={calculateNextGeneration}
        randomizeGrid={randomizeGrid}
      />
      <Options />
      <p className="text-2xl text-center">Generations: {generations}</p>
      <MainGrid grid={grid} updateCellValue={updateCellValue} />
    </>
  );
};
export default App;
