import { useGridStore } from "../store";
import { slide as Menu } from "react-burger-menu";
import icon from "../images/menuicon.svg";
export const Options = () => {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "white",
      padding: "2em 1em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "black",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

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
  const toggleBoxBorder = useGridStore((state) => state.toggleBoxBorder);
  return (
    <Menu
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      customBurgerIcon={<img src={icon} />}
      styles={styles}
    >
      <div className="flex items-center justify-center mb-4">
        <p className="text-2xl font-bold text-gray-900 mb-2">
          Box size in pixels:
        </p>
        <input
          className="border-2 mb-4 border-black rounded-lg "
          name="boxSize"
          type="number"
          value={boxSize}
          onChange={({ target }) => setBoxSize(Number(target.value))}
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <p className="text-2xl font-bold text-gray-900 mb-2">Columns:</p>
        <input
          className="border-2 mb-4 border-black rounded-lg "
          name="columns"
          type="number"
          value={numRow}
          onChange={({ target }) => setNumRow(Number(target.value))}
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <p className="text-2xl font-bold text-gray-900 mb-2">Rows:</p>
        <input
          className="border-2 mb-4 border-black rounded-lg "
          name="rows"
          type="number"
          value={numCol}
          onChange={({ target }) => setNumCol(Number(target.value))}
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <p className="text-2xl font-bold text-gray-900 mb-2">
          Generation time:
        </p>
        <input
          className="border-2 mb-4 border-black rounded-lg "
          name="generationTime"
          type="number"
          value={generationTime}
          onChange={({ target }) => setGenerationTime(Number(target.value))}
        />
      </div>

      <p className="text-2xl font-bold text-gray-900 mb-2">Hide border:</p>
      <input
        name="showBorder"
        type="checkbox"
        className="h-8 w-8 align-sub ml-4"
        onChange={({ target }) => toggleBoxBorder()}
      />
    </Menu>
  );
};
