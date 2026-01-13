import { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, reconnectEdge, useReactFlow } from '@xyflow/react';
import { Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';



import { LateralPanel } from '../components/Lateral/LateralPanel';
import Search from '../components/Lateral/Search';

import AndGate from '../components/Gates/AndGate';
import Led  from '../components/IO/Led';
import Button from '../components/IO/Button';
import OrGate from '../components/Gates/OrGate';
import NandGate from '../components/Gates/NandGate';
import NotGate from '../components/Gates/NotGate';

import { globalContext } from '../context/globalContext';

import { useConfig } from '../../global/Global';


 

export function Principal(){

  const nodeTypes = useMemo(() => ({
   andGate: AndGate,
   orGate: OrGate,
   nandGate: NandGate,
   notGate: NotGate,
  button: Button,
  led: Led,
}), []);


  useEffect(() => {
    if(localStorage.getItem("flowSaves") === null){
          localStorage.setItem("flowSaves", JSON.stringify([]));
    }
  }, [])

    const {mode} = useConfig()

    const {setViewport} = useReactFlow();
    
      const {edges, setEdges, onEdgesChange, nodes, setNodes, onNodesChange, nodoSeleccionado, setNodoSeleccionado, rfInstance, setRfInstance} = useContext(globalContext)

      
     
      const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge({...params, animated: null}, edgesSnapshot)),
        [],
      );

      const onNodeClick = (e, node) => {
        setNodoSeleccionado(node)
      }

      const onSave = useCallback(() => {
        if(rfInstance){
          const flow = rfInstance.toObject();
          // localStorage.setItem("flowKey", JSON.stringify(flow))
          const o = JSON.parse(localStorage.getItem("flowSaves")) || []; // ERROR AQUI AL HACER SAVE
          console.log("OOOOOOOOO", o)
          const nuevo = [...o, flow];
          console.log("NUEVOO" , nuevo)
          localStorage.setItem("flowSaves", JSON.stringify(nuevo));

        }
      }, [rfInstance])

      const onRestore = useCallback((flo) => { // recibira el objeto flow y lo restaurara
        const restoreFlow = async () => {
          // const flow = JSON.parse(localStorage.getItem("flowKey"))
          if(flo){
            const {x = 0, y = 0, zoom = 1} = flo.viewport
            setNodes(flo.nodes || []);
            setEdges(flo.edges || [])
            setViewport({x, y, zoom})
          }
        }

        restoreFlow();

      }, [setNodes, setViewport ])


      // useEffect(() => {
      //   console.log("SELECCIONADOAAAA"+JSON.stringify(nodoSeleccionado))
      // }, [nodoSeleccionado])

    return (
        <div style={{ width: '100vw', height: '100vh' }} className='flex'> {/*RENDERIZA LOS NODOS MANEJA HANDLERS */}
                <LateralPanel onSave={onSave} onRestore={onRestore}></LateralPanel>

              <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                colorMode={mode}
                onInit={setRfInstance}
                fitView
                //onlyRenderVisibleElements={true}
                onNodeClick={onNodeClick}
              >
                <Background variant='cross'/>
                <Controls position='right'/>
                <MiniMap />
                <Search></Search>

              </ReactFlow>
            </div>
    )
}
