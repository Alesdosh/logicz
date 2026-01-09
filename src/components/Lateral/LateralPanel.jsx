import { useEffect, useState, useCallback, useRef, useContext} from "react"
import { useDraggable } from "@neodrag/react"

import { useReactFlow } from "@xyflow/react"

import { globalContext } from "../../context/globalContext"

import { Node } from "../Node"

import { Config } from "./Config"

let id = 0;

const getId = () => `n${id++}`


function Gates({gates, handleNodeDrop}){
    return (
        gates.map((item, index) => (
                                    <div className="mx-auto  w-3/4 min-h-[14rem] flex flex-col space-y-5 items-center justify-center rounded-xl shadow-lg m-2 bg-white" key={index}>
                                        <h2 className="font-semibold text-xl">{item}</h2>
                                        <Node nodeType={item} className={item} onDrop={handleNodeDrop} />
                                    
                                    </div>
                        ))
    )
}

function Io({io, handleNodeDrop}){
    return (
        io.map((item, index) => (
                                    <div className="mx-auto  w-3/4 min-h-[14rem] flex flex-col space-y-5 items-center justify-center rounded-xl shadow-lg m-2 bg-white" key={index}>
                                        <h2 className="font-semibold text-xl">{item}</h2>
                                        <Node nodeType={item} className={item} onDrop={handleNodeDrop} />
                                    
                                    </div>
                        ))
    )
}   


export function LateralPanel(){

    const {gates, setGates, io, setIo} = useContext(globalContext);

      const { setNodes, screenToFlowPosition } = useReactFlow();

      const handleNodeDrop = useCallback( // SI CAMBIAN LOS NODOS O SI SE USA SCREENTOFLOWPOSITION // UN CALLBACK ES UNA FUNCION QUE SE PASARA DESPUES COMO ARGUMENTO
          (nodeType, screenPosition) => {
            const flow = document.querySelector('.react-flow');
            const flowRect = flow?.getBoundingClientRect();
            const isInFlow =
              flowRect &&
              screenPosition.x >= flowRect.left &&
              screenPosition.x <= flowRect.right &&
              screenPosition.y >= flowRect.top &&
              screenPosition.y <= flowRect.bottom;
      
            // Create a new node and add it to the flow
            if (isInFlow) {
              const position = screenToFlowPosition(screenPosition);
      
              const newNode = {
                id:getId(),
                type: nodeType,
                position,
                data: { label: `${nodeType} node` },
              };
      
              setNodes((nds) => nds.concat(newNode));
            }
          },
          [setNodes, screenToFlowPosition],
        );
    


    const [num, setNum] = useState(1)

    const [paginas, setPaginas] = useState({
        puertas: true,
        io: false,
        electronica: false,
        chips: false,
        config: false
    })

    const [section1, setSection1] = useState(false)
   

    useEffect(() => {
        switch(num){
            case 1: {
                const objeto = {
                    puertas: true,
                    io: false,
                    electronica: false,
                    chips: false,
                    config: false
                }
                setPaginas(prev => ({...prev, ...objeto}))
            } break;
            case 2: {
                const objeto = {
                    puertas: false,
                    io: true,
                    electronica: false,
                    chips: false,
                    config: false
                }
                setPaginas(prev => ({...prev, ...objeto}))
            } break;
            case 3: {
                const objeto = {
                    puertas: false,
                    io: false,
                    electronica: true,
                    chips: false,
                    config: false
                }
                setPaginas(prev => ({...prev, ...objeto}))
            } break;
            case 4: {
                const objeto = {
                    puertas: false,
                    io: false,
                    electronica: false,
                    chips: true,
                    config: false
                }
                setPaginas(prev => ({...prev, ...objeto}))
            } break;
            case 5: {
                const objeto = {
                    puertas: false,
                    io: false,
                    electronica: false,
                    chips: false,
                    config: true
                }
                setPaginas(prev => ({...prev, ...objeto}))
            } break;
        }
    }, [num])
       


    return (
        <div className='min-w-[21%] shadow-black shadow-lg min-h-[97vh] rounded-xl flex flex-col p-1 bg-gradient-to-br from-slate-50 to-slate-100'> {/*Panel lateral */}

            <div className="grid grid-cols-5 gap-1 p-1"> {/*HEADER GRID 5 */}
                        <div className={`rounded-xl col-span-1 h-[3.5rem] flex items-center justify-center hover:hover:cursor-pointer hover:bg-teal-100 p-1 ${paginas.puertas ? "bg-teal-100" : ""}`} onClick={() => setNum(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hexagon-icon lucide-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>  
                        <div className="rounded-xl col-span-1 h-[3.5rem] flex items-center justify-center  hover:hover:cursor-pointer hover:bg-green-200" onClick={() => setNum(2)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-down-icon lucide-circle-arrow-down"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>

                        </div>  
                        <div className="rounded-xl col-span-1 h-[3.5rem] flex items-center justify-center  hover:hover:cursor-pointer hover:bg-green-200" onClick={() => setNum(3)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cable-icon lucide-cable"><path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"/><path d="M17 21v-2"/><path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"/><path d="M21 21v-2"/><path d="M3 5V3"/><path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"/><path d="M7 5V3"/></svg>
                        </div>  
                        <div className="rounded-xl col-span-1 h-[3.5rem] flex items-center justify-center  hover:hover:cursor-pointer hover:bg-green-200" onClick={() => setNum(4)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu-icon lucide-cpu"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>
                        </div>  
                        <div className="rounded-xl col-span-1 h-[3.5rem] flex items-center justify-center  hover:hover:cursor-pointer hover:bg-green-200" onClick={() => setNum(5)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.140a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                                
                        </div>  
                </div>

                <hr className="border-gray-600 w-3/4 mx-auto"/>


                <div className="mx-auto w-11/12 flex flex-col items-center m-1 max-h-[75vh] overflow-y-auto overflow-x-hidden min-h-[80%]">

                        

                    {paginas.puertas && (
                        <Gates gates={gates} handleNodeDrop={handleNodeDrop}></Gates>
                    )}
                    {paginas.io && (
                        <Io io={io} handleNodeDrop={handleNodeDrop}></Io>
                    )}
                    {paginas.config && (
                        <Config></Config>
                    )}









                </div>

        </div>  
    )

}