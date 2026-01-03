import '@xyflow/react/dist/style.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Principal } from './pages/Principal';

import { ComponenteGlobal } from './context/ComponenteGlobal';

import { ReactFlowProvider } from '@xyflow/react';


// ACTUALIZAR EL ESTADO EDGES Y ANTES ELIMINAR EL EDGE QUE CORRESPONDE AL NUEVO QUE SE VA A AGREGAR
// 
 
export default function App() {

 
  return (
    <ReactFlowProvider>
      <ComponenteGlobal>
      <Router>
        <Routes>
          <Route path='/' element={<Principal/>}></Route>
        </Routes>
      </Router>
    </ComponenteGlobal>
    </ReactFlowProvider>
  );
}