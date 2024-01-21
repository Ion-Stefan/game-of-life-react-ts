interface Props {
  buttonFunction: () => void;
  buttonText: string;
}
export const Button = ({ buttonFunction, buttonText }: Props) => {
  return (
    <button
      onClick={buttonFunction}
      className="text-xl bg-blue-500 m-3 p-3 text-white"
    >
      {buttonText}
    </button>
  );
};
