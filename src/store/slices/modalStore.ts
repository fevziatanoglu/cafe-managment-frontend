import type { StateCreator } from "zustand";
import type { ReactNode } from "react";

interface ModalState {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  modalTitle: string;
  modalSize : "sm" | "md" | "lg" | "full";
}

interface ModalActions {
  openModal: (content: ReactNode, title: string, size?: "sm" | "md" | "lg" | "full") => void;
  closeModal: () => void;
}

export type ModalStore = ModalState & ModalActions;


export const createModalSlice: StateCreator<ModalState & ModalActions> = (set) => ({
  isModalOpen: false,
  modalContent: null,
  modalTitle: "",
  modalSize: "md",
  openModal: (content, title , size?) => {
    set({
      isModalOpen: true,
      modalContent: content,
      modalTitle: title,
      modalSize: size || "md", 
    });
  },
  closeModal: () => {
    set({ isModalOpen: false, modalContent: null, modalTitle: "" });
  },
});
