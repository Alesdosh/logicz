import { useState } from "react";
import { globalContext } from "./globalContext";

import { useEdgesState, useNodesState } from '@xyflow/react';


export function ComponenteGlobal({ children }) {

    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [nodoSeleccionado, setNodoSeleccionado] = useState({})
    const [gates, setGates] = useState(["andGate", "notGate", "orGate"])
    const [io, setIo] = useState(["button", "led"])

    return (
        <globalContext.Provider 
            value={{
                edges, setEdges, onEdgesChange,
                nodes, setNodes, onNodesChange,
                nodoSeleccionado, setNodoSeleccionado,
                gates, setGates,
                io, setIo
            }}
        >
            {children}
        </globalContext.Provider>
    )
}
