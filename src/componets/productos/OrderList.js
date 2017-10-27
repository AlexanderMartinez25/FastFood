import React from 'react';
const style= {
   'list-style-type':'decimal',
}

class OrderList extends React.Component {
   render() {
      return (
         <div>
            <h3>Orden:</h3>
            <ul style={style}>
               {this.props.orderItems.map(item => (
                  <div>
                     <li key={item.id}> 
                        <strong>{item.nombre}</strong> <br />
                        ${item.precio} -
                        Cant. {item.cantidad}
                        <strong> Comentario:</strong> {item.comentarios}
                     </li>
                  </div>
               ))}
            </ul>
         </div>         
      );
   }
}
export default OrderList;