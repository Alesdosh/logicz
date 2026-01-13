import { useEffect } from "react";
import { create } from "zustand";
import { useEdgesState } from "@xyflow/react";

export const useEdgesZ = create((set) => ({
    edges: [],
    initialEdges: [],
    update: (newA, nombre) => set((state) => ({ ...state, [nombre]: newA }))
}))

export const useConfig = create((set) => ({
    mode: "dark",
    update: (newA, nombre) => set((state) => ({ ...state, [nombre]: newA }))
    
}))


export const useModal = create((set) => ({
     open: false,
     type: null,
    update: (newA, nombre) => set((state) => ({ ...state, [nombre]: newA })),
    onOpenModal: (typ) => {
        update(true, "open")
        update(typ, "type")
    },
    onCloseModal: () => {
        update(false, "open")
    }
})) 