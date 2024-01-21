import { Button } from "./Button";
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
    <div className="pt-2 flex items-center justify-center">
      <Button buttonFunction={resetGame} buttonText={"Reset Game"} />

      <Button buttonFunction={randomizeGrid} buttonText={"Randomize Game"} />

      <Button
        buttonFunction={handleStartButtonClick}
        buttonText={"Endless Game Mode"}
      />

      <Button
        buttonFunction={calculateNextGeneration}
        buttonText={"View Next Generation"}
      />
    </div>
  );
};
