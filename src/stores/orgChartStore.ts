import { create } from "zustand";

type OrgChartState = {
  editMode: boolean;
  query: string;
  selectedPersonId?: string;
  hoveredPersonId?: string;
  draftName: string;
  setEditMode: (editMode: boolean) => void;
  setQuery: (query: string) => void;
  setHoveredPerson: (personId?: string) => void;
  setDraftName: (draftName: string) => void;
  selectPerson: (personId?: string) => void;
};

export const useOrgChartStore = create<OrgChartState>((set) => ({
  editMode: false,
  query: "",
  selectedPersonId: undefined,
  hoveredPersonId: undefined,
  draftName: "",
  setEditMode: (editMode) => set({ editMode }),
  setQuery: (query) => set({ query }),
  setHoveredPerson: (hoveredPersonId) => set({ hoveredPersonId }),
  setDraftName: (draftName) => set({ draftName }),
  selectPerson: (selectedPersonId) => set({ selectedPersonId })
}));
