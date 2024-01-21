import { create } from "zustand";

type GridStore = {
  numRow: number;
  numCol: number;
  boxSize: number;
  generationTime: number;
  generations: number;
  boxBorder: boolean;
  setNumRow: (numRow: number) => void;
  setNumCol: (numCol: number) => void;
  setBoxSize: (boxSize: number) => void;
  setGenerationTime: (generationTime: number) => void;
  setGenerations: (generations: number) => void;
  incrementGenerations: (generations: number) => void;
};

export const useGridStore = create<GridStore>((set) => ({
  numRow: 25,
  setNumRow: (numRow: number) => set({ numRow }),
  numCol: 25,
  setNumCol: (numCol: number) => set({ numCol }),
  boxSize: 20,
  setBoxSize: (boxSize: number) => set({ boxSize }),
  generationTime: 500,
  setGenerationTime: (generationTime: number) => set({ generationTime }),
  generations: 0,
  setGenerations: (generations: number) => set({ generations }),
  incrementGenerations: () =>
    set((state) => ({ generations: state.generations + 1 })),
  boxBorder: true,
  toggleBoxBorder: () => set((state) => ({ boxBorder: !state.boxBorder })),
}));
