import { Handle, Position, useNodeConnections, useConnection, useEdges, useNodeId, reconnectEdge } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { useContext } from "react";

import { memo } from "react";

function OrGate() {

    const { edges, setEdges } = useContext(globalContext);


    const actual = useRef()
  
  
  const [input1, setInput1] = useState(false) // handle a
  const [input2, setInput2] = useState(false) // handle b

  const nodeId = useNodeId()
  

  const edgesL = useEdges()

  useEffect(() => { 
    
    verifyDisconnection()

    verifyConnection()






    edgesL.map((item) => { // LOGICA PARA HACER ANIMADO EL EDGE QUE SALE DEL CUSTOMPRUEBA
      if(item.source == nodeId) {
          if(input1 || input2){ 

            // VERIFICAR SI EL EDGE YA ES ANIMADO



            const edgeViejos = edgesL.filter((edg) => edg.sourceHandle == "c" && edg.source == nodeId); // PRACTICAMENTE PROGRAMADO PARA QUE SOLO SAQUE UN EDGE ANIMATED


           edgeViejos.forEach((ite, index) => {
              if(!ite.animated){ // TAL VEZ LA ESTE AGARRANDO COMO YA ANIMADA MEJOR DICHO
            const nuevaConexion = {
                source: ite.source,
                target: ite.target,
                sourceHandle: ite.sourceHandle,
                targetHandle: ite.targetHandle,
              };
          
              setEdges((eds) =>
                reconnectEdge(ite, nuevaConexion, eds).map((e) =>
                  e.id === ite.id ? { ...e, animated: true } : e
                )
              );
           }
           })

              
          } else {

            // ESTO SE EJECUTA CUANDO SE APAGA UN BOTON

            const edgeViejos = edgesL.filter((edg) => edg.sourceHandle == "c" && edg.source == nodeId);

           
            edgeViejos.forEach((ite, index) => {
              if(ite.animated){ 
            const nuevaConexion = {
                source: ite.source,
                target: ite.target,
                sourceHandle: ite.sourceHandle,
                targetHandle: ite.targetHandle,
              };
          
              setEdges((eds) =>
                reconnectEdge(ite, nuevaConexion, eds).map((e) =>
                  e.id === ite.id ? { ...e, animated: false } : e
                )
              );
           }
           })

          }
      }
    })

  }, [edgesL, input1, input2])

  function verifyConnection(){ // VERIFICAR SI EN NUESTROS TARGET TENEMOS CONEXIONES ANIMADAS
    const encontrar = edgesL.filter((edg) => edg.target == nodeId)

    encontrar.map((item) => {
      if(item.targetHandle == "a" && item.animated == true){
        setInput1(true)
      } else if (item.targetHandle == "b" && item.animated == true){ 
        setInput2(true)
      }
    })

  }

  function verifyDisconnection(){ 

  

    const encontrar1 = edgesL.filter((edg) => edg.targetHandle == "a" || edg.targetHandle == "b")
    const encontrar = encontrar1.filter((edg) => edg.target == nodeId)



    encontrar.map((item) => {
      if(item.targetHandle == "a" && item.animated == false && item.source !== nodeId){ 

        encontrar.map((ite, index) => {
          if(ite.targetHandle == "b"){
            encontrar.splice(index, 1)
          }
        })

        setInput1(false) 

      } else if (item.targetHandle == "b" && item.animated == false && item.source !== nodeId){ 
        setInput2(false)
      } 
    })




    console.log("EDGES DE OR"+encontrar)

    encontrar.map((item) => { // MANEJO DE ELIMINACION DE EDGES
      if(item.targetHandle !== "b"){
        console.log("EJECUTADO 1")
        setInput2(false)
      }
      if (item.targetHandle !== "a") {
        setInput1(false)
      }
    })

    if (encontrar.length === 0) {
        setInput1(false)
        setInput2(false)
      }

  }

  useEffect(() => {
    if(input1 || input2){
      actual.current.style.backgroundColor = "green"
    } else {
      actual.current.style.backgroundColor = "white"

    }
    //   console.log("INPUT1"+input1)
    //   console.log("INPUT2"+input2)

  }, [input1, input2])


  return (
    <div className="bg-white border-black border-[2.5px] border-b-transparent rounded-tl-full rounded-tr-full w-10 h-10 cursor-grab z-50 flex items-end" ref={actual}> {/*AGREGAR REF PARA PODER CAMBIAR LA ROTACION DE EL ELEMENTO */}
      
      <Handle type="source" position={Position.Top} id="c"></Handle>
      <Handle type="target" position={Position.Bottom} id="a" className="left-1"></Handle>
      <Handle type="target" position={Position.Bottom} id="b" className="left-[2.3rem]"></Handle>
    </div>
  );
}

export default memo(OrGate)
