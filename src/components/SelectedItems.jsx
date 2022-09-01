import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const SelectedItems = () => {
  const { field } = useContext(AppContext);

  const getSelectedItems = field.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      if (!col) 
      return null;
      return (
        <li 
          className='list-item'
          key={`${rowIndex}${colIndex}`}>
            row {rowIndex+1} col {colIndex+1}
          </li>
      )
    })
  })

    return (
      <div className='hovered-squares'>
        <h2 className='items-title'>
          Hovered squares:
        </h2>
        <ul className='selected-list'>
          {getSelectedItems}
        </ul>
      </div>
  );
}

export default SelectedItems;
