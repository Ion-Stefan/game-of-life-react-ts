interface Props {
  resetGame(): void;
  randomizeGrid(): void;
  handleStartButtonClick(): void;
  calculateNextGeneration(): void;
}

export const Buttons = ({
  resetGame,
  randomizeGrid,
  handleStartButtonClick,
  calculateNextGeneration,
}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => resetGame()}
        className="text-2xl bg-blue-500 m-5 p-5 text-white"
      >
        RESET
      </button>

      <button
        onClick={() => randomizeGrid()}
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
  );
};
