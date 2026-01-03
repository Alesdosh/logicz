import { Handle, Position, useNodeConnections, useConnection, useEdges, useNodeId, reconnectEdge } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { globalContext } from "../context/globalContext";
import { useContext } from "react";

import { memo } from "react";

function CustomPrueba(props) {

    const { edges, setEdges } = useContext(globalContext);

    const [cont, setCont]  = useState(0)

    const actual = useRef()
  
  
  const [input1, setInput1] = useState(false) // handle a
  const [input2, setInput2] = useState(false) // handle b

  const nodeId = useNodeId()
  

  const edgesL = useEdges()

  useEffect(() => { // AHORA QUE HICE QUE EL BOTON PUEDA RETORNAR 2 ANIMATED, ESTO SE EJECUTA SIEMPRE
    
    verifyDisconnection()

    verifyConnection()




        // console.log("EDGES DEL AND: " + JSON.stringify(edgesL.filter((edg) => edg.source == nodeId)))


    edgesL.map((item) => { // LOGICA PARA HACER ANIMADO EL EDGE QUE SALE DEL CUSTOMPRUEBA
      if(item.source == nodeId) {
          if(input1 && input2){ 

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
              if(ite.animated){ // TAL VEZ LA ESTE AGARRANDO COMO YA ANIMADA MEJOR DICHO
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
    const encontrar1 = edgesL.filter((edg) => edg.targetHandle == "a" || edg.targetHandle == "b")
    const encontrar = edgesL.filter((edg) => edg.target == nodeId)

    // console.log("ENCONTRAR DE CONEXION"+JSON.stringify(encontrar))

    encontrar.map((item) => {
      if(item.targetHandle == "a" && item.animated == true){
        setInput1(true)
      } else if (item.targetHandle == "b" && item.animated == true){ // NO LO ESTA VOLVIENDO TRUE
        setInput2(true)
      }
    })

  }

  function verifyDisconnection(){ 

  

    const encontrar1 = edgesL.filter((edg) => edg.targetHandle == "a" || edg.targetHandle == "b")
    const encontrar = encontrar1.filter((edg) => edg.target == nodeId)


    //console.log("ENCONTRAR DESCONECTAR"+JSON.stringify(encontrar))

    encontrar.map((item) => {
      if(item.targetHandle == "a" && item.animated == false && item.source !== nodeId){ // EL ERROR ESTA AQUI AL HACER FALSE LOS INPUTS

        encontrar.map((ite, index) => {
          if(ite.targetHandle == "b"){
            encontrar.splice(index, 1)
          }
        })
        // ELIMINAR DEL ENCONTRAR, EL OBJETO QUE SEA DE TARGET B

        setInput1(false) // PORQUEEEEEEEEEEEEEEEEEEE ???????

      } else if (item.targetHandle == "b" && item.animated == false && item.source !== nodeId){ // O SI NO EXISTE
        setInput2(false)
      } 
    })

    // console.log("ENCONTRAR DESCONECTAR DOOS"+JSON.stringify(encontrar))


    // SI NO HAY TARGETHANDLE = B EN LOS OBJETOS, VOLVER FALSE A INPUT2


    encontrar.map((item) => { // MANEJO DE ELIMINACION DE EDGES
      if(item.targetHandle !== "b"){
        setInput2(false)
      } else if (item.targetHandle !== "a") {
        setInput1(false)
      }
    })

  }

  useEffect(() => {
    if(input1 && input2){
      actual.current.style.backgroundColor = "green"
    } else {
      actual.current.style.backgroundColor = "white"

    }
      // console.log("INPUT1"+input1)
      // console.log("INPUT2"+input2)

  }, [input1, input2])

  // SI UNO DE LOS EDGE SE ELIMINA, CONVERTIR AL INPUT CORRESPONDIENTE EN FALSE

  return (
    <div className="bg-white border-black border-2 p-3 rounded-t-xl w-10 h-10" ref={actual}> {/*AGREGAR REF PARA PODER CAMBIAR LA ROTACION DE EL ELEMENTO */}
      <div className="flex flex-col">
      </div>
      <Handle type="source" position={Position.Top} id="c"></Handle>
      <Handle type="target" position={Position.Bottom} id="a" className="left-1"></Handle>
      <Handle type="target" position={Position.Bottom} id="b" className="left-[2.3rem]"></Handle>
    </div>
  );
}

export default memo(CustomPrueba)