import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Item = ({ rowNumber, colNumber }) => {
  const { field, setField } = useContext(AppContext);

  const mouseHandler =() => {
    const newField = field.map((row, rowIndex) => {
      if(rowNumber === rowIndex) {
        return row.map((col, colIndex) => (
          colNumber === colIndex ? !col : col
        ));
      }
      return row;
    });
    setField(newField);
  }
  return (
    <div 
      className={`item ${field[rowNumber][colNumber] ? 'item-hovered' : ''}`}
      onMouseOver={mouseHandler}>
    </div>
  )

}

export default Item;