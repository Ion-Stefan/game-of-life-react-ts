import { useGridStore } from "../store";
export const Options = () => {
  const numRow: number = useGridStore((state) => state.numRow);
  // const [numCol, setNumCol] = useState(30);
  const numCol: number = useGridStore((state) => state.numCol);
  // const [boxSize, setBoxSize] = useState(20);
  const boxSize: number = useGridStore((state) => state.boxSize);
  // const [generationTime, setTime] = useState<number>(750);
  const generationTime: number = useGridStore((state) => state.generationTime);

  const setNumRow = useGridStore((state) => state.setNumRow);
  const setNumCol = useGridStore((state) => state.setNumCol);
  const setBoxSize = useGridStore((state) => state.setBoxSize);
  const setGenerationTime = useGridStore((state) => state.setGenerationTime);
  return (
    <div className="flex flex-col items-start ml-16">
      <div className="flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900 mb-5">
          Box size in pixels:
        </p>
        <input
          className="border-2 ml-2 mb-4 border-black rounded-lg "
          name="boxSize"
          value={boxSize}
          onChange={({ target }) => setBoxSize(Number(target.value))}
        />
      </div>

      <div className="flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900 mb-5">Columns:</p>
        <input
          className="border-2 ml-2 mb-4 border-black rounded-lg "
          name="boxSize"
          value={numRow}
          onChange={({ target }) => setNumRow(Number(target.value))}
        />
      </div>

      <div className="flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-900 mb-5">Rows:</p>
        <input
          className="border-2 ml-2 mb-4 border-black rounded-lg "
          name="boxSize"
          value={numCol}
          onChange={({ target }) => setNumCol(Number(target.value))}
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
          onChange={({ target }) => setGenerationTime(Number(target.value))}
        />
      </div>
    </div>
  );
};
