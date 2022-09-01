import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Item from './Item';

const Field = () => {
  const { field } = useContext(AppContext);

    return (
    <div className='field'>
      {field && field.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((_id, colIndex) =>(
              <Item 
                key={`${rowIndex}${colIndex}`} 
                rowNumber={rowIndex} 
                colNumber={colIndex} />
            ))}
        </div>))}
    </div>
  );
}

export default Field;
