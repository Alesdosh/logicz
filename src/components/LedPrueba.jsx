import { Handle, Position, useNodeConnections, useConnection, useEdges, useNodeId } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";

import { memo } from "react";

function LedPrueba(){

     const [input1, setInput1] = useState(false) // handle a

     const actual = useRef()
    
      const nodeId = useNodeId()
      

      const edgesL = useEdges()
    
      useEffect(() => { // CADA QUE CAMBIEN LOS EDGES EN EL CANVAS, SE EJECUTARA ESTO
        
        verifyDisconnection()

        verifyConnection()
    
    
      }, [edgesL])
    
      function verifyConnection(){ // VERIFICAR SI EN EL ARREGLO DE EDGESL SE ENCUENTRAN NUESTROS HANDLES TIPO TARGET
    
        const encontrar = edgesL.filter((edg) => edg.targetHandle == "a" && edg.target == nodeId)
    
        encontrar.map((item) => {
          if(item.targetHandle == "a" && item.animated == true){
            setInput1(true)
          }
        })
    
      }
    
      function verifyDisconnection(){
        const encontrar = edgesL.filter((edg) => edg.targetHandle == "a" && edg.target == nodeId)
    

        encontrar.map((item) => {
          if(item.targetHandle == "a" && item.animated == false){
            setInput1(false)
            actual.current.style.backgroundColor = "white"
          }
        })

        if(encontrar.length === 0){
            setInput1(false)
            actual.current.style.backgroundColor = "white"

          }


      }
    
      useEffect(() => {
        if(input1){ 
            actual.current.style.backgroundColor = "blue"
        }   
      }, [input1])
    
    
      return (
        <div className="bg-white border-black border-2 p-3 rounded-t-xl w-7 h-10" ref={actual}> {/*AGREGAR REF PARA PODER CAMBIAR LA ROTACION DE EL ELEMENTO */}
          <div className="flex flex-col">
          </div>
          <Handle type="target" position={Position.Bottom} id="a" className=""></Handle>
        </div>
      )

}

export default memo(LedPrueba)