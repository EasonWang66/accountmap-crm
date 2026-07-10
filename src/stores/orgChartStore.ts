import { create } from "zustand";

type OrgChartState = {
  editMode: boolean;
  query: string;
  selectedPersonId?: string;
  draftName: string;
  setEditMode: (editMode: boolean) => void;
  setQuery: (query: string) => void;
  setDraftName: (draftName: string) => void;
  selectPerson: (personId?: string) => void;
};

export const useOrgChartStore = create<OrgChartState>((set) => ({
  editMode: false,
  query: "",
  selectedPersonId: undefined,
  draftName: "",
  setEditMode: (editMode) => set({ editMode }),
  setQuery: (query) => set({ query }),
  setDraftName: (draftName) => set({ draftName }),
  selectPerson: (selectedPersonId) => set({ selectedPersonId })
}));
