import { useState } from "react";
import { globalContext } from "./globalContext";

import { useEdgesState, useNodesState } from '@xyflow/react';

const initialNodes = [


];

export function ComponenteGlobal({ children }) {

    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [nodoSeleccionado, setNodoSeleccionado] = useState({})
    const [gates, setGates] = useState(["andGate", "notGate", "orGate"])

    return (
        <globalContext.Provider 
            value={{
                edges, setEdges, onEdgesChange,
                nodes, setNodes, onNodesChange,
                nodoSeleccionado, setNodoSeleccionado,
                gates, setGates
            }}
        >
            {children}
        </globalContext.Provider>
    )
}
