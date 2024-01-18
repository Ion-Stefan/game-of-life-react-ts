import { create } from "zustand";

type GridStore = {
  // const [numRow, setNumRow] = useState(30);
  numRow: number;
  // const [numCol, setNumCol] = useState(30);
  numCol: number;
  // const [boxSize, setBoxSize] = useState(20);
  boxSize: number;
  // const [generationTime, setTime] = useState<number>(750);
  generationTime: number;
  generations: number;
  setNumRow: (numRow: number) => void;
  setNumCol: (numCol: number) => void;
  setBoxSize: (boxSize: number) => void;
  setGenerationTime: (generationTime: number) => void;
  setGenerations: (generations: number) => void;
  incrementGenerations: (generations: number) => void;
};

export const useGridStore = create<GridStore>((set) => ({
  numRow: 30,
  setNumRow: (numRow: number) => set({ numRow }),
  numCol: 30,
  setNumCol: (numCol: number) => set({ numCol }),
  boxSize: 20,
  setBoxSize: (boxSize: number) => set({ boxSize }),
  generationTime: 750,
  setGenerationTime: (generationTime: number) => set({ generationTime }),
  generations: 0,
  setGenerations: (generations: number) => set({ generations }),
  incrementGenerations: () =>
    set((state) => ({ generations: state.generations + 1 })),
}));
