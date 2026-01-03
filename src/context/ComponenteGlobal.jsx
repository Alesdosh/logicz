import { useState } from "react";
import { globalContext } from "./globalContext";

import { useEdgesState, useNodesState } from '@xyflow/react';

const initialNodes = [
//   { id: 'n7', position: { x: -50, y: 100 }, data: { label: 'Node 7' }, type: 'botonType'}, // CREACION DE NODOS
//   { id: 'n2', position: { x: 0, y: 0 }, data: { label: 'Node 2' }, type: 'textUpdater' },
//   { id: 'n4', position: { x: 50, y: 100 }, data: { label: 'Node 4' }, type: 'botonType'}, // CREACION DE NODOS
//   { id: 'n5', position: { x: 50, y: 300 }, data: { label: 'Node 5' }, type: 'ledType'}, // CREACION DE NODOS
//   { id: 'n6', position: { x: 50, y: 350 }, data: { label: 'Node 5' }, type: 'ledType'}, // CREACION DE NODOS
    

];

export function ComponenteGlobal({ children }) {

    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [nodoSeleccionado, setNodoSeleccionado] = useState({})

    return (
        <globalContext.Provider 
            value={{
                edges, setEdges, onEdgesChange,
                nodes, setNodes, onNodesChange,
                nodoSeleccionado, setNodoSeleccionado
            }}
        >
            {children}
        </globalContext.Provider>
    )
}
