import React, {  useEffect, useState } from 'react';
import SingleRow from './SingleRow';
import PropTypes from 'prop-types';

function Table(props) {
    console.log(props.x);
    console.log(props.y);
    const rows= [];

    const data=  {};
    
    const [getData, setData] = useState();

   useEffect(()=>
   {
       setData(data);
   },[])
    const handleChngeCell = ({x,y} , value) =>
    {
        const changedData  = Object.assign({} , getData.data);

        if(!changedData[y])
        {
            changedData[y] = {}
        }
        changedData[y][x] = value;
        setData({data : changedData});
    }

    const updateCell = ()=>
    {
        setData({});
    }

    for(let y=0; y<props.y + 1; y += 1)
    {
        const rowsIndex = getData[y] || {};
        rows.push(

        <SingleRow
            handleChngeCell ={handleChngeCell}
            updateCell = {updateCell}
            key={y}
            y= {y}
            x={props.x + 1}
            rowsIndex={rowsIndex}

        />


        )
    }

  return (
    <div>
        {rows}  
     
    </div>
  );
}

Table.propTypes = {
    x : PropTypes.number.isRequired,
    y : PropTypes.number.isRequired,
  
}

export default Table;
