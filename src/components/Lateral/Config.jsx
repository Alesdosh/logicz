import {useState, useEffect, useContext} from 'react'

import { useConfig } from '../../../global/Global'

import { Select, Option } from '@material-tailwind/react'

export function Config(){

    const [toggle, setToggle] = useState(false)
    const [value, setValue] = useState("dark")

     const {mode, update} = useConfig()


return ( 
       <div className="w-full">
            <h2 className="opacity-65 font-semibold pt-5">Appearance</h2>
            <div className="pl-5 flex space-x-6 items-center justify-center p-3">
                <label htmlFor="" className="text-sm h-fit">Mode</label>
                <Select label="mode" size="sm" className="absolute z-50 overflow-visible" variant="standard" value={value} onChange={() => update(value, "mode")}>
                    <Option value='dark'>dark</Option>
                    <Option value='light'>light</Option>
                </Select>
            </div>
        </div>
 )
}