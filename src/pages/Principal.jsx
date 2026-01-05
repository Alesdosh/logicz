import { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, reconnectEdge } from '@xyflow/react';
import { Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { LateralPanel } from '../components/Lateral/LateralPanel';

import AndGate from '../components/Gates/AndGate';
import Led  from '../components/IO/Led';
import Button from '../components/IO/Button';

import { globalContext } from '../context/globalContext';

import { useConfig } from '../../global/Global';


 

export function Principal(){

  const nodeTypes = useMemo(() => ({
   andGate: AndGate,
  botonType: Button,
  ledType: Led,
}), []);

    const {mode} = useConfig()
    
      const {edges, setEdges, onEdgesChange, nodes, setNodes, onNodesChange, nodoSeleccionado, setNodoSeleccionado} = useContext(globalContext)

      
     
      const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge({...params, animated: null}, edgesSnapshot)),
        [],
      );

      const onNodeClick = (e, node) => {
        setNodoSeleccionado(node)
      }


      // useEffect(() => {
      //   console.log("SELECCIONADOAAAA"+JSON.stringify(nodoSeleccionado))
      // }, [nodoSeleccionado])

    return (
        <div style={{ width: '100vw', height: '100vh' }} className='flex'> {/*RENDERIZA LOS NODOS MANEJA HANDLERS */}
                <LateralPanel></LateralPanel>

              <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                colorMode={mode}
                fitView
                //onlyRenderVisibleElements={true}
                onNodeClick={onNodeClick}
              >
                <Background variant='cross'/>
                <Controls position='right'/>
                <MiniMap />

              </ReactFlow>
            </div>
    )
}
