import { create } from "zustand";

type OrgChartState = {
  editMode: boolean;
  query: string;
  selectedPersonId?: string;
  setEditMode: (editMode: boolean) => void;
  setQuery: (query: string) => void;
  selectPerson: (personId?: string) => void;
};

export const useOrgChartStore = create<OrgChartState>((set) => ({
  editMode: false,
  query: "",
  selectedPersonId: undefined,
  setEditMode: (editMode) => set({ editMode }),
  setQuery: (query) => set({ query }),
  selectPerson: (selectedPersonId) => set({ selectedPersonId })
}));

