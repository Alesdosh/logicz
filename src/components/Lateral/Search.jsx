import {useState, useEffect, useContext, memo} from 'react'

import { Panel } from '@xyflow/react';
import { Input, button } from '@material-tailwind/react';

 function Search(){


return (    
       <Panel className='w-[93%] h-[3.5rem] rounded-3xl  backdrop-blur-sm flex items-center justify-center p-1'>
            <Input className='rounded-2xl h-[3.5rem] text-white' placeholder='Search...'></Input>
            
       </Panel>
 )
}

export default memo(Search);