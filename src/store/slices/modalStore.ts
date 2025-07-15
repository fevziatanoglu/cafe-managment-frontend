import type { StateCreator } from "zustand";
import type { ReactNode } from "react";

interface ModalState {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  modalTitle: string;
}

interface ModalActions {
  openModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;
}

export type ModalStore = ModalState & ModalActions;


export const createModalSlice: StateCreator<ModalState & ModalActions> = (set) => ({
  isModalOpen: false,
  modalContent: null,
  modalTitle: "",
  openModal: (content, title) => {
    set({
      isModalOpen: true,
      modalContent: content,
      modalTitle: title,
    });
  },
  closeModal: () => {
    set({ isModalOpen: false, modalContent: null, modalTitle: "" });
  },
});
