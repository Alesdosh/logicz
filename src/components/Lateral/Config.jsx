import {useState, useEffect, useContext} from 'react'

import { useConfig } from '../../../global/Global'

import { Select, Option, Button } from '@material-tailwind/react'

export function Config({onSave, onRestore}){

    const [value, setValue] = useState("dark")

     const {mode, update} = useConfig()

     const [saves, setSaves] = useState([])

     const [updater, setUpdater] = useState(0);

    useEffect(() => {
        const localSaves = localStorage.getItem("flowSaves")
       if(localSaves.length > 0){
            setSaves(JSON.parse(localSaves))
       }
    }, [])

    

return ( 
       <div className="w-full">
            <h2 className="opacity-65 font-semibold pt-5">Appearance</h2>
            <div className="pl-5 flex space-x-6 items-center justify-center p-3">
                <label htmlFor="" className="text-sm h-fit">Mode:</label>
                <Select label="mode" className="absolute z-50 overflow-visible" variant="standard" value={value} onChange={() => update(value, "mode")}>
                    <Option value='dark'>dark</Option>
                    <Option value='light'>light</Option>
                </Select>
            </div>
            <div className="pl-5 flex space-x-6 items-center p-3">
                <label htmlFor="" className="text-sm h-fit">Save:</label>
                    <div className='flex flex-col space-y-5 w-1/4'> 
                            <Button size='sm' onClick={onSave}>Save</Button>
                    <Select label="saves"  className="absolute z-50 overflow-visible" variant="standard" value={value} onChange={() => update(value, "mode")}>
                        <Option>Select an option</Option>
                        {saves.map((item, index) => (
                            <Option onClick={() => onRestore(item)} key={index}>save {index}</Option>
                        ))}
                    </Select>
                    </div>
            </div>
        </div>
 )
}