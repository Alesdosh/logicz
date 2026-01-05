import { Handle, Position, useEdges, useNodeId } from "@xyflow/react";
import { useContext, useEffect, useRef, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { reconnectEdge } from "@xyflow/react";
import { memo } from "react";


function Button() { 
  const { edges, setEdges } = useContext(globalContext);

  const nodeId = useNodeId()

  const actual = useRef();

  const [toggle, setToggle] = useState(false)

  const edgesL = useEdges()

  const [cambio, setCambio] = useState(0)

  function manejoClick() {
    if(!toggle){ // CONEXION
        const edgeViejos1 = edgesL.filter((edg) => edg.sourceHandle == "c");
    const edgeViejos = edgeViejos1.filter((edg) => edg.source == nodeId)


      if (!edgeViejos[0]){
        console.log("EJECUTADISIMOOOO")
        setToggle(true)
    actual.current.style.backgroundColor = "red";
        
      } else {
    //     const edgeViejos1 = edgesL.filter((edg) => edg.sourceHandle == "c");
    // const edgeViejos = edgeViejos1.filter((edg) => edg.source == nodeId)

      edgeViejos.forEach((item) => {
        const nuevaConexion = {
      source: item.source,
      target: item.target,
      sourceHandle: item.sourceHandle,
      targetHandle: item.targetHandle,
    };

    setEdges((eds) =>
      reconnectEdge(item, nuevaConexion, eds).map((e) =>
        e.id === item.id ? { ...e, animated: true } : e
      )
    );

    actual.current.style.backgroundColor = "red";
    //console.log(edgesL)

    setToggle(true)
      })
    
      setCambio((prev) => prev+1)
      }

    





    } else { // ESTO SE EJECUTA CUANDO SE APAGA EL BOTON // DESCONEXION
      console.log("ELSE EJECUTADO")
      console.log(JSON.stringify(edges))
       const edgeViejos = edgesL.filter((edg) => edg.sourceHandle == "c" && edg.source == nodeId); // SACAR EL EDGE ACTUAL QUE ES DE ESTE BOTON


      if (!edgeViejos[0]){
        console.log("MEGA EJECUTADO")
        setToggle(false)
    actual.current.style.backgroundColor = "white";
      } else {
        //  const edgeViejos = edgesL.filter((edg) => edg.sourceHandle == "c" && edg.source == nodeId); // SACAR EL EDGE ACTUAL QUE ES DE ESTE BOTON


    edgeViejos.forEach((item) => {
        const nuevaConexion = {
      source: item.source,
      target: item.target,
      sourceHandle: item.sourceHandle,
      targetHandle: item.targetHandle,
    };

    setEdges((eds) =>
      reconnectEdge(item, nuevaConexion, eds).map((e) =>
        e.id === item.id ? { ...e, animated: false } : e
      )
    );

    actual.current.style.backgroundColor = "white";
    //console.log(edgesL)

    setToggle(false)
    })

      setCambio((prev) => prev+1)
      }

       


    }
  }

  

  useEffect(() => {
    // SI ES MAYOR A UNO LOS EDGES VIEJOS DEL BOTON, Y EL PENULTIMO YA ES ANIMATED, HACER ANIMATED EL ULTIMO


    const edgeViejos = edgesL.filter((edg) => edg.sourceHandle == "c" && edg.source == nodeId);

    console.log("EDGEVIEJOS", JSON.stringify(edgeViejos)) //TENGO LOS DOS EDGES QUE SALEN

    console.log(actual.current.backgroundColor)

    const ultimo = edgeViejos[edgeViejos.length-1]
    const penultimo = edgeViejos[edgeViejos.length-2]

    if(ultimo?.animated === null && toggle){ // NUNCA SE EJECUTA

      console.log("SUPER MEGA EJECUTADO")

      const item = edgeViejos[edgeViejos.length-1]

      const nuevaConexion = {
      source: item.source,
      target: item.target,
      sourceHandle: item.sourceHandle,
      targetHandle: item.targetHandle,
    };

    setEdges((eds) =>
      reconnectEdge(item, nuevaConexion, eds).map((e) =>
        e.id === item.id ? { ...e, animated: true } : e
      )
    );
    }


    


  }, [edgesL])  

  useEffect(() => {
    console.log("TOGGLE"+toggle)
  }, [toggle])

  return (
    <div
      ref={actual}
      onClick={manejoClick}
      className="bg-white border-black border-2 p-3 rounded-full w-10 h-10"
    >
      <Handle type="source" position={Position.Top} id="c" />
    </div>
  );
}

export default memo(Button)