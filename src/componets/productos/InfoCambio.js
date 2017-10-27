import React from 'react';
import NumberFormat from 'react-number-format'

const InfoCambio = (props) => {
   return (
      <div>
         <h3>Total: <NumberFormat value={props.total} displayType={'text'} 
         decimalSeparator="," thousandSeparator={'.'} prefix={'$'} /></h3>

         <h3>Cambio: <NumberFormat value={props.cambio} displayType={'text'} 
         decimalSeparator="," thousandSeparator={'.'} prefix={'$'} /> </h3>
      </div>
   );
};

export default InfoCambio;