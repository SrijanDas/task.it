import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { getCheckLists } from "@/actions/checklist.actions";

export type ChecklistState = {
    checkLists: (CheckList & {checklist_items: CheckListItem[]})[];
    isLoading: boolean;
    error: string | null;
};


export type ChecklistActions = {
    fetchChecklists: (cardId: string) => Promise<void>;
    // updateChecklist: (updatedData: CheckList) => void;
    updateChecklistItem: (updatedData: CheckListItem) => void;
    addChecklist: (checklist: CheckList) => void;
    addChecklistItem: (checklistItem: CheckListItem) => void;
    // deleteChecklist: (checklistId: string) => void;
    // deleteChecklistItem: (checklistItemId: string) => void;
};

export type ChecklistStore = ChecklistState & ChecklistActions;

export const defaultInitState: ChecklistState = {
    checkLists: [],
    isLoading: false,
    error: null
};

export const useChecklistStore = create<ChecklistStore>()(
    immer((set) => ({
        ...defaultInitState,
        fetchChecklists: async (cardId) => {
            set((state) => {
                state.isLoading = true;
            });            

            const { data, error } = await getCheckLists(cardId);

            if (error) {
                set((state) => {
                    state.error = error.message;
                    state.isLoading = false;
                });

                return
            }

            if (data) {
                set((state) => {
                    state.checkLists = data;
                    state.isLoading = false
                    state.error = null;
                });
            }
          
        },

        addChecklist: (checklist) => {
            set((state) => {
                state.checkLists.push({...checklist, checklist_items: []});
            });
        },

        addChecklistItem: (checklistItem) => {
            set((state) => {
                const checklist = state.checkLists.find((checklist) => checklist.id === checklistItem.checklist_id);
                if (checklist) {
                    checklist.checklist_items.push(checklistItem);
                }
            });
        },
        updateChecklistItem: (updatedData) => {
            set((state) => {
                const checklist = state.checkLists.find((checklist) => checklist.id === updatedData.checklist_id);
                if (checklist) {
                    const item = checklist.checklist_items.find((item) => item.id === updatedData.id);
                    if (item) {
                        item.index = updatedData.index;
                        item.title = updatedData.title;
                        item.completed = updatedData.completed;
                    }
                   
                }
            });

             
        }
       
    })),
);