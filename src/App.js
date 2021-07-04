import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {

  const [x,setX] = useState();
  const [y,setY] = useState();

  useEffect(()=>
  {
    setX(10);
    setY(10);
  },[]);

  return (
    <div>

      <Table x={x} y={y} />


     
    </div>
  );
}

export default App;
