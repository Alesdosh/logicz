import { useEffect } from "react";
import { create } from "zustand";
import { useEdgesState } from "@xyflow/react";

export const useEdgesZ = create((set) => ({
    edges: [],
    initialEdges: [],
    update: (newA, nombre) => set((state) => ({ ...state, [nombre]: newA }))
}))

export const useConfig = create((set) => ({
    mode: "light",
    update: (newA, nombre) => set((state) => ({ ...state, [nombre]: newA }))
    
}))