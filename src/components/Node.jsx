import { useDraggable } from "@neodrag/react";
import { useRef, useState } from "react";


export function Node({className, children, nodeType, onDrop}){
      const draggableRef = useRef(null);
      const [position, setPosition] = useState({ x: 0, y: 0 });

       useDraggable(draggableRef, { // MENEJA DRAGEO
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      // Calculate position relative to the viewport
      setPosition({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      onDrop(nodeType, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

    return (
        <div ref={draggableRef} className="z-auto"> {/*SEGUN EL NODETYPE, ESTILAR ESTO, LOGRAR QUE EL NODO DRAGEADO, SE VEA POR ENCIMA EN EL CANVAS */}
            {nodeType == "andGate" && (
                <div className="bg-white border-black border-[2.5px] p-3 rounded-t-3xl w-20 h-20 cursor-grab z-50">

                </div>
            )}
            {nodeType == "nandGate" && (
                <div className="bg-white border-black border-[2.5px] p-3 rounded-t-3xl w-20 h-20 cursor-grab z-50">
                  <p>Nand</p>
                </div>
            )}
            {nodeType == "notGate" && (
              <div class="w-0 h-0 border-2 border-black border-l-[50px] border-r-[50px] border-b-[calc(50px * 1.5)]">
                    <div class="h-16 w-16 border-t-30 border-r-30 bg-transparent"></div>
                </div>   
            )}
            {nodeType == "orGate" && (
                <div className="bg-white border-black border-[2.5px] border-b-transparent rounded-tl-full rounded-tr-full w-20 h-20 cursor-grab z-50 flex items-end">
                      <div className="w-full border-2 border-black"></div>
                </div>
            )}
            {nodeType == "button" && (
              <div class="bg-white border-black border-2 p-3 rounded-full w-10 h-10 cursor-grab">
                     
                </div>   
            )}
            {nodeType == "led" && (
              <div class="bg-white border-black border-2 p-3 rounded-t-xl w-7 h-10 cursor-grab">
                     
                </div>   
            )}
        </div>
    )
}