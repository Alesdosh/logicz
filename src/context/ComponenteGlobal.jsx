import { useState } from "react";
import { globalContext } from "./globalContext";

import { useEdgesState, useNodesState } from '@xyflow/react';


export function ComponenteGlobal({ children }) {

    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [nodoSeleccionado, setNodoSeleccionado] = useState({})
    const [rfInstance, setRfInstance] = useState(null);
    const [gates, setGates] = useState(["andGate", "notGate", "orGate", "nandGate"])
    const [io, setIo] = useState(["button", "led"])


    return (
        <globalContext.Provider 
            value={{
                edges, setEdges, onEdgesChange,
                nodes, setNodes, onNodesChange,
                nodoSeleccionado, setNodoSeleccionado,
                gates, setGates,
                io, setIo,
                rfInstance, setRfInstance
            }}
        >
            {children}
        </globalContext.Provider>
    )
}
