import React from 'react';
import PropTypes from 'prop-types';
import SingleCell from './SingleCell';


function SingleRow(props) {

    const cells = [];
    const y = props.y;
    for(let x = 0; x < props.x; x += 1)
    {
        cells.push(
            <SingleCell
                key={`${x}-${y}`}
                y={y}
                x={x}
                onChangedValue={props.handleChngeCell}
                updateCell={props.updateCell}
                value={props.rowsIndex[x] || ""}
            
            />
        )
    }
  
  return (
    <div >

        {cells}
     
    </div>
  );
}

SingleRow.propTypes = {
    handleChngeCell : PropTypes.func.isRequired,
    x : PropTypes.number.isRequired,
    y : PropTypes.number.isRequired,
    updateCell : PropTypes.func.isRequired,
    rowsIndex : PropTypes.string.isRequired

}


export default SingleRow;
