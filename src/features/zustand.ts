import { create } from "zustand";

interface SearchQueryStates {
  thoughtQuery: string;
  tagQuery: string;
  memberQuery: string;

  thoughtPage: number;
  tagPage: number;
  memberPage: number;

  setThoughtQuery: (query: string) => void;
  setTagQuery: (query: string) => void;
  setMemberQuery: (query: string) => void;

  setThoughtPage: (page: number) => void;
  setTagPage: (page: number) => void;
  setMemberPage: (page: number) => void;

  resetFilters: () => void;
}

export const useSearchQueryStates = create<SearchQueryStates>((set) => ({
  thoughtQuery: "",
  tagQuery: "",
  memberQuery: "",

  thoughtPage: 1,
  tagPage: 1,
  memberPage: 1,

  setThoughtQuery: (query) => set({ thoughtQuery: query }),
  setTagQuery: (query) => set({ tagQuery: query }),
  setMemberQuery: (query) => set({ memberQuery: query }),

  setThoughtPage: (page) => set({ thoughtPage: page }),
  setTagPage: (page) => set({ tagPage: page }),
  setMemberPage: (page) => set({ memberPage: page }),

  resetFilters: () =>
    set({
      thoughtQuery: "",
      tagQuery: "",
      memberQuery: "",
      thoughtPage: 1,
      tagPage: 1,
      memberPage: 1,
    }),
}));
