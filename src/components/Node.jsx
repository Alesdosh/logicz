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
        <div ref={draggableRef}> {/*SEGUN EL NODETYPE, ESTILAR ESTO */}
            {nodeType == "andGate" && (
                <div className="bg-white border-black border-[2.5px] p-3 rounded-t-3xl w-24 h-24 cursor-grab">

                </div>
            )}
            {nodeType == "notGate" && (
              <div class="w-16 h-16 border-b-30 border-l-30 border-solid border-black">
                    <div class="h-16 w-16 border-t-30 border-r-30 bg-transparent"></div>
                </div>   
            )}
        </div>
    )
}